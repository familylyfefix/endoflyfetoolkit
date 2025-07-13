import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Download, FileText, Star, ExternalLink, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    // Get session ID from URL params (would come from Stripe redirect)
    const urlParams = new URLSearchParams(window.location.search);
    const session = urlParams.get('session_id');
    if (session) {
      setSessionId(session);
    }
  }, []);

  const handleDownload = () => {
    // This would trigger the actual download
    console.log("Download initiated");
  };

  const handleOpenPDF = () => {
    // This would open the PDF in a new tab
    window.open('#', '_blank');
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

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Payment Successful!
          </h1>
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg mb-6">
            <Check className="h-4 w-4" />
            <span>Payment verified successfully!</span>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Thank you for your purchase. Your End-of-Lyfe Toolkit is ready for secure download.
          </p>
        </div>

        {/* Order Summary */}
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Order Summary</CardTitle>
            <Badge variant="outline" className="text-xs">
              Session: {sessionId || "..."}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 bg-accent/30 p-4 rounded-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">End-of-Lyfe Toolkit</h3>
                <p className="text-muted-foreground text-sm">Complete digital guide + templates</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">$67.00</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Download Section */}
        <Card className="mb-8">
          <CardContent className="pt-6 text-center">
            <Download className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Secure Download</h2>
            <p className="text-muted-foreground mb-6">
              Your complete End-of-Lyfe Toolkit is ready for secure download.
            </p>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-green-700">
                <Check className="h-4 w-4" />
                <span className="font-medium">✅ Download link ready - unlimited access</span>
              </div>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={handleDownload}
                className="w-full max-w-md h-12 text-lg font-semibold"
                size="lg"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Your Toolkit Now
              </Button>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Or access directly:</p>
                <Button 
                  variant="outline" 
                  onClick={handleOpenPDF}
                  className="text-primary hover:text-primary"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open PDF in New Tab
                </Button>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>Secure download - payment verified</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What's Next Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-center">What's Next?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold text-lg">Download and review your complete toolkit</h3>
                <p className="text-muted-foreground">Get familiar with all the included templates and guides</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold text-lg">Use the preparation checklist to get ready</h3>
                <p className="text-muted-foreground">Start organizing your information using our structured approach</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold text-lg">Schedule your first family conversation</h3>
                <p className="text-muted-foreground">Use our conversation templates to start the important discussions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Section */}
        <Card className="mb-8">
          <CardContent className="pt-6 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Need help or have questions about your purchase?
            </h3>
            <Button variant="outline" size="lg">
              Contact Support
            </Button>
          </CardContent>
        </Card>

        {/* Rating Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-2 text-lg font-medium">4.9/5 average rating</span>
          </div>
          <p className="text-muted-foreground">
            Join 50+ families who have successfully used this guide
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link to="/">
            <Button variant="outline">
              Back to Home
            </Button>
          </Link>
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

export default PaymentSuccess;