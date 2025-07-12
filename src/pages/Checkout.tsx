import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Check, Clock, Users, FileText, Heart, ArrowLeft, Shield, Lock, Star, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  address: z.string().min(5, "Please enter a complete address"),
  city: z.string().min(2, "Please enter a valid city"),
  zipCode: z.string().min(5, "Please enter a valid ZIP code"),
});

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      zipCode: "",
    },
  });

  const handlePurchase = (values: z.infer<typeof formSchema>) => {
    // This would integrate with your payment processor
    console.log("Purchase initiated with values:", values);
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

      {/* Trust Badges */}
      <div className="bg-accent/30 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-primary" />
              <span>256-bit Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary" />
              <span>Secure Payment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">1</div>
              <span className="text-sm font-medium">Order Details</span>
            </div>
            <div className="h-px w-16 bg-border"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-medium">2</div>
              <span className="text-sm text-muted-foreground">Confirmation</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">End-of-Lyfe Toolkit</h3>
                    <p className="text-muted-foreground text-sm">Complete digital system</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-lg font-bold">${isExpired ? '87' : '67'}</span>
                      {!isExpired && <span className="text-sm text-muted-foreground line-through">$87</span>}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>${isExpired ? '87' : '67'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax:</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-3">
                    <span>Total:</span>
                    <span>${isExpired ? '87' : '67'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What's Included */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What's Included</CardTitle>
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
                    <p className="text-sm text-muted-foreground">Secure access instructions for all online accounts</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Contact Directory Template</p>
                    <p className="text-sm text-muted-foreground">Complete list of who to notify</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Personal Message Templates</p>
                    <p className="text-sm text-muted-foreground">Space for heartfelt final messages</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonials */}
            <Card className="bg-accent/50">
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <blockquote className="text-sm italic">
                    "This toolkit was a lifeline during the most difficult time in our lives. Having everything organized gave us the clarity we desperately needed."
                  </blockquote>
                  <p className="text-sm font-medium">— Sarah M., verified purchase</p>
                </div>
                <div className="border-t pt-4 space-y-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <blockquote className="text-sm italic">
                    "Worth every penny. The peace of mind knowing everything is organized is priceless."
                  </blockquote>
                  <p className="text-sm font-medium">— Michael R., verified purchase</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Checkout Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Complete Your Order</CardTitle>
                <CardDescription>
                  Fill out your information below to get instant access
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handlePurchase)} className="space-y-6">
                    {/* Contact Information */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-base">Contact Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="john@example.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Billing Address */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-base">Billing Address</h3>
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Main Street" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input placeholder="New York" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="zipCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ZIP Code</FormLabel>
                              <FormControl>
                                <Input placeholder="12345" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button 
                      type="submit"
                      className="w-full h-12 text-lg font-semibold"
                      size="lg"
                    >
                      Complete Secure Order - ${isExpired ? '87' : '67'}
                    </Button>

                    {/* Trust Signals */}
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Shield className="h-3 w-3" />
                          <span>SSL Secured</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Lock className="h-3 w-3" />
                          <span>Encrypted</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>Instant Access</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Your information is secure and will not be shared
                      </p>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Countdown Timer */}
            {!isExpired && (
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="pt-6 text-center">
                  <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Special Launch Price Expires Soon</h3>
                  <div className="flex justify-center gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-lg">{timeLeft.days}</div>
                      <div className="text-muted-foreground">Days</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg">{timeLeft.hours}</div>
                      <div className="text-muted-foreground">Hours</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg">{timeLeft.minutes}</div>
                      <div className="text-muted-foreground">Min</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg">{timeLeft.seconds}</div>
                      <div className="text-muted-foreground">Sec</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
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