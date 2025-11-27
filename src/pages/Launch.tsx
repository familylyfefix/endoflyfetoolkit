import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Shield, Sparkles, FileText, Heart, Clock } from "lucide-react";
import fullLogo from "@/assets/full-logo.png";

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

// Confetti configuration - more pieces, bigger, bolder!
const confettiPieces = Array.from({ length: 60 }, (_, i) => {
  const shapeRandom = Math.random();
  const shape = shapeRandom > 0.7 ? 'streamer' : shapeRandom > 0.35 ? 'circle' : 'square';
  return {
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 4 + Math.random() * 4,
    size: 6 + Math.random() * 8,
    color: celebrationColors[Math.floor(Math.random() * celebrationColors.length)],
    shape,
    opacity: 0.7 + Math.random() * 0.3,
    rotation: Math.random() * 360
  };
});

const floatingParticles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: 5 + Math.random() * 90,
  y: 5 + Math.random() * 90,
  delay: Math.random() * 4,
  size: 80 + Math.random() * 150
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
          width: piece.shape === 'streamer' ? `${piece.size * 0.4}px` : `${piece.size}px`,
          height: piece.shape === 'streamer' ? `${piece.size * 2}px` : `${piece.size}px`,
          borderRadius: piece.shape === 'circle' ? '50%' : '2px',
          opacity: piece.opacity,
          transform: `rotate(${piece.rotation}deg)`
        }}
      />
    ))}
  </div>
);

const FloatingOrbs = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {floatingParticles.map((p) => (
      <div
        key={p.id}
        className="absolute rounded-full animate-float blur-3xl"
        style={{
          left: `${p.x}%`,
          top: `${p.y}%`,
          width: `${p.size}px`,
          height: `${p.size}px`,
          background: `radial-gradient(circle, hsl(var(--primary) / 0.15), hsl(var(--primary) / 0.05))`,
          animationDelay: `${p.delay}s`
        }}
      />
    ))}
  </div>
);

const Launch = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/20 relative overflow-hidden">
      {/* Decorative gradient shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-accent/30 to-transparent rounded-full blur-3xl" />
      </div>
      
      {/* Background animations */}
      <Confetti />
      <FloatingOrbs />
      
      <main className="container mx-auto px-3 sm:px-4 py-8 md:py-16 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          
          {/* Logo */}
          <div className="animate-fade-in">
            <img 
              src={fullLogo} 
              alt="Family Lyfe Fix" 
              className="h-16 md:h-24 mx-auto object-contain"
            />
          </div>

          {/* Celebration Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/15 text-primary px-5 py-2.5 rounded-full text-sm font-bold animate-scale-in shadow-lg shadow-primary/10">
            <Sparkles className="h-4 w-4 animate-sparkle" />
            IT'S LIVE!
            <Sparkles className="h-4 w-4 animate-sparkle" style={{ animationDelay: '0.5s' }} />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground leading-tight animate-fade-in">
            The End-Of-Lyfe Planner
            <span className="block bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent mt-3">
              is finally here!
            </span>
          </h1>

          {/* Value Proposition */}
          <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground max-w-3xl mx-auto animate-fade-in leading-relaxed">
            Give your family the gift of <span className="text-foreground font-semibold">peace of mind</span>. Everything they need, organized in one place.
          </p>

          {/* Price Card */}
          <Card className="inline-block p-8 md:p-10 bg-card/90 backdrop-blur-md border-2 border-primary/30 shadow-2xl shadow-primary/20 animate-scale-in relative overflow-hidden">
            {/* Gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
            <div className="relative space-y-3">
              <p className="text-5xl md:text-6xl font-bold text-foreground">$147</p>
              <p className="text-lg text-muted-foreground">One-time payment</p>
              <div className="flex items-center justify-center gap-2 text-sm text-primary font-medium pt-2">
                <Shield className="h-4 w-4" />
                <span>14-day money-back guarantee</span>
              </div>
            </div>
          </Card>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto pt-4">
            <Card className="p-6 bg-card/60 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/5">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg text-foreground">Step-by-Step Guidance</h3>
                <p className="text-muted-foreground">Clear checklists and prompts to organize everything</p>
              </div>
            </Card>
            <Card className="p-6 bg-card/60 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/5">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg text-foreground">Peace of Mind</h3>
                <p className="text-muted-foreground">Know your family won't be left guessing</p>
              </div>
            </Card>
            <Card className="p-6 bg-card/60 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/5">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg text-foreground">Save Hours of Stress</h3>
                <p className="text-muted-foreground">Everything in one place, ready when needed</p>
              </div>
            </Card>
          </div>

          {/* Primary CTA */}
          <div className="space-y-5 pt-6">
            <Button 
              size="lg" 
              className="text-lg md:text-xl px-10 md:px-12 py-7 md:py-8 h-auto animate-pulse-glow shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:scale-105 transition-all duration-300" 
              asChild
            >
              <a href="https://www.familylyfefix.io/product-overview" target="_blank" rel="noopener noreferrer">
                Get the Planner Now
                <ArrowRight className="ml-2 h-5 w-5 md:h-6 md:w-6" />
              </a>
            </Button>

            {/* Secondary CTA */}
            <p className="text-muted-foreground text-lg">
              Not ready?{" "}
              <Link to="/quiz" className="text-primary hover:underline font-semibold hover:text-primary/80 transition-colors">
                Take the free readiness quiz first →
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-10 text-center relative z-10 border-t border-border/30">
        <img 
          src={fullLogo} 
          alt="Family Lyfe Fix" 
          className="h-8 mx-auto mb-4 opacity-60"
        />
        <p className="text-sm text-muted-foreground">
          Your information stays private. We never share your data.
        </p>
      </footer>
    </div>
  );
};

export default Launch;
