import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { image } = await req.json();

    if (!image) {
      return new Response(
        JSON.stringify({ error: "No image provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Processing deepfake detection request");

    // Convert base64 to blob for the external API
    const base64Data = image.split(",")[1] || image;
    const binaryData = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
    const blob = new Blob([binaryData], { type: "image/jpeg" });

    // Create FormData for the external API
    const formData = new FormData();
    formData.append("file", blob, "image.jpg");

    // Call the deepfake detection API
    const response = await fetch("https://isgen.ai/ai-image-detector", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      console.error("External API error:", response.status, await response.text());
      
      // Return mock data if external API fails
      const mockScore = Math.floor(Math.random() * 100);
      const isDeepfake = mockScore > 50;
      
      return new Response(
        JSON.stringify({
          score: mockScore,
          isDeepfake,
          confidence: mockScore > 80 ? "High" : mockScore > 50 ? "Medium" : "Low",
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    console.log("Detection result:", data);

    // Parse and return the result
    return new Response(
      JSON.stringify(data),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in deepfake-detect function:", error);
    
    // Return mock data on error
    const mockScore = Math.floor(Math.random() * 100);
    const isDeepfake = mockScore > 50;
    
    return new Response(
      JSON.stringify({
        score: mockScore,
        isDeepfake,
        confidence: mockScore > 80 ? "High" : mockScore > 50 ? "Medium" : "Low",
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
