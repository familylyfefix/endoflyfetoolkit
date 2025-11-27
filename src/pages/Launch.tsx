import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Shield, Sparkles, Lock, CreditCard } from "lucide-react";
import fullLogo from "@/assets/full-logo.png";
import ExitIntentPopup from "@/components/ExitIntentPopup";

// Celebration colors - vibrant and festive
const celebrationColors = [
  'hsl(var(--primary))',
  'hsl(45, 93%, 58%)',
  'hsl(330, 80%, 60%)',
  'hsl(200, 85%, 55%)',
  'hsl(280, 70%, 60%)',
  'hsl(150, 70%, 50%)',
];

// Subtle confetti - reduced pieces for elegance
const confettiPieces = Array.from({ length: 30 }, (_, i) => {
  const shapeRandom = Math.random();
  const shape = shapeRandom > 0.6 ? 'circle' : 'square';
  return {
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 4,
    duration: 6 + Math.random() * 4,
    size: 4 + Math.random() * 6,
    color: celebrationColors[Math.floor(Math.random() * celebrationColors.length)],
    shape,
    opacity: 0.4 + Math.random() * 0.3,
    rotation: Math.random() * 360
  };
});

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
          opacity: piece.opacity,
          transform: `rotate(${piece.rotation}deg)`
        }}
      />
    ))}
  </div>
);

const Launch = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(-45deg, hsl(var(--primary) / 0.15), hsl(var(--background)), hsl(var(--accent) / 0.2), hsl(var(--primary) / 0.1))',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 15s ease infinite'
        }}
      />
      
      {/* Decorative gradient shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div 
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-primary/15 to-transparent rounded-full blur-3xl"
          style={{ animation: 'float 20s ease-in-out infinite' }}
        />
        <div 
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-3xl"
          style={{ animation: 'float 25s ease-in-out infinite reverse' }}
        />
      </div>
      
      {/* Subtle confetti */}
      <Confetti />
      
      {/* Header with logo */}
      <header className="relative z-10 p-4 md:p-6">
        <img 
          src={fullLogo} 
          alt="Family Lyfe Fix" 
          className="h-10 md:h-12 object-contain"
        />
      </header>
      
      <main className="container mx-auto px-4 py-8 md:py-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8 md:space-y-10">
          
          {/* Celebration Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/15 text-primary px-5 py-2.5 rounded-full text-sm font-bold animate-scale-in shadow-lg shadow-primary/10">
            <Sparkles className="h-4 w-4" />
            IT'S LIVE!
            <Sparkles className="h-4 w-4" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight animate-fade-in">
            The End-Of-Lyfe Planner
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mt-2">
              is finally here.
            </span>
          </h1>

          {/* Value Proposition */}
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fade-in leading-relaxed">
            Give your family the gift of <span className="text-foreground font-semibold">peace of mind</span>. Everything they need, organized in one place.
          </p>

          {/* Price Card */}
          <Card className="inline-block p-6 md:p-8 bg-card/90 backdrop-blur-md border border-primary/20 shadow-xl animate-scale-in">
            <div className="space-y-2">
              <p className="text-sm font-medium text-primary">Launch Special</p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl text-muted-foreground line-through">$197</span>
                <span className="text-4xl md:text-5xl font-bold text-foreground">$147</span>
              </div>
              <p className="text-sm font-semibold text-primary">Save $50 today</p>
              <p className="text-muted-foreground text-sm">One-time payment • Buy now, pay later available</p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-2">
                <Shield className="h-4 w-4" />
                <span>14-day money-back guarantee</span>
              </div>
            </div>
          </Card>

          {/* Primary CTA */}
          <div className="space-y-4 pt-4">
            <Button
              size="lg" 
              className="text-lg px-10 py-6 h-auto animate-pulse-glow hover:scale-105 transition-transform duration-300" 
              asChild
            >
              <a href="https://www.familylyfefix.io/product-overview" target="_blank" rel="noopener noreferrer">
                Get the Planner Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>

            {/* Secondary CTA */}
            <p className="text-muted-foreground">
              Not ready?{" "}
              <Link to="/quiz" className="text-primary hover:underline font-medium transition-colors">
                Take the free readiness quiz →
              </Link>
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4 text-muted-foreground">
              <div className="flex items-center gap-1.5 text-xs">
                <Lock className="h-4 w-4" />
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <CreditCard className="h-4 w-4" />
                <span>All Major Cards</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <Shield className="h-4 w-4" />
                <span>Money-Back Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 py-6 text-center">
        <p className="text-sm text-muted-foreground">
          Your information stays private. Always.
        </p>
      </footer>

      {/* Exit Intent Popup */}
      <ExitIntentPopup />
    </div>
  );
};

export default Launch;
