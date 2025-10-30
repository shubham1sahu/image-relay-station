import { useState } from "react";
import { Upload, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface DetectionResult {
  score: number;
  isDeepfake: boolean;
  confidence: string;
  reasoning?: string;
}

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (PNG, JPG, WEBP)",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (3MB limit)
    if (file.size > 3 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 3MB",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    setResult(null);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setResult(null);

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;

        // Call edge function
        const { data, error } = await supabase.functions.invoke("deepfake-detect", {
          body: { image: base64 },
        });

        if (error) throw error;

        setResult(data);
        toast({
          title: "Analysis complete",
          description: data.isDeepfake
            ? "Deepfake detected!"
            : "Image appears authentic",
        });
      };
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis failed",
        description: "Unable to analyze image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Deepfake Image Detection
            </h1>
            <p className="text-lg text-muted-foreground">
              Upload an image to check its authenticity with AI-powered detection
            </p>
          </div>

          {/* Upload Section */}
          <Card className="p-8 mb-8">
            <div className="space-y-6">
              {!preview ? (
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-12 h-12 mb-4 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, WEBP up to 3 MB
                    </p>
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileSelect}
                  />
                </label>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full max-h-96 object-contain rounded-lg"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      className="flex-1"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        "Detect Deepfake"
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedFile(null);
                        setPreview(null);
                        setResult(null);
                      }}
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Results Section */}
          {result && (
            <Card className="p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Analysis Results</h2>
                  {result.isDeepfake ? (
                    <AlertCircle className="w-8 h-8 text-destructive" />
                  ) : (
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">
                        {result.isDeepfake ? "Deepfake" : "Authentic"} Confidence
                      </span>
                      <span className="text-sm font-bold">{result.score}%</span>
                    </div>
                    <Progress value={result.score} className="h-3" />
                  </div>

                  <div className="p-4 rounded-lg bg-muted">
                    <p className="text-sm">
                      <span className="font-semibold">Verdict: </span>
                      {result.isDeepfake
                        ? "This image shows signs of AI manipulation or deepfake technology."
                        : "This image appears to be authentic with no signs of manipulation."}
                    </p>
                    <p className="text-sm mt-2">
                      <span className="font-semibold">Confidence Level: </span>
                      {result.confidence}
                    </p>
                    {result.reasoning && (
                      <p className="text-sm mt-2">
                        <span className="font-semibold">Analysis: </span>
                        {result.reasoning}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
