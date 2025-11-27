import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Shield, Sparkles } from "lucide-react";

// Celebration colors - vibrant and festive
const celebrationColors = [
  'hsl(var(--primary))',      // Brand primary
  'hsl(45, 93%, 58%)',        // Gold
  'hsl(330, 80%, 60%)',       // Pink
  'hsl(200, 85%, 55%)',       // Sky blue
  'hsl(280, 70%, 60%)',       // Purple
  'hsl(150, 70%, 50%)',       // Emerald
  'hsl(15, 90%, 60%)',        // Coral/Orange
  'hsl(180, 70%, 50%)',       // Teal
];

// Confetti configuration
const confettiPieces = Array.from({ length: 35 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 8,
  duration: 6 + Math.random() * 6,
  size: 4 + Math.random() * 6,
  color: celebrationColors[Math.floor(Math.random() * celebrationColors.length)],
  shape: Math.random() > 0.5 ? 'circle' : 'square',
  opacity: 0.5 + Math.random() * 0.4
}));

const floatingParticles = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  x: 10 + Math.random() * 80,
  y: 10 + Math.random() * 80,
  delay: Math.random() * 4,
  size: 6 + Math.random() * 8
}));

const Confetti = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {confettiPieces.map((piece) => (
      <div
        key={piece.id}
        className="absolute animate-confetti-fall"
        style={{
          left: `${piece.left}%`,
          animationDelay: `${piece.delay}s`,
          animationDuration: `${piece.duration}s`,
          backgroundColor: piece.color,
          width: `${piece.size}px`,
          height: `${piece.size}px`,
          borderRadius: piece.shape === 'circle' ? '50%' : '2px',
          opacity: piece.opacity
        }}
      />
    ))}
  </div>
);

const FloatingParticles = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {floatingParticles.map((p) => (
      <div
        key={p.id}
        className="absolute rounded-full bg-primary/10 animate-float"
        style={{
          left: `${p.x}%`,
          top: `${p.y}%`,
          width: `${p.size}px`,
          height: `${p.size}px`,
          animationDelay: `${p.delay}s`
        }}
      />
    ))}
  </div>
);

const Launch = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 relative overflow-hidden">
      {/* Background animations */}
      <Confetti />
      <FloatingParticles />
      
      <main className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Celebration Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold animate-fade-in">
            <Sparkles className="h-4 w-4 animate-sparkle" />
            IT'S LIVE!
            <Sparkles className="h-4 w-4 animate-sparkle" style={{ animationDelay: '0.5s' }} />
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
          <Card className="inline-block p-6 bg-card/80 backdrop-blur-sm border-primary/20 shadow-[0_0_30px_hsl(var(--primary-glow)/0.2),0_0_60px_hsl(var(--primary-glow)/0.1)]">
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
      <footer className="container mx-auto px-4 py-8 text-center relative z-10">
        <p className="text-sm text-muted-foreground">
          Your information stays private. We never share your data.
        </p>
      </footer>
    </div>
  );
};

export default Launch;
