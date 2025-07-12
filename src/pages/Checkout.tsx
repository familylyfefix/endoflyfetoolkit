import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, Users, FileText, Heart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Checkout = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Get or set the countdown start time for this visitor
    const getCountdownStartTime = () => {
      const stored = localStorage.getItem('countdownStartTime');
      if (stored) {
        return parseInt(stored);
      } else {
        const startTime = Date.now();
        localStorage.setItem('countdownStartTime', startTime.toString());
        return startTime;
      }
    };

    const startTime = getCountdownStartTime();
    const duration = 72 * 60 * 60 * 1000; // 72 hours in milliseconds

    const updateTimer = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const remaining = duration - elapsed;

      if (remaining <= 0) {
        setIsExpired(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
      const hours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
      const seconds = Math.floor((remaining % (60 * 1000)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  const handlePurchase = () => {
    // This would integrate with your payment processor
    console.log("Purchase initiated");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Logo */}
      <header className="py-6 border-b border-border/20">
        <div className="container mx-auto px-4 text-center">
          <img 
            src="/lovable-uploads/2c84c08c-6540-4f05-b78f-63646402975a.png"
            alt="Family Lyfe Fix Logo"
            className="h-16 mx-auto"
          />
        </div>
      </header>
      {/* Navigation */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Product Details */}
          <div className="space-y-6">
            <div className="text-center md:text-left">
              <Badge variant="secondary" className="mb-4">Limited Time Offer</Badge>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                End-of-Lyfe Toolkit
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                This complete Notion-based toolkit turns overwhelming "what now?" moments into calm, confident steps your family can follow — even on the hardest day.
              </p>
            </div>

            {/* What's Included */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  What's Included
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Immediate Action Checklist</p>
                    <p className="text-sm text-muted-foreground">Essential first steps for the first 48 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Memorial Planning Guide</p>
                    <p className="text-sm text-muted-foreground">Comprehensive service and celebration planning</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Digital Assets & Password Guide</p>
                    <p className="text-sm text-muted-foreground">Secure access instructions for all online accounts, devices, and digital life</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Contact Directory Template</p>
                    <p className="text-sm text-muted-foreground">Complete list of who to notify, from family to financial institutions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Personal Message Templates</p>
                    <p className="text-sm text-muted-foreground">Space to leave heartfelt words and final wishes for your loved ones</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Proof */}
            <Card className="bg-accent/50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="font-medium">Join 50+ families who found peace</span>
                </div>
                <blockquote className="text-sm text-muted-foreground italic">
                  "This toolkit was a lifeline during the most difficult time in our lives. Having everything organized and knowing what steps to take next gave us the clarity we desperately needed."
                </blockquote>
                <p className="text-sm font-medium mt-2">— Sarah M., verified purchase</p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Complete End-of-Lyfe Toolkit</span>
                    <span className="font-medium">${isExpired ? '87' : '67'}</span>
                  </div>
                  <div className="flex justify-between items-center text-muted-foreground">
                    <span>Instant digital access</span>
                    <span>Included</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between items-center font-bold text-lg">
                    <span>Total</span>
                    <span>${isExpired ? '87' : '67'}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button 
                    onClick={handlePurchase}
                    className="w-full h-12 text-lg font-semibold"
                    size="lg"
                  >
                    Get Instant Access Now
                  </Button>
                  
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 flex-shrink-0" />
                      <span>Instant digital delivery</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 flex-shrink-0" />
                      <span>Ready to customize immediately</span>
                    </div>
                  </div>
                </div>

                {/* Urgency */}
                <div className="bg-accent/30 rounded-lg p-4 text-center">
                  <p className="text-sm font-medium text-foreground mb-1">
                    {isExpired ? 'Regular Price' : 'Special Launch Price'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isExpired ? 'No discount available' : 'Regular price $87 • Save $20 today only'}
                  </p>
                </div>

                {/* Trust Signals */}
                <div className="border-t border-border pt-4 space-y-2">
                  <p className="text-xs text-muted-foreground text-center">
                    ✓ Secure checkout • ✓ Instant access • ✓ No subscription
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Guarantee */}
            <Card className="border-primary/20">
              <CardContent className="pt-6 text-center">
                <Heart className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Our Promise to You</h3>
                <p className="text-sm text-muted-foreground">
                  This toolkit eliminates the guesswork and provides clear, actionable steps your loved ones can follow. Everything is organized, accessible, and ready when they need it most.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Family Lyfe Fix, LLC. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Checkout;