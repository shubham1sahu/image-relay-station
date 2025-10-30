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

    console.log("Processing deepfake detection request with AI");

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Create FormData for the external API
    const formData = new FormData();
    formData.append("file", blob, "image.jpg");

    // Call the deepfake detection API
    const apiUrl = "https://isgen.ai/api/v1/detect";
    console.log("Calling API:", apiUrl);
    
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro", // Use Pro for better multimodal handling
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analyze this image carefully for signs of AI generation or deepfake manipulation. Look for: unnatural artifacts, inconsistent lighting or shadows, distorted facial features, unrealistic textures, blending errors, or other anomalies typical of AI-generated or manipulated images. Provide a confidence score from 0-1 where 1 means definitely AI-generated/deepfake. Respond ONLY with valid JSON in this exact format: {\"ai_probability\": 0.75, \"confidence\": \"High\", \"reasoning\": \"Brief explanation of key findings\"}"
              },
              {
                type: "image_url",
                image_url: {
                  url: image
                }
              }
            ]
          }
        ]
      })
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