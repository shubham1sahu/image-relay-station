import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Search, Brain, CheckCircle2, Lock, Upload, ArrowRight, Star } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  const handleStartTrial = () => {
    navigate("/detect");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Search className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Deepfake Detection</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="text-foreground hover:text-primary transition-colors">Home</a>
              <a href="#tools" className="text-foreground hover:text-primary transition-colors">Deepfake Detection Tools</a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Deepfake Image Detection Online
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Our Deepfake image detection free giving you a precise authenticity score. Protect your
              content with real-time analysis, designed for security and simplicity.
            </p>
            
            {/* Tabs */}
            <div className="inline-flex rounded-lg border border-border p-1 mb-8">
              <button className="px-6 py-2 rounded-md bg-primary text-primary-foreground font-medium">
                Image
              </button>
              <button className="px-6 py-2 rounded-md text-muted-foreground hover:text-foreground transition-colors">
                Video
              </button>
              <button className="px-6 py-2 rounded-md text-muted-foreground hover:text-foreground transition-colors">
                Voice
              </button>
            </div>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-border rounded-lg p-12 mb-8 hover:border-primary transition-colors cursor-pointer">
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-2">Drag & drop an image or click to upload</p>
              <p className="text-sm text-muted-foreground">PNG, JPG, WEBP up to 3 MB</p>
            </div>

            <Button size="lg" onClick={handleStartTrial} className="mb-8">
              Detect Forgery
            </Button>

            {/* Stats */}
            <div className="flex items-center justify-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full bg-muted border-2 border-background" />
                ))}
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground ml-2">18,000+ images analyzed successfully</span>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Carousel */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Deepfake Image Detection in Action: Protecting Your Assets
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Learn how our deepfake detection technology helped an influencer avoid identity theft by identifying fake images used in a fraudulent campaign.
            </p>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="py-16" id="tools">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            How to Use Deepfake Image Detection
          </h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">
            It's super easy. Just upload a photo, let our AI Deepfake Image Detection do the work, and get a full report in seconds. You'll see what's real, what's not—and why. No tech skills needed. No sign-up. No stress.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="mb-4">
                <Upload className="h-12 w-12 text-primary mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-2 flex items-center justify-center gap-2">
                <span className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">1</span>
                Step 1: Upload Your Image
              </h3>
              <p className="text-muted-foreground">
                Click the upload button and select any photo you want to check. You can drag and drop too. We support JPG, PNG, and even some edited screenshots. No need to sign up. No hidden steps. Just pick your image and go.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4">
                <Brain className="h-12 w-12 text-primary mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-2 flex items-center justify-center gap-2">
                <span className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">2</span>
                Step 2: Detect Image
              </h3>
              <p className="text-muted-foreground">
                Once uploaded, our AI Deepfake Image Detection gets to work fast. It scans for clues like lighting, shadows, pixel noise, and face textures. Then it compares these to deepfake patterns trained from thousands of real and fake images. It's kinda like a lie detector—but for pictures.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4">
                <CheckCircle2 className="h-12 w-12 text-primary mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-2 flex items-center justify-center gap-2">
                <span className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">3</span>
                Step 3: Review the Detection Report
              </h3>
              <p className="text-muted-foreground">
                In just a few seconds, you'll see a summary showing the authenticity score—how likely the image is real or fake. We also give you a short version (for quick checks) and a detailed report (for curious minds). I honestly love how clear it is.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Button variant="outline" size="lg" onClick={handleStartTrial} className="mb-8 mx-auto block">
              Try Deepfake Image Detection Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="h-96 bg-muted rounded-lg"></div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Spotting Fake Photos on Social Media
                </h2>
                <p className="text-muted-foreground mb-6">
                  You're scrolling through your feed and spot a shocking image—maybe it's a celebrity in a strange situation or a wild "news" screenshot. It looks off, but you can't tell why. That's where deepfake image detection comes in. Just upload the image and our AI will scan it for signs of manipulation—lighting mismatches, texture issues, metadata gaps. You'll get a clean report with a realness score and reasons. I once used this to check a "crisis photo" that was shared everywhere—it turned out to be 100% fake. Honestly, I felt a little like Sherlock.
                </p>
                <Button onClick={handleStartTrial}>
                  Try Deepfake Image Detection <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preventing Scams */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Preventing Scams Before They Start
              </h2>
              <p className="text-muted-foreground mb-6">
                Someone sends you a photo claiming to be your cousin. Or your bank. Or a recruiter. It looks convincing, but your gut says wait. With our detection tool, you can upload any image and quickly check if it's a deepfake. We've seen scams use AI-generated profile pics to fake authority or trust. Our platform checks textures, facial distortion, and even background artifacts. I've used it to stop a rental scam that almost got me—saved me thousands. If it smells fishy, it probably is. This helps you prove it.
              </p>
              <Button onClick={handleStartTrial}>
                Try Deepfake Image Detection <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="h-96 bg-muted rounded-lg"></div>
          </div>
        </div>
      </section>

      {/* Remote Hiring */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div className="h-96 bg-muted rounded-lg"></div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Verifying Identity in Remote Hiring
              </h2>
              <p className="text-muted-foreground mb-6">
                Hiring someone online? Reviewing freelancer submissions or ID checks? Deepfake images are making their way into job applications too. Use our platform to verify profile photos, work samples, or portfolio screenshots. Our AI runs an image analysis using deep learning and real-time detection techniques. You get a full report showing whether a photo is legit or AI-generated. I've run every CV image through this since getting burned once—it's now part of my checklist. It's simple, fast, and gives me peace of mind.
              </p>
              <Button onClick={handleStartTrial}>
                Try Deepfake Image Detection <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose our deepfake image detection tool
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="p-6 rounded-lg border border-border bg-card">
              <Upload className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">We keep it simple and free</h3>
              <p className="text-muted-foreground text-sm mb-4">
                No sign-up. No credit cards. No nonsense. You upload an image, and we run deepfake detection instantly. It's completely free to use, works on desktop and mobile, and doesn't limit your uploads.
              </p>
              <p className="text-muted-foreground text-sm italic">
                I love that I don't have to jump through hoops.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-border bg-card">
              <Brain className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Our AI gets it right</h3>
              <p className="text-muted-foreground text-sm mb-4">
                We don't just guess. Our platform uses deep learning and historical image data to spot fake patterns—textures, shadows, metadata holes. You'll see an authenticity score, a short summary, and detailed highlights.
              </p>
              <p className="text-muted-foreground text-sm italic">
                It's surprisingly accurate, even on tricky edits.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-border bg-card">
              <CheckCircle2 className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">You get clarity, not confusion</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Our reports are built for humans, not tech nerds. You'll get a clean visual report with a clear "real or fake" score. We also point out the problem areas.
              </p>
              <p className="text-muted-foreground text-sm italic">
                I always use the short version to decide fast—and it just works.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-border bg-card">
              <Lock className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Your data stays yours</h3>
              <p className="text-muted-foreground text-sm mb-4">
                We don't store your photos. Period. Everything you upload is processed securely and deleted after detection. We don't use your data to train models or sell ads.
              </p>
              <p className="text-muted-foreground text-sm italic">
                I trust it enough to check my own family pics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Scan Images with Deepfake Image Detection
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
            Use our free deepfake image detection online tool to check image authenticity in seconds. Upload, scan, and get instant results—no sign-up required.
          </p>
          <Button size="lg" onClick={handleStartTrial}>
            Try Deepfake Image Detection Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12" id="about">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Search className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">Deepfake Detection</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Deepfake Detection is a free AI-powered tool that helps you identify manipulated images, videos, and audio files to protect against misinformation and fraud.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Deepfake Detection Tools</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Deepfake Image Detection</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Deepfake Video Detection</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Deepfake Voice Detection</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">About</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <p className="text-sm text-muted-foreground">hello@deepfakedetection.io</p>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">© 2025 Deepfake Detection. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
