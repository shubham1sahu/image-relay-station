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
    const apiUrl = "https://isgen.ai/api/v1/detect";
    console.log("Calling API:", apiUrl);
    
    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
    });

    const contentType = response.headers.get("content-type");
    console.log("API Response status:", response.status);
    console.log("API Response content-type:", contentType);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("External API error:", response.status, errorText);
      
      return new Response(
        JSON.stringify({ 
          error: "API request failed", 
          status: response.status,
          details: errorText 
        }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Try to parse as JSON, if it fails return the raw text
    const responseText = await response.text();
    console.log("API Response body:", responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      return new Response(
        JSON.stringify({ 
          error: "Invalid JSON response from API",
          rawResponse: responseText.substring(0, 500) // First 500 chars
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Detection result:", data);

    // Transform API response to expected format
    const transformedData = {
      score: Math.round((data.ai_probability || data.score || 0) * 100),
      isDeepfake: (data.ai_probability || data.score || 0) > 0.5,
      confidence: (data.ai_probability || data.score || 0) > 0.8 ? "High" : 
                  (data.ai_probability || data.score || 0) > 0.5 ? "Medium" : "Low",
      rawData: data // Include raw data for debugging
    };

    // Return the transformed result
    return new Response(
      JSON.stringify(transformedData),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in deepfake-detect function:", error);
    
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: error instanceof Error ? error.message : String(error),
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});