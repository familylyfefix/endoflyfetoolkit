
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Download, FileText, Star, ExternalLink, Mail, RefreshCw, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const PaymentSuccess = () => {
  const [sessionId, setSessionId] = useState<string>("");
  const [orderAmount, setOrderAmount] = useState<number | null>(null);
  const [purchaseDate, setPurchaseDate] = useState<string>("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadInfo, setDownloadInfo] = useState<{
    remainingDownloads: number;
    expiresAt: string;
  } | null>(null);
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    // Get session ID from URL params (comes from Stripe redirect)
    const urlParams = new URLSearchParams(window.location.search);
    const session = urlParams.get('session_id');
    if (session) {
      setSessionId(session);
      
      // Set purchase details
      const now = new Date();
      setPurchaseDate(now.toLocaleDateString());
      
      // Get payment session details from Stripe
      getPaymentSessionDetails(session);
    }
  }, []);

  const getPaymentSessionDetails = async (sessionId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('get-payment-session', {
        body: { sessionId }
      });

      if (error) throw error;
      
      console.log('Payment session details:', data);
      setCustomerEmail(data.customerEmail);
      setCustomerName(data.customerName);
      setOrderAmount((data.amountTotal || 0) / 100); // Convert from cents
      
      // Send welcome email automatically with real customer details
      sendWelcomeEmail(sessionId, data.customerEmail, data.customerName);
    } catch (error) {
      console.error('Error getting payment session details:', error);
      // Fallback pricing
      const launchDate = new Date("2025-07-15T00:00:00Z");
      const currentDate = new Date();
      const diffTime = currentDate.getTime() - launchDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      setOrderAmount(diffDays <= 7 ? 67 : 87);
    }
  };

  const sendWelcomeEmail = async (sessionId: string, email?: string, name?: string) => {
    try {
      setIsEmailSending(true);
      const emailToUse = email || customerEmail;
      const nameToUse = name || customerName || emailToUse.split('@')[0];
      
      if (!emailToUse) {
        console.error('No email available for sending welcome email');
        return;
      }

      const { data, error } = await supabase.functions.invoke('convertkit-email', {
        body: {
          email: emailToUse,
          name: nameToUse,
          sessionId: sessionId
        }
      });

      if (error) {
        console.error('Email sending failed:', error);
      } else {
        toast({
          title: "Welcome email sent!",
          description: "Check your inbox for download instructions and backup access.",
        });
      }
    } catch (error) {
      console.error('Email sending error:', error);
    } finally {
      setIsEmailSending(false);
    }
  };

  const handleDownload = async () => {
    if (!sessionId) {
      toast({
        title: "Error",
        description: "No session ID found. Please check your payment confirmation.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsDownloading(true);
      
      const { data, error } = await supabase.functions.invoke('secure-download', {
        body: { sessionId }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      // Update download info
      setDownloadInfo({
        remainingDownloads: data.remainingDownloads,
        expiresAt: data.expiresAt
      });

      // Trigger download
      window.open(data.downloadUrl, '_blank');
      
      toast({
        title: "Download started!",
        description: `${data.remainingDownloads} downloads remaining. Access expires ${new Date(data.expiresAt).toLocaleDateString()}.`,
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Download failed";
      toast({
        title: "Download Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleResendEmail = async () => {
    if (!sessionId) return;
    await sendWelcomeEmail(sessionId, customerEmail, customerName);
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
                  src="/lovable-uploads/3505be58-1c51-40e9-a585-b632bfdac907.png"
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
              <div className="flex items-center justify-center gap-2 text-green-700 mb-2">
                <Check className="h-4 w-4" />
                <span className="font-medium">✅ Secure download ready</span>
              </div>
              {downloadInfo && (
                <div className="text-sm text-green-600">
                  <p>{downloadInfo.remainingDownloads} downloads remaining</p>
                  <p>Access expires: {new Date(downloadInfo.expiresAt).toLocaleDateString()}</p>
                </div>
              )}
              {!downloadInfo && (
                <div className="text-sm text-green-600">
                  <p>3 downloads available • 30-day access</p>
                </div>
              )}
            </div>

            <div className="space-y-4 max-w-md mx-auto">
              <Button 
                onClick={handleDownload}
                disabled={isDownloading || !sessionId}
                className="w-full h-12 text-lg font-semibold"
                size="lg"
              >
                {isDownloading ? (
                  <>
                    <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                    Preparing Download...
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5 mr-2" />
                    Download Your Toolkit Now
                  </>
                )}
              </Button>
              
              <div className="text-center space-y-2">
                <Button 
                  variant="outline" 
                  onClick={handleResendEmail}
                  disabled={isEmailSending}
                  className="text-primary hover:text-primary"
                >
                  {isEmailSending ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Sending Email...
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      Resend Welcome Email
                    </>
                  )}
                </Button>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-green-500" />
                <span>Secure download - payment verified</span>
              </div>
              
              {!sessionId && (
                <div className="flex items-center justify-center gap-2 text-sm text-amber-600 bg-amber-50 p-2 rounded">
                  <AlertCircle className="h-4 w-4" />
                  <span>Waiting for payment confirmation...</span>
                </div>
              )}
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
