import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle, FileText, Users, Shield, Clock, Gift, ChevronRight, Heart, Home, Calendar, AlertTriangle, Package } from 'lucide-react';
import CountdownBanner from '@/components/CountdownBanner';
import SocialProof from '@/components/SocialProof';
import FloatingCTA from '@/components/FloatingCTA';
import NewsletterPopup from '@/components/NewsletterPopup';
import TestimonialCarousel from '@/components/TestimonialCarousel';

const OFFER_DURATION_HOURS = 120; // 5 days (120 hours)

const Index = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isExpired, setIsExpired] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | undefined>(undefined);

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
    const duration = OFFER_DURATION_HOURS * 60 * 60 * 1000; // Convert hours to milliseconds

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

  const handleCTA = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>End-Of-Lyfe Toolkit - Family Emergency Planning & Estate Organization</title>
        <meta name="description" content="Organize your family's important information with the End-Of-Lyfe Toolkit. Emergency contacts, medical wishes, financial accounts - everything in one secure place. Save $20 today!" />
        <meta name="keywords" content="end of life planning, family emergency preparedness, estate planning toolkit, emergency contact template, medical wishes documentation, family organization system" />
        <meta property="og:title" content="End-Of-Lyfe Toolkit - Get Your Family Organized Today" />
        <meta property="og:description" content="The complete system to organize your family's critical information. Join 500+ families who've found peace of mind." />
        <meta property="og:type" content="product" />
        <link rel="canonical" href="https://familylyfefix.com/toolkit" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "End-Of-Lyfe Toolkit",
            "description": "Complete family emergency planning and organization system",
            "offers": {
              "@type": "Offer",
              "price": isExpired ? "67" : "47",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "reviewCount": "500"
            }
          })}
        </script>
      </Helmet>

      <NewsletterPopup />
      <FloatingCTA onCTAClick={handleCTA} isExpired={isExpired} />
      
      {/* Logo Header */}
      <header className="container mx-auto px-4 py-4">
        <div className="flex justify-center">
          <img 
            src="/lovable-uploads/baef2c11-0b05-429f-bc8e-0b2d2c97fa57.png" 
            alt="Family Lyfe Fix - End of Life Planning" 
            className="h-16 md:h-24"
          />
        </div>
      </header>

      {/* Countdown Banner */}
      {!isExpired && <CountdownBanner />}

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
          What happens if something happens to you?
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Stop worrying about leaving your family in chaos. Get everything organized once and for all with the End-Of-Lyfe Toolkit.
        </p>
        
        {/* CTA Button with animation */}
        <div className="space-y-3">
          {!isExpired && (
            <span className="inline-block bg-destructive/10 text-destructive text-sm font-semibold px-3 py-1 rounded-full animate-pulse">
              SAVE $20 - Limited Time Only
            </span>
          )}
          <div>
            <Button 
              size="lg" 
              className="animate-pulse-subtle transform hover:scale-105 transition-transform duration-200"
              onClick={handleCTA}
            >
              Get The Toolkit Now <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Tabs defaultValue="buy" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="buy">Get The Toolkit</TabsTrigger>
              <TabsTrigger value="free">FREE Resources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="buy" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    The End-Of-Lyfe Toolkit
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>The complete system to get your family's critical information organized once and for all.</p>
                  
                  <div className="space-y-2">
                    <p className="font-semibold">What you get:</p>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Emergency Contact Template</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Medical Wishes Worksheet</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Financial Accounts Organizer</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Password Manager Template</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Important Documents Checklist</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Family Meeting Guide</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="text-center pt-4">
                    {!isExpired && (
                      <span className="inline-block bg-destructive/10 text-destructive text-xs font-semibold px-2 py-1 rounded-full mb-2">
                        5-DAY SPECIAL - SAVE $20
                      </span>
                    )}
                    <div className="mb-4">
                      <span className="text-3xl font-bold">${isExpired ? "67" : "47"}</span>
                      {!isExpired && (
                        <span className="text-muted-foreground line-through ml-2">$67</span>
                      )}
                    </div>
                    <Button className="w-full animate-pulse-subtle" size="lg" onClick={handleCTA}>
                      Get Instant Access
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Instant download • Lifetime access
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Additional CTA within tab */}
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground mb-3">
                  Join 500+ families who've already gotten organized
                </p>
                <Button variant="outline" onClick={handleCTA}>
                  Yes, I Want Peace of Mind →
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="free" className="space-y-4 mt-6">
              <Card className="border-primary/20">
                <CardHeader className="bg-primary/5">
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="h-5 w-5 text-primary" />
                    FREE Emergency Contact Template
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="bg-secondary/30 rounded-lg p-4">
                    <p className="font-semibold mb-2">Start with our most popular template - absolutely free!</p>
                    <p className="text-sm text-muted-foreground">
                      Get organized in 10 minutes with this essential first step
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="font-semibold">Perfect for:</p>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Parents with young children</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Anyone caring for aging parents</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Families wanting to be prepared</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="text-center pt-4">
                    <div className="mb-2">
                      <span className="text-xs font-semibold text-primary">500+ DOWNLOADS THIS WEEK</span>
                    </div>
                    <Button 
                      className="w-full transform hover:scale-105 transition-transform" 
                      size="lg" 
                      variant="secondary"
                      onClick={() => window.open('https://familylyfefix.com/emergency-contacts', '_blank')}
                    >
                      Download Free Template
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      No credit card required • Instant download
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Upgrade CTA */}
              <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
                <CardContent className="pt-6 text-center">
                  <p className="text-sm font-semibold mb-2">Want the complete system?</p>
                  <p className="text-xs text-muted-foreground mb-3">
                    Get all 6 templates + the family meeting guide
                  </p>
                  <Button size="sm" onClick={handleCTA}>
                    Upgrade to Full Toolkit
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Benefits Cards */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Complete Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Everything your family needs to know, organized in one accessible place. From passwords to funeral wishes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Legal & Financial Clarity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Clear instructions for handling accounts, insurance policies, and legal matters. No confusion, no mistakes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Emotional Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Personal messages and guidance to comfort your loved ones during their most difficult time.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonial Carousel */}
      <TestimonialCarousel />
      
      {/* Additional Social Proof */}
      <SocialProof />

      {/* Video Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>See It In Action</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src="https://www.loom.com/embed/f70e3a842aa849d892ce1c0f859b20a1?sid=e8e6f383-aed5-461b-9a09-397fb951a32e"
                  frameBorder="0"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  title="Toolkit Demo"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Price Comparison */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-8">
            Compare Your Options
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-muted">
              <CardHeader>
                <CardTitle className="text-xl">Without The Toolkit</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
                  <span className="text-sm">Scrambling to find passwords and accounts</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
                  <span className="text-sm">Family conflicts over unclear wishes</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
                  <span className="text-sm">Expensive mistakes during crisis</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
                  <span className="text-sm">Overwhelming stress when grieving</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary">
              <CardHeader>
                <CardTitle className="text-xl text-primary">With The Toolkit</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                  <span className="text-sm">Everything organized in one place</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                  <span className="text-sm">Clear wishes prevent family disputes</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                  <span className="text-sm">Step-by-step guidance saves money</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                  <span className="text-sm">Peace of mind during difficult times</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            {!isExpired && (
              <div className="inline-block bg-destructive/10 text-destructive text-sm font-semibold px-4 py-2 rounded-full mb-4">
                ⏰ 5-Day Special Ends Soon - Save $20
              </div>
            )}
            <Button 
              size="lg" 
              onClick={handleCTA}
              className="animate-pulse-subtle transform hover:scale-105 transition-transform"
            >
              {isExpired ? "Get The Toolkit for $67" : "Get The Toolkit for $47 (Save $20)"}
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Instant download • Lifetime access • 30-day guarantee
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-12 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-8">
            Common Questions
          </h2>
          
          <Accordion type="single" collapsible value={openFaq} onValueChange={setOpenFaq}>
            <AccordionItem value="item-1">
              <AccordionTrigger>Is this really worth the price?</AccordionTrigger>
              <AccordionContent>
                Consider the alternative: Your family spending hours searching for information during their worst moment, potentially making expensive mistakes, or dealing with family conflicts. This toolkit saves them from that pain and confusion. It's less than the cost of a single hour with an estate attorney, yet provides comprehensive organization that could save thousands in avoided mistakes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>What if I'm young and healthy?</AccordionTrigger>
              <AccordionContent>
                Life is unpredictable. Young parents especially need this - who would care for your children? How would they access your accounts? The toolkit isn't about age, it's about responsibility. Plus, having everything organized now means you can update it gradually over the years rather than scrambling later.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>How is this different from a will?</AccordionTrigger>
              <AccordionContent>
                A will is a legal document that takes effect after death. This toolkit handles everything a will doesn't - the immediate practical matters, emotional support, passwords, personal wishes, and day-to-day guidance your family needs right away. It complements legal documents by providing the human side of preparation.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Is my information secure?</AccordionTrigger>
              <AccordionContent>
                You control everything. The toolkit is a template you download and customize on your own devices. You decide where to store it and who has access. We recommend password-protecting sensitive sections and keeping physical copies in a secure location.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>What if I need help setting it up?</AccordionTrigger>
              <AccordionContent>
                The toolkit includes a detailed setup guide that walks you through every section. Most people complete the basic setup in 2-3 hours. You can also add information gradually - start with the essentials and build from there. Email support is available if you get stuck.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="pt-8 pb-8 text-center">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-4">
              Your Family Deserves This Peace of Mind
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Don't wait for a crisis to wish you had been prepared. Get organized today.
            </p>
            {!isExpired && (
              <div className="mb-4">
                <span className="inline-block bg-destructive text-white text-sm font-bold px-4 py-2 rounded-full animate-pulse">
                  🔥 Last Chance: Save $20 Before Price Goes Up
                </span>
              </div>
            )}
            <Button 
              size="lg" 
              onClick={handleCTA} 
              className="mb-4 animate-pulse-subtle transform hover:scale-105 transition-transform"
            >
              {isExpired ? "Get Started for $67" : "Get Started for $47 (Save $20!)"}
            </Button>
            <p className="text-sm text-muted-foreground">
              Join 500+ families who sleep better knowing everything is organized
            </p>
            <div className="flex items-center justify-center gap-6 mt-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                30-Day Guarantee
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Instant Access
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                500+ Happy Families
              </span>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t">
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2024 Family Lyfe Fix. All rights reserved.</p>
          <p className="mt-2">Questions? Email support@familylyfefix.com</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;