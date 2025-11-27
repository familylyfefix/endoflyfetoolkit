import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Shield, Sparkles } from "lucide-react";

const Launch = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Celebration Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold animate-fade-in">
            <Sparkles className="h-4 w-4" />
            IT'S LIVE!
            <Sparkles className="h-4 w-4" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            The End-Of-Lyfe Planner
            <span className="block text-primary mt-2">is finally here!</span>
          </h1>

          {/* Value Proposition */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Give your family the gift of peace of mind. Everything they need, organized in one place.
          </p>

          {/* Price Card */}
          <Card className="inline-block p-6 bg-card/80 backdrop-blur-sm border-primary/20">
            <div className="space-y-2">
              <p className="text-4xl md:text-5xl font-bold text-foreground">$147</p>
              <p className="text-muted-foreground">One-time payment</p>
              <div className="flex items-center justify-center gap-2 text-sm text-primary">
                <Shield className="h-4 w-4" />
                <span>14-day money-back guarantee</span>
              </div>
            </div>
          </Card>

          {/* Primary CTA */}
          <div className="space-y-4">
            <Button size="lg" className="text-lg px-8 py-6 h-auto" asChild>
              <a href="https://familylyfefix.io" target="_blank" rel="noopener noreferrer">
                Get the Planner Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>

            {/* Secondary CTA */}
            <p className="text-muted-foreground">
              Not ready?{" "}
              <Link to="/quiz" className="text-primary hover:underline font-medium">
                Take the free readiness quiz first →
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="container mx-auto px-4 py-8 text-center">
        <p className="text-sm text-muted-foreground">
          Your information stays private. We never share your data.
        </p>
      </footer>
    </div>
  );
};

export default Launch;
