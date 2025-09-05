import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, X, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NewsletterPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("newsletter-popup-seen");
    const hasSubscribed = localStorage.getItem("newsletter-subscribed");
    
    if (!hasSeenPopup && !hasSubscribed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem("newsletter-popup-seen", "true");
      }, 15000); // Show after 15 seconds
      
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleExitIntent = (e: MouseEvent) => {
      if (e.clientY <= 0 && !localStorage.getItem("newsletter-subscribed")) {
        setIsOpen(true);
      }
    };

    document.addEventListener("mouseleave", handleExitIntent);
    return () => document.removeEventListener("mouseleave", handleExitIntent);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would integrate with your email service
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setIsSuccess(true);
      localStorage.setItem("newsletter-subscribed", "true");
      
      toast({
        title: "Welcome to the family!",
        description: "Check your email for your free Emergency Contact Template.",
      });
      
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        {!isSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Get Your FREE Emergency Contact Template
              </DialogTitle>
              <DialogDescription>
                Join 500+ families who've taken the first step toward peace of mind. 
                Get instant access to our Emergency Contact Template - no strings attached!
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="space-y-3">
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Get My Free Template"}
                </Button>
                
                <p className="text-xs text-center text-muted-foreground">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">You're all set!</h3>
            <p className="text-sm text-muted-foreground">
              Check your email for your free Emergency Contact Template.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NewsletterPopup;