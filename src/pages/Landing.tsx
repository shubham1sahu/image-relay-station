import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("image");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-secondary/50 py-5">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center">
            <div className="text-xl font-bold text-foreground">MyDetect</div>
            <div className="flex gap-6">
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Home
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Tools
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                About
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Deepfake Image Detection Online
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Upload or drag & drop an image. Get authenticity score instantly. No signup, free forever.
          </p>

          {/* Tab Buttons */}
          <div className="inline-flex border border-border rounded-lg overflow-hidden mb-8">
            <button
              onClick={() => setActiveTab("image")}
              className={`px-6 py-3 text-base transition-colors ${
                activeTab === "image"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-foreground hover:bg-accent"
              }`}
            >
              Image
            </button>
            <button
              onClick={() => setActiveTab("video")}
              className={`px-6 py-3 text-base transition-colors border-l border-border ${
                activeTab === "video"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-foreground hover:bg-accent"
              }`}
            >
              Video
            </button>
            <button
              onClick={() => setActiveTab("voice")}
              className={`px-6 py-3 text-base transition-colors border-l border-border ${
                activeTab === "voice"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-foreground hover:bg-accent"
              }`}
            >
              Voice
            </button>
          </div>

          {/* CTA Button */}
          <div className="mb-12">
            <Button
              size="lg"
              onClick={() => navigate("/detect")}
              className="text-lg px-8 py-6"
            >
              Start Free Trial
            </Button>
          </div>

          {/* Stats */}
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">18,000+</div>
            <div className="text-muted-foreground">images analyzed successfully</div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            How to Use
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-card p-6 rounded-lg text-center border border-border">
              <div className="text-4xl font-bold text-primary mb-4">1</div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Upload Image</h3>
              <p className="text-muted-foreground">Select or drag your image file.</p>
            </div>
            <div className="bg-card p-6 rounded-lg text-center border border-border">
              <div className="text-4xl font-bold text-primary mb-4">2</div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">AI Detection</h3>
              <p className="text-muted-foreground">Our AI scans for artifacts, faces, textures.</p>
            </div>
            <div className="bg-card p-6 rounded-lg text-center border border-border">
              <div className="text-4xl font-bold text-primary mb-4">3</div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">View Report</h3>
              <p className="text-muted-foreground">See authenticity score & details.</p>
            </div>
            <div className="bg-card p-6 rounded-lg text-center border border-border">
              <div className="text-4xl font-bold text-primary mb-4">4</div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Download & Share</h3>
              <p className="text-muted-foreground">Save or share your result.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFaq(0)}
                className="w-full px-6 py-4 text-left flex justify-between items-center bg-card hover:bg-accent transition-colors"
              >
                <h3 className="text-lg font-medium text-foreground">
                  What is deepfake image detection?
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform ${
                    openFaq === 0 ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === 0 && (
                <div className="px-6 py-4 bg-muted/50">
                  <p className="text-muted-foreground">
                    Deepfake image detection uses AI to analyze images for signs of manipulation or
                    synthetic generation, helping verify authenticity.
                  </p>
                </div>
              )}
            </div>

            <div className="border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFaq(1)}
                className="w-full px-6 py-4 text-left flex justify-between items-center bg-card hover:bg-accent transition-colors"
              >
                <h3 className="text-lg font-medium text-foreground">Is it 100% accurate?</h3>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform ${
                    openFaq === 1 ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === 1 && (
                <div className="px-6 py-4 bg-muted/50">
                  <p className="text-muted-foreground">
                    No detection is perfect, but we provide confidence scores and detailed insights
                    to help you make informed decisions.
                  </p>
                </div>
              )}
            </div>

            <div className="border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFaq(2)}
                className="w-full px-6 py-4 text-left flex justify-between items-center bg-card hover:bg-accent transition-colors"
              >
                <h3 className="text-lg font-medium text-foreground">Is my data safe?</h3>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform ${
                    openFaq === 2 ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === 2 && (
                <div className="px-6 py-4 bg-muted/50">
                  <p className="text-muted-foreground">
                    Yes — we don't store images. Everything is processed and then deleted
                    immediately after analysis.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-10">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 MyDetect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
