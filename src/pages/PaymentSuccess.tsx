
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Download, FileText, Star, ExternalLink, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const PaymentSuccess = () => {
  const [sessionId, setSessionId] = useState<string>("");
  const [orderAmount, setOrderAmount] = useState<number | null>(null);
  const [purchaseDate, setPurchaseDate] = useState<string>("");

  const supabase = createClient(
    "https://your-project.supabase.co", // This will be replaced by Lovable's Supabase integration
    "your-anon-key" // This will be replaced by Lovable's Supabase integration
  );

  useEffect(() => {
    // Get session ID from URL params (would come from Stripe redirect)
    const urlParams = new URLSearchParams(window.location.search);
    const session = urlParams.get('session_id');
    if (session) {
      setSessionId(session);
      
      // Set purchase details
      const now = new Date();
      setPurchaseDate(now.toLocaleDateString());
      
      // Determine price based on launch date (early bird pricing)
      // Early bird: $67 for first 7 days, then $87
      const launchDate = new Date("2025-07-15T00:00:00Z"); // Launch date
      const currentDate = new Date();
      const diffTime = currentDate.getTime() - launchDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      // If within 7 days of launch, early bird price ($67), otherwise regular price ($87)
      setOrderAmount(diffDays <= 7 ? 67 : 87);
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
            src="lovable-uploads/2c84c08c-6540-4f05-b78f-63646402975a.png"
            alt="Family Lyfe Fix Logo"
            className="h-16 mx-auto"
          />
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
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
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">Order Summary</CardTitle>
            <div className="text-sm text-muted-foreground">
              Session: {sessionId || "Processing..."}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="flex-shrink-0">
                <img 
                  src="lovable-uploads/3505be58-1c51-40e9-a585-b632bfdac907.png"
                  alt="End-of-Life Toolkit"
                  className="w-20 h-20 object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">End-of-Lyfe Toolkit</h3>
                <p className="text-muted-foreground text-sm">Complete digital guide + templates</p>
              </div>
              <div className="flex-shrink-0">
                <p className="text-2xl font-bold text-orange-500">${orderAmount ? orderAmount.toFixed(2) : '0.00'}</p>
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

            <div className="space-y-4 max-w-md mx-auto">
              <Button 
                onClick={handleDownload}
                className="w-full h-12 text-lg font-semibold"
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
                  className="text-primary hover:text-primary max-w-xs mx-auto"
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
                <p className="text-muted-foreground">Get familiar with all the included sections and checklists</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold text-lg">Gather your important documents</h3>
                <p className="text-muted-foreground">Start organizing your information using our structured approach</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold text-lg">Begin organizing your personal information</h3>
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
            <Button variant="outline" size="lg" className="max-w-xs mx-auto">
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
            <Button variant="outline" className="max-w-xs mx-auto">
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
