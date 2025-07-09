import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, Heart, Shield, Users, Star, ChevronDown, Download, Settings, FileText, UsersRound, Target } from "lucide-react";

const Index = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isExpired, setIsExpired] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  const handleCTA = () => {
    window.open('https://notion.so', '_blank');
  };

  const faqs = [
    {
      question: "Do I need Notion experience to use this template?",
      answer: "Not at all! The template is designed to be user-friendly with clear instructions. Even if you're new to Notion, you'll find it easy to customize and use."
    },
    {
      question: "What if my family situation is complicated?",
      answer: "The toolkit is designed to handle complex family dynamics with sections for multiple beneficiaries, step-families, and various relationship structures. It's fully customizable to your unique situation."
    },
    {
      question: "Is this really worth $67 when I could just write this myself?",
      answer: "While you could create something yourself, this template saves you 20+ hours of research and organization. It includes legal considerations, emotional support resources, and a proven framework that many families have successfully used."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Countdown Banner */}
      {isExpired ? (
        <div className="bg-destructive/10 border-b-2 border-destructive/30 py-4">
          <div className="container mx-auto px-4 text-center">
            <div className="text-destructive font-semibold flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              Special Offer Has Ended
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-orange-50 border-b-2 border-orange-300 py-4">
          <div className="container mx-auto px-4 text-center">
            <div className="text-orange-700 font-semibold flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              Early Bird Special Ends Soon: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </div>
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="text-center max-w-5xl mx-auto">          
          <h1 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight">
            Get Your Family's Most Important Conversations{" "}
            <span className="text-primary">Done Right</span>{" "}
            — With Zero Awkwardness
          </h1>
          
          <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto">
            The complete step-by-step Notion template that transforms scary end-of-life discussions into meaningful family moments
          </p>
          
          {/* Feature Highlights */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 mb-12 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <Download className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Instant Access</span>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <Settings className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Complete System</span>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Word-for-Word Scripts</span>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <UsersRound className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Family Coordination Tools</span>
            </div>
            
            <div className="flex flex-col items-center text-center lg:col-span-1 col-span-2 lg:mx-0 mx-auto">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Step-by-Step Framework</span>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 h-auto"
              onClick={handleCTA}
            >
              Get The Complete System Now - $67
            </Button>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-destructive">
                  The Problem: Your Family Will Face Chaos When You're Gone
                </h2>
                <ul className="space-y-4 text-lg">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-3 flex-shrink-0"></div>
                    <span>Struggling to find important documents while grieving</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-3 flex-shrink-0"></div>
                    <span>Making expensive mistakes due to poor guidance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-3 flex-shrink-0"></div>
                    <span>Family conflicts over unclear wishes and assets</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-3 flex-shrink-0"></div>
                    <span>Emotional overwhelm when they need clarity most</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-primary">
                  The Solution: A Complete Action Plan
                </h2>
                <p className="text-lg mb-6">
                  The End-of-Lyfe Toolkit organizes everything your family needs to know in one accessible place. From the first phone call to long-term healing, they'll have step-by-step guidance and emotional support.
                </p>
                <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
                  <p className="font-semibold text-primary mb-2">
                    "I wish we had this when my father passed. It would have saved us so much stress and confusion."
                  </p>
                  <p className="text-sm text-muted-foreground">— Sarah M., Early Tester</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Three Ways This Toolkit Transforms Crisis Into Clarity
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-primary/20">
              <CardHeader className="text-center">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl">Immediate Action Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Your family gets a clear, prioritized checklist for the first 24-72 hours. No more guessing what needs to be done first or worrying about missed deadlines.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20">
              <CardHeader className="text-center">
                <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl">Emotional Support Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Grief hits everyone differently. The toolkit includes coping strategies, support group resources, and guidance for helping children process loss.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20">
              <CardHeader className="text-center">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl">Family Communication Hub</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Keep everyone informed with shared access to important information, reducing family conflicts and ensuring nothing falls through the cracks.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Families Who've Used This System Share Their Stories
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mb-4 italic">
                  "When Mom passed suddenly, we were completely lost. This toolkit gave us the roadmap we desperately needed. It literally saved our family from falling apart."
                </p>
                <p className="font-semibold">— Jennifer K., Used toolkit for mother's passing</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mb-4 italic">
                  "I bought this for my own peace of mind. Knowing my kids will have clear guidance when I'm gone has lifted a huge weight off my shoulders."
                </p>
                <p className="font-semibold">— Robert T., Prepared toolkit for his family</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Badge className="mb-6 bg-destructive/10 text-destructive border-destructive/20">
              ⚡ LIMITED TIME OFFER
            </Badge>
            
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Get Complete Peace of Mind for Your Family
            </h2>
            
            <Card className="border-primary border-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold">
                SAVE $20
              </div>
              
              <CardHeader className="text-center pb-4">
                <div className="space-y-2">
                  <p className="text-lg text-muted-foreground line-through">Regular Price: $87</p>
                  <p className="text-4xl font-bold text-primary">$67</p>
                  <p className="text-muted-foreground">One-time payment • Lifetime access</p>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {isExpired ? (
                  <div className="bg-destructive/10 border-2 border-destructive/30 rounded-lg p-4 text-destructive font-semibold text-center flex items-center justify-center gap-2">
                    <Clock className="w-5 h-5" />
                    Special Offer Has Ended
                  </div>
                ) : (
                  <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-4 text-orange-700 font-semibold text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Clock className="w-5 h-5" />
                      Early Bird Special Ends Soon:
                    </div>
                    <div className="text-2xl font-bold">
                      {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                    </div>
                  </div>
                )}
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Complete End-of-Lyfe Toolkit (Notion Template)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Step-by-step implementation guide</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Emotional support resources</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Lifetime updates and improvements</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>30-day money-back guarantee</span>
                  </div>
                </div>
                
                <Button 
                  size="lg" 
                  className="w-full text-lg py-6 h-auto"
                  onClick={handleCTA}
                >
                  Get Instant Access - $67
                </Button>
                
                <p className="text-sm text-muted-foreground text-center">
                  Secure checkout • Instant download • Works with free Notion account
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="cursor-pointer" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold">{faq.question}</CardTitle>
                      <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                    </div>
                  </CardHeader>
                  {openFaq === index && (
                    <CardContent className="pt-0">
                      <Separator className="mb-4" />
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Don't Leave Your Family Guessing
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              The hardest part about losing someone you love shouldn't be figuring out what to do next. Give your family the gift of clarity and peace of mind.
            </p>
            
            <div className="bg-primary/10 p-8 rounded-lg border border-primary/20 mb-8">
              {isExpired ? (
                <div className="text-center">
                  <div className="bg-destructive/10 border-2 border-destructive/30 rounded-lg p-4 text-destructive font-semibold mb-4 flex items-center justify-center gap-2">
                    <Clock className="w-5 h-5" />
                    Special Offer Has Ended
                  </div>
                  <Button 
                    size="lg" 
                    className="text-lg px-8 py-6 h-auto"
                    onClick={handleCTA}
                  >
                    Get The Toolkit - $87
                  </Button>
                </div>
              ) : (
                <>
                  <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-4 text-orange-700 font-semibold text-center mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Clock className="w-5 h-5" />
                      Early Bird Special Ends Soon:
                    </div>
                    <div className="text-xl font-bold">
                      {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                    </div>
                  </div>
                  <Button 
                    size="lg" 
                    className="text-lg px-8 py-6 h-auto"
                    onClick={handleCTA}
                  >
                    Secure Your Family's Future - $67
                  </Button>
                </>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground">
              Protected by our 30-day money-back guarantee. If this toolkit doesn't provide the peace of mind you're looking for, we'll refund every penny.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
