import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, Users, FileText, Heart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Checkout = () => {
  const handlePurchase = () => {
    // This would integrate with your payment processor
    console.log("Purchase initiated");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Product Details */}
          <div className="space-y-6">
            <div className="text-center md:text-left">
              <Badge variant="secondary" className="mb-4">Limited Time Offer</Badge>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Complete Family Grief Toolkit
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
                    <p className="font-medium">Legal & Financial Organizer</p>
                    <p className="text-sm text-muted-foreground">Document templates and tracking systems</p>
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
                    <p className="font-medium">Emotional Support Resources</p>
                    <p className="text-sm text-muted-foreground">Coping strategies and healing guidance</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Long-term Recovery Framework</p>
                    <p className="text-sm text-muted-foreground">6-month healing roadmap and milestones</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Proof */}
            <Card className="bg-accent/50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="font-medium">Join 2,847 families who found peace</span>
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
                    <span>Complete Family Grief Toolkit</span>
                    <span className="font-medium">$47</span>
                  </div>
                  <div className="flex justify-between items-center text-muted-foreground">
                    <span>Instant digital access</span>
                    <span>Included</span>
                  </div>
                  <div className="flex justify-between items-center text-muted-foreground">
                    <span>Lifetime updates</span>
                    <span>Included</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between items-center font-bold text-lg">
                    <span>Total</span>
                    <span>$47</span>
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
                      <Clock className="h-4 w-4" />
                      <span>Instant digital delivery</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Heart className="h-4 w-4" />
                      <span>30-day money-back guarantee</span>
                    </div>
                  </div>
                </div>

                {/* Urgency */}
                <div className="bg-accent/30 rounded-lg p-4 text-center">
                  <p className="text-sm font-medium text-foreground mb-1">
                    Special Launch Price
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Regular price $97 • Save $50 today only
                  </p>
                </div>

                {/* Trust Signals */}
                <div className="border-t border-border pt-4 space-y-2">
                  <p className="text-xs text-muted-foreground text-center">
                    ✓ Secure checkout • ✓ Instant access • ✓ No subscription
                  </p>
                  <p className="text-xs text-muted-foreground text-center">
                    Created with compassion by grief counselors and legal experts
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
                  If this toolkit doesn't bring clarity and peace to your family during this difficult time, 
                  we'll refund your purchase within 30 days, no questions asked.
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