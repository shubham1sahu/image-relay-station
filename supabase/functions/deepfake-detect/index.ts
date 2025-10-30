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

    // Call Lovable AI for image analysis using the Pro model for better vision capabilities
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
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

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API error:", response.status, errorText);
      
      return new Response(
        JSON.stringify({ 
          error: "AI analysis failed", 
          status: response.status,
          details: errorText 
        }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiResponse = await response.json();
    console.log("AI Response:", JSON.stringify(aiResponse));

    // Extract the analysis from AI response
    const aiContent = aiResponse.choices?.[0]?.message?.content;
    if (!aiContent) {
      throw new Error("No content in AI response");
    }

    // Parse the JSON from AI response
    let analysisData;
    try {
      // Extract JSON from potential markdown code blocks
      const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisData = JSON.parse(jsonMatch[0]);
      } else {
        analysisData = JSON.parse(aiContent);
      }
    } catch (e) {
      console.error("Failed to parse AI response as JSON:", aiContent);
      // Fallback: try to extract information from text
      analysisData = {
        ai_probability: 0.5,
        confidence: "Low",
        reasoning: "Unable to parse AI response"
      };
    }

    // Transform to expected format
    const score = Math.round((analysisData.ai_probability || 0.5) * 100);
    const transformedData = {
      score: score,
      isDeepfake: score > 50,
      confidence: analysisData.confidence || (score > 80 ? "High" : score > 50 ? "Medium" : "Low"),
      reasoning: analysisData.reasoning || "Analysis complete"
    };

    console.log("Detection result:", transformedData);

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
