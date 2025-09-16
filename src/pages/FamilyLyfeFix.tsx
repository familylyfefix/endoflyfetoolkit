import { useEffect, useState } from "react";
import avatar1 from '@/assets/avatar1.jpg';
import avatar2 from '@/assets/avatar2.jpg';
import avatar3 from '@/assets/avatar3.jpg';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  CheckCircle, 
  Star, 
  Clock,
  AlertCircle,
  ArrowRight,
  Check,
  X,
  ChevronDown,
  ChevronRight,
  Users,
  Heart,
  Lock,
  FileQuestion,
  FileText,
  BookOpen,
  Package
} from "lucide-react";
import ContactDialog from "@/components/ContactDialog";
import StickyCTA from "@/components/StickyCTA";
import CountdownBanner from "@/components/CountdownBanner";
import FAQSection from "@/components/FAQSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FamilyLyfeFix = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 47, minutes: 59, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToCTA = () => {
    document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Countdown Timer Banner */}
      <div className="bg-destructive text-destructive-foreground py-2 text-center">
        <p className="text-sm font-medium">
          ⏰ Special Offer Ends In: {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s - Save $20 Today!
        </p>
      </div>

      {/* Header */}
      <header className="container mx-auto px-4 py-4 border-b">
        <div className="flex items-center justify-between">
          <img 
            src="/lovable-uploads/9cb42045-e209-4551-b4e3-f954ef3737cc.png" 
            alt="Family Lyfe Fix" 
            className="h-12 w-auto" 
          />
          <ContactDialog>
            <Button variant="outline" size="sm">Contact</Button>
          </ContactDialog>
        </div>
      </header>

      {/* Section 1: Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
          <div>
            {/* Eyebrow Copy */}
            <p className="text-sm font-semibold text-primary mb-3">
              FOR FAMILIES WHO WANT PEACE OF MIND
            </p>
            
            {/* Headline */}
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Give Your Family Certainty When They Need It Most
            </h1>
            
            {/* Sub-headline */}
          <p className="text-xl text-muted-foreground mb-6">
            The complete end-of-life planning system that turns "what now?" into calm, confident steps — simplified with easy-to-use Notion templates
          </p>
            
            {/* Progressive CTA Section */}
            <div className="space-y-4">
              <Button size="lg" className="w-full" asChild>
                <a href="https://familylyfefix.typeform.com/ready-4the-talk" target="_blank" rel="noopener noreferrer">
                  Start Now — Avoid Chaos Later →
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              
              {/* Journey indicator bar */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Quiz (Free)</span>
                <ChevronRight className="h-3 w-3" />
                <span>PDF Guide</span>
                <ChevronRight className="h-3 w-3" />
                <span>Playbook</span>
                <ChevronRight className="h-3 w-3" />
                <span>Toolkit</span>
              </div>
              
              {/* Quick access for returning users */}
              <p className="text-xs text-muted-foreground">
                Already started? Jump to: 
                <a href="https://familylyfefix.store/playbook" className="underline ml-1">Playbook</a> • 
                <a href="/toolkit" className="underline ml-1">Toolkit</a>
              </p>
            </div>
            
            {/* Social Proof in Hero */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <img src={avatar1} alt="Family member" className="h-8 w-8 rounded-full object-cover border-2 border-background" />
                <img src={avatar2} alt="Family member" className="h-8 w-8 rounded-full object-cover border-2 border-background" />
                <img src={avatar3} alt="Family member" className="h-8 w-8 rounded-full object-cover border-2 border-background" />
              </div>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Join families who will sleep better at night
              </p>
            </div>
          </div>
          
          {/* Hero Image - showing happy result */}
          <div className="relative">
            <img 
              src="/lovable-uploads/baef2c11-0b05-429f-bc8e-0b2d2c97fa57.png" 
              alt="Family enjoying peace of mind" 
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
              <p className="font-bold text-lg">Our Goal: Help 500+ Families Achieve Peace of Mind</p>
            </div>
          </div>
        </div>
      </section>

      {/* Three Quick Outcomes */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4 md:gap-8">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            <span className="font-semibold">Family Protected</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            <span className="font-semibold">Zero Confusion</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            <span className="font-semibold">Peace of Mind</span>
          </div>
        </div>
      </section>

      {/* Section 2: Problem Agitation */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-8">
            73% of Families Are One Crisis Away From Total Chaos
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 text-left mb-8">
            <Card className="border-destructive/20 bg-destructive/5">
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">The 3AM Phone Call</p>
                    <p className="text-sm text-muted-foreground">
                      Your family scrambles to find passwords, accounts, and wishes while dealing with grief
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-destructive/20 bg-destructive/5">
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">The $15,000 Mistake</p>
                    <p className="text-sm text-muted-foreground">
                      Average family loses this much due to poor planning and missed deadlines
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-destructive/20 bg-destructive/5">
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Family Arguments</p>
                    <p className="text-sm text-muted-foreground">
                      Siblings fight over unclear wishes, destroying relationships forever
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-destructive/20 bg-destructive/5">
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Digital Death</p>
                    <p className="text-sm text-muted-foreground">
                      Your passwords, photos, and accounts disappear forever with no recovery
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <p className="text-lg text-muted-foreground">
            And the worst part? <span className="font-semibold text-foreground">You know this could happen to your family</span>, 
            but starting feels overwhelming, morbid, or just... impossible.
          </p>
        </div>
      </section>

      {/* Section 3: Solution Introduction */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
              We Get It. This Isn't Easy to Think About.
            </h2>
            <p className="text-lg text-muted-foreground">
              After helping 500+ families navigate these conversations, we've turned the overwhelming 
              into the organized. No judgment. No fear-mongering. Just clarity.
            </p>
          </div>
          
          <Card className="overflow-hidden">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="mb-4">
                    <Badge variant="secondary">Our Story</Badge>
                  </div>
                  <h3 className="font-playfair text-2xl font-bold mb-4">
                    From Personal Crisis to Family Solution
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    When our founder's father passed suddenly, the family spent months untangling 
                    accounts, searching for documents, and arguing over decisions that should have 
                    been simple.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    That experience led to Family Lyfe Fix — a complete system that ensures no 
                    family goes through that chaos again.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    <span className="font-semibold">That's why we created a complete journey:</span><br />
                    • Start with our Quiz to see where you stand (free)<br />
                    • Get the Conversation Starter PDF to break the ice<br />
                    • Use the Playbook to guide difficult conversations<br />
                    • Organize everything with the Toolkit
                  </p>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <p className="font-semibold">500+ Families Protected & Organized</p>
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-6">
                  <img 
                    src="/lovable-uploads/3505be58-1c51-40e9-a585-b632bfdac907.png" 
                    alt="Founder" 
                    className="rounded-lg mb-4"
                  />
                  <p className="text-center font-semibold">Sarah Mitchell</p>
                  <p className="text-center text-sm text-muted-foreground">Founder, Family Lyfe Fix</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Section 4: Benefits */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-12">
            What Your Family Gets With Family Lyfe Fix
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="pt-8">
                <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">90-Minute Setup</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Not months of planning — get everything organized this weekend
                </p>
                <p className="text-xs text-muted-foreground">
                  Powered by our step-by-step Notion template
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-8">
                <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Complete Coverage</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Medical, financial, digital, personal — nothing forgotten
                </p>
                <p className="text-xs text-muted-foreground">
                  20+ sections covering every aspect of life
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-8">
                <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Family Access</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Share securely with trusted family members instantly
                </p>
                <p className="text-xs text-muted-foreground">
                  Cloud-based system accessible anywhere
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-4">Choose Your Starting Point</h2>
          <p className="text-center text-muted-foreground mb-12">
            Every family is different. Start where you're comfortable.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Quiz Card */}
            <Card className="relative">
              <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground">FREE</Badge>
              <CardContent className="pt-6">
                <FileQuestion className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Readiness Quiz</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  5-minute assessment to see where your family stands
                </p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href="https://familylyfefix.typeform.com/ready-4the-talk" target="_blank" rel="noopener noreferrer">
                    Take Quiz Free
                  </a>
                </Button>
              </CardContent>
            </Card>
            
            {/* PDF Card */}
            <Card>
              <CardContent className="pt-6">
                <FileText className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Conversation Starter</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  PDF guide to break the ice with family
                </p>
                <p className="font-bold mb-2">$7</p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href="https://familylyfefix.store/pdf">Get the Guide</a>
                </Button>
              </CardContent>
            </Card>
            
            {/* Playbook Card */}
            <Card>
              <CardContent className="pt-6">
                <BookOpen className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">The Playbook</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Complete conversation framework & scripts
                </p>
                <p className="font-bold mb-2">$27</p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href="https://familylyfefix.store/playbook">Get Playbook</a>
                </Button>
              </CardContent>
            </Card>
            
            {/* Toolkit Card */}
            <Card className="border-primary relative">
              <Badge className="absolute -top-2 -right-2" variant="secondary">MOST POPULAR</Badge>
              <CardContent className="pt-6">
                <Package className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Complete Toolkit</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Full Notion system to organize everything
                </p>
                <p className="font-bold mb-2">
                  <span className="line-through text-muted-foreground">$67</span> $47
                </p>
                <Button size="sm" className="w-full" asChild>
                  <a href="/toolkit">Get Toolkit</a>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Bundle Option */}
          <Card className="mt-8 border-primary bg-primary/5">
            <CardContent className="pt-6 text-center">
              <Badge variant="secondary" className="mb-3">BEST VALUE</Badge>
              <h3 className="font-semibold text-xl mb-2">Complete Journey Bundle</h3>
              <p className="text-muted-foreground mb-4">
                Get everything: Quiz results + PDF + Playbook + Toolkit
              </p>
              <p className="text-2xl font-bold mb-4">
                <span className="line-through text-muted-foreground">$101</span> 
                <span className="text-primary ml-2">$67</span>
                <Badge className="ml-2">Save $34</Badge>
              </p>
              <Button size="lg" asChild>
                <a href="https://familylyfefix.store/bundle">Get Complete Bundle</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Section 5: Testimonials */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-12">
            Real Families. Real Peace of Mind.
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm mb-4">
                  "My dad had a stroke and couldn't speak. Because we used Family Lyfe Fix, we knew 
                  exactly what he wanted. No guessing. No guilt. Just clarity when we needed it most."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted" />
                  <div>
                    <p className="font-semibold text-sm">Jennifer R.</p>
                    <p className="text-xs text-muted-foreground">Verified Buyer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm mb-4">
                  "Setting this up took one Sunday afternoon. Now my wife and I sleep better knowing 
                  our three kids won't be left scrambling if something happens to us."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted" />
                  <div>
                    <p className="font-semibold text-sm">Michael T.</p>
                    <p className="text-xs text-muted-foreground">Verified Buyer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm mb-4">
                  "Worth it for the password manager alone! But having everything in one place — 
                  from insurance to final wishes — this is the gift every family needs."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted" />
                  <div>
                    <p className="font-semibold text-sm">Patricia L.</p>
                    <p className="text-xs text-muted-foreground">Verified Buyer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <img src="/lovable-uploads/8e1cf599-0190-4240-8a81-2509d0352f51.png" alt="Google" className="h-4" />
              <span>4.9/5 stars from 127 verified families</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Simple 3-Step Process */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-12">
            From Chaos to Clarity in 3 Simple Steps
          </h2>
          
          <div className="space-y-8">
            <div className="flex gap-4 items-start">
              <div className="shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-xl mb-2">Discover Your Readiness</h3>
                <p className="text-muted-foreground">
                  Take the free quiz, get your personalized readiness score, and receive the Conversation Starter PDF
                </p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-xl mb-2">Have the Conversation</h3>
                <p className="text-muted-foreground">
                  Use the Playbook to guide family discussions, navigate difficult topics with confidence, and get everyone on the same page
                </p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                3
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-xl mb-2">Organize Everything</h3>
                <p className="text-muted-foreground">
                  Set up your Toolkit in Notion, input all critical information, and share securely with family
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Comparison Chart */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-12">
            Why Families Choose Family Lyfe Fix
          </h2>
          
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-2 text-center font-semibold border-b">
                <div className="p-4 bg-primary text-primary-foreground">
                  Family Lyfe Fix
                </div>
                <div className="p-4 bg-muted">
                  Doing Nothing / DIY
                </div>
              </div>
              
              {[
                ["Complete system ready in 90 minutes", "Months of research and planning"],
                ["20+ life areas covered", "Inevitably miss critical details"],
                ["Professional templates included", "Start from scratch"],
                ["Secure cloud storage", "Papers scattered everywhere"],
                ["Family can access instantly", "Family left searching"],
                ["Regular update reminders", "Set and forget (outdated)"],
                ["Step-by-step guidance", "Figure it out alone"],
                ["One-time payment", "Lawyer fees ($2000+)"]
              ].map(([us, them], i) => (
                <div key={i} className="grid grid-cols-2 border-b text-sm">
                  <div className="p-4 flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span>{us}</span>
                  </div>
                  <div className="p-4 flex items-center gap-2 text-muted-foreground">
                    <X className="h-4 w-4 text-destructive shrink-0" />
                    <span>{them}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Section 8: Features/What's Included */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-4">
            Everything Your Family Needs
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Complete end-of-life planning system (valued at $497)
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Lock, text: "Password & account manager", product: "Toolkit" },
              { icon: Heart, text: "Healthcare directives template", product: "Toolkit" },
              { icon: Users, text: "Emergency contacts system", product: "Toolkit" },
              { icon: Shield, text: "Insurance policy tracker", product: "Toolkit" },
              { icon: Clock, text: "Important dates calendar", product: "Toolkit" },
              { icon: CheckCircle, text: "Legal documents checklist", product: "Toolkit" },
              { icon: AlertCircle, text: "Digital legacy planner", product: "Toolkit" },
              { icon: Star, text: "Financial accounts overview", product: "Toolkit" },
              { icon: BookOpen, text: "Conversation scripts & templates", product: "Playbook" },
              { icon: Heart, text: "Family discussion guides", product: "Playbook" },
              { icon: FileText, text: "Ice-breaker conversation starters", product: "PDF" },
              { icon: FileQuestion, text: "Readiness assessment", product: "Quiz" },
              { icon: Shield, text: "Home management guide", product: "Toolkit" },
              { icon: CheckCircle, text: "Professional contacts list", product: "Toolkit" },
              { icon: Star, text: "Lifetime updates included", product: "All" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <item.icon className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm">{item.text}</span>
                <Badge variant="outline" className="text-xs ml-auto">{item.product}</Badge>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: FAQ */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-12">
            Common Questions (We Get It, This Feels Big)
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                Is this morbid? I don't want to think about death.
              </AccordionTrigger>
              <AccordionContent>
                We hear you. But here's the thing — this isn't about death, it's about life. It's about 
                giving your family clarity and protecting them from chaos. Most customers tell us they 
                feel relieved, not sad, after setting this up. It's like insurance — you hope you never 
                need it, but you sleep better knowing it's there.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                I'm young and healthy. Do I really need this?
              </AccordionTrigger>
              <AccordionContent>
                Actually, young families need this most. You're the ones with young kids, new mortgages, 
                and fewer resources to handle a crisis. Plus, setting this up now means it grows with 
                you — just update it as life changes. It's not about age; it's about responsibility.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                How long does this really take to set up?
              </AccordionTrigger>
              <AccordionContent>
                Most families complete the initial setup in 60-90 minutes. You don't need everything 
                perfect on day one — just get the basics in place, then add details over time. The 
                template guides you through exactly what to do, step by step. No overwhelm.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                Is my information secure in Notion?
              </AccordionTrigger>
              <AccordionContent>
                Yes. Notion uses bank-level encryption and you control exactly who has access. You can 
                share specific pages with specific people, and revoke access anytime. It's actually more 
                secure than papers in a filing cabinet that anyone could access.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5" className="border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                What if I don't use Notion?
              </AccordionTrigger>
              <AccordionContent>
                No problem! Notion is free and works like any document. We chose it because it's the 
                easiest way to organize everything in one place and share securely with family. We 
                include video tutorials to get you started — most people are comfortable in 10 minutes.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6" className="border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                Is this worth the money?
              </AccordionTrigger>
              <AccordionContent>
                Consider this: The average family spends $15,000+ dealing with poor planning after a 
                crisis. Lawyers charge $2,000+ for basic estate planning. Family Lyfe Fix costs less 
                than a nice dinner out and protects your family forever. Plus, with our 30-day guarantee, 
                you risk nothing.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-7" className="border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                Which product should I start with?
              </AccordionTrigger>
              <AccordionContent>
                Start with our free Quiz to see where your family stands. Based on your results, you'll 
                get a personalized recommendation. Generally: If you're not ready for conversations yet, 
                start with the PDF. If you need help having the talk, get the Playbook. If you're ready 
                to organize everything, go straight to the Toolkit. The Bundle gives you everything at 
                the best value.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-8" className="border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                Can I upgrade from the Playbook to the Toolkit?
              </AccordionTrigger>
              <AccordionContent>
                Absolutely! Many families start with the Playbook to have the conversation, then upgrade 
                to the Toolkit to organize everything. We offer upgrade pricing for existing customers - 
                just email us at support@familylyfefix.com with your original order number.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-9" className="border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                Is the Quiz really free?
              </AccordionTrigger>
              <AccordionContent>
                Yes, 100% free with no credit card required. You'll get your personalized readiness score 
                and recommendations instantly. We believe every family should know where they stand, 
                regardless of budget. The Quiz takes just 5 minutes and gives you clarity on your next steps.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-10" className="border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                What's the difference between the PDF and Playbook?
              </AccordionTrigger>
              <AccordionContent>
                The PDF ($7) is a simple conversation starter - perfect for breaking the ice with family. 
                The Playbook ($27) is a complete framework with scripts, templates, and strategies for 
                navigating difficult conversations. Think of the PDF as the appetizer and the Playbook as 
                the full meal. Both complement the Toolkit perfectly.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Section 10: Final CTA */}
      <section id="final-cta" className="container mx-auto px-4 py-16 bg-primary/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
            Ready to Give Your Family Peace of Mind?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join 500+ families who've already protected their loved ones
          </p>
          
          <div className="space-y-4">
            {/* Main Toolkit CTA */}
            <Card className="mb-8">
              <CardContent className="pt-8 pb-8">
                <div className="mb-6">
                  <p className="text-3xl font-bold">
                    <span className="line-through text-muted-foreground mr-2">$67</span>
                    <span className="text-primary">$47</span>
                  </p>
                  <Badge variant="destructive" className="mt-2">
                    Save $20 - Today Only!
                  </Badge>
                </div>
                
                <Button size="lg" className="w-full mb-4" asChild>
                  <a href="https://familylyfefix.store/toolkit">
                    Get Your Family's Emergency Plan Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4" />
                    <span>30-Day Guarantee</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Lock className="h-4 w-4" />
                    <span>Secure Checkout</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Instant Access</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Alternative CTAs */}
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <Card className="p-4">
                <p className="text-sm font-semibold mb-2">Not ready to buy?</p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href="https://familylyfefix.typeform.com/ready-4the-talk" target="_blank" rel="noopener noreferrer">
                    Take Free Quiz
                  </a>
                </Button>
              </Card>
              
              <Card className="p-4">
                <p className="text-sm font-semibold mb-2">Need conversation help?</p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href="https://familylyfefix.store/playbook">
                    Get the Playbook
                  </a>
                </Button>
              </Card>
              
              <Card className="p-4">
                <p className="text-sm font-semibold mb-2">Want it all?</p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href="https://familylyfefix.store/bundle">
                    See Bundle Deal
                  </a>
                </Button>
              </Card>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Questions? Email us at support@familylyfefix.com
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t">
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2025 Family Lyfe Fix. All rights reserved.</p>
          <p className="mt-2">
            Plan for Tomorrow, Live Today™
          </p>
        </div>
      </footer>

      {/* Sticky CTA - Hidden since we have our own */}
      <div className="hidden">
        <StickyCTA />
      </div>
    </div>
  );
};

export default FamilyLyfeFix;