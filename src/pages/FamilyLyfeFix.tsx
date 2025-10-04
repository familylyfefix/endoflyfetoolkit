import avatar1 from '@/assets/avatar1.jpg';
import avatar2 from '@/assets/avatar2.jpg';
import avatar3 from '@/assets/avatar3.jpg';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Shield, 
  CheckCircle, 
  Star, 
  Clock,
  ArrowRight,
  FileQuestion,
  Target,
  Eye,
  Heart
} from "lucide-react";
import ContactDialog from "@/components/ContactDialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FamilyLyfeFix = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
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

      {/* Hero Section - Quiz Focused */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow Copy */}
          <p className="text-sm font-semibold text-primary mb-3">
            FREE 2-MINUTE ASSESSMENT
          </p>
          
          {/* Headline */}
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            What If Your Family Had to Make Medical Decisions for You Tomorrow?
          </h1>
          
          {/* Sub-headline */}
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            This short quiz will help you reflect on how ready you are to have the end-of-life talk with someone you love.
          </p>
          
          {/* Primary CTA */}
          <Button size="lg" className="mb-8" asChild>
            <a href="https://familylyfefix.typeform.com/ready-4the-talk" target="_blank" rel="noopener noreferrer">
              Take the Free Quiz Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          
          {/* Trust indicators */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Takes only 2 minutes</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>100% free, no credit card</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4" />
              <span>Get instant results</span>
            </div>
          </div>
          
          {/* Social Proof */}
          <div className="flex items-center justify-center gap-3">
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
      </section>

      {/* Hero Image */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          <img 
            src="/lovable-uploads/baef2c11-0b05-429f-bc8e-0b2d2c97fa57.png" 
            alt="Family enjoying peace of mind" 
            className="rounded-lg shadow-2xl w-full"
          />
        </div>
      </section>

      {/* Empathy Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
            We Get It. This Isn't Easy to Think About.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            No one wants to imagine worst-case scenarios. But the truth is, having a plan in place isn't about fear—it's about love. It's about making sure your family is protected, your wishes are honored, and the people you care about most aren't left scrambling when emotions are already running high.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Left Column - Our Story */}
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-primary mb-3 text-center">OUR STORY</p>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
                From Foresight to Family Solution
              </h2>
            </div>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Catherine saw the problem firsthand. As a mother, business owner, and someone who'd watched families struggle after unexpected loss, she knew there had to be a better way.
              </p>
              
              <p>
                When her own family faced a sudden health crisis, she realized that despite being organized and proactive in every other area of life, they were totally unprepared for the legal, financial, and emotional decisions that came rushing at them. There were no clear answers, no simple plan, and way too much uncertainty when they needed clarity the most.
              </p>
              
              <p>
                That's when the idea for FamilyLyfe Fix was born. Catherine knew that busy, loving families shouldn't have to dig through dozens of confusing resources or spend hours researching estate planning just to feel secure. They needed something simple, actionable, and built specifically for them.
              </p>
              
              <p>
                So she created it—a complete end-of-life planning system that's designed to:
              </p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>Guide you step-by-step (no legal jargon, no overwhelm)</li>
                <li>Give you peace of mind that your family is truly protected</li>
                <li>Make the process fast, affordable, and stress-free</li>
              </ul>
              
              <p className="font-semibold text-foreground pt-4">
                Because planning ahead isn't just smart—it's one of the most loving things you can do for the people who matter most.
              </p>
            </div>
          </div>
          
          {/* Right Column - Mission, Vision, Core Values Cards */}
          <div className="space-y-6">
            {/* Our Mission Card */}
            <Card className="bg-gradient-to-br from-blue-600 to-purple-600 border-0 text-white">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-playfair text-2xl font-bold mb-3">Our Mission</h3>
                  <p className="text-white/90">
                    Help 500+ families get protected and organized so they can stop worrying about "what if" and start living with confidence, knowing their loved ones are covered.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {/* Our Vision Card */}
            <Card className="bg-gradient-to-br from-blue-500 to-purple-500 border-0 text-white">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-playfair text-2xl font-bold mb-3">Our Vision</h3>
                  <p className="text-white/90">
                    A world where every family has the tools, guidance, and support they need to plan ahead without fear, confusion, or overwhelm.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {/* Core Values Card */}
            <Card className="bg-gradient-to-br from-pink-500 to-purple-600 border-0 text-white">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-playfair text-2xl font-bold mb-3">Core Values</h3>
                  <ul className="space-y-2 text-white/90">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span><strong>Clarity Over Chaos</strong> — We simplify the complex</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span><strong>Compassion First</strong> — This is emotional, and we honor that</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span><strong>Empowerment, Not Fear</strong> — Planning ahead should feel good</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span><strong>Accessibility for All</strong> — Everyone deserves protection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span><strong>Legacy Through Action</strong> — Your plan is your love in writing</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Take the Quiz */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-12">
            Why Take the Ready for the Talk Quiz?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Know Where You Stand</h3>
                    <p className="text-sm text-muted-foreground">
                      Get a personalized readiness score that shows you exactly what areas need attention for your family's planning
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <FileQuestion className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Free Conversation Guide</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive a free PDF guide immediately after completing the quiz to help you start important conversations
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Clock className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Quick & Easy</h3>
                    <p className="text-sm text-muted-foreground">
                      Takes only 2 minutes to complete—no complex forms, just straightforward questions about your family's readiness
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Completely Free</h3>
                    <p className="text-sm text-muted-foreground">
                      No credit card required, no hidden costs. Just valuable insights to help protect your family's future
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quiz CTA Card */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="border-primary shadow-xl">
            <CardContent className="pt-8 pb-8 text-center">
              <FileQuestion className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="font-playfair text-3xl font-bold mb-3">
                Ready to Discover Your Score?
              </h2>
              <p className="text-muted-foreground mb-6">
                Take the FREE Ready for the Talk Quiz
              </p>
              
              <div className="flex flex-col items-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>2-minute assessment</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Instant personalized results</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Free conversation guide included</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>No credit card needed</span>
                </div>
              </div>
              
              <Button size="lg" className="w-full md:w-auto" asChild>
                <a href="https://familylyfefix.typeform.com/ready-4the-talk" target="_blank" rel="noopener noreferrer">
                  Start Your Free Quiz
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mini FAQ */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-12">
            Common Questions
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                Is the quiz really free?
              </AccordionTrigger>
              <AccordionContent>
                Yes, 100% free with no credit card required. After completing the quiz, you'll receive 
                a free conversation starter guide to help you get started. We believe every family should 
                know where they stand, regardless of budget.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                How long does the quiz take?
              </AccordionTrigger>
              <AccordionContent>
                The quiz takes approximately 2 minutes to complete. It's designed to be quick and 
                straightforward while still giving you valuable insights about your family's readiness.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                What happens after I complete the quiz?
              </AccordionTrigger>
              <AccordionContent>
                You'll immediately receive your personalized readiness score along with a free 
                conversation starter guide (PDF) via email. This guide will help you begin important 
                conversations with your family based on your specific situation.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                Do I need to provide any personal information?
              </AccordionTrigger>
              <AccordionContent>
                We only ask for your name and email address so we can send you your results and free guide. 
                Your privacy is important to us, and we'll never share your information with third parties.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5" className="border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                Will I be pressured to buy something?
              </AccordionTrigger>
              <AccordionContent>
                No pressure at all. The quiz and guide are completely free resources designed to help 
                families get started with planning. If you want additional support, we offer optional 
                products, but there's no obligation whatsoever.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
            Start Your Family's Planning Journey Today
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Take the first step toward giving your family peace of mind with our free readiness quiz
          </p>
          
          <Button size="lg" asChild>
            <a href="https://familylyfefix.typeform.com/ready-4the-talk" target="_blank" rel="noopener noreferrer">
              Take the Free Quiz Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mt-8">
            <div className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              <span>100% Free</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>2 Minutes</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4" />
              <span>Instant Results</span>
            </div>
          </div>
          
          <p className="text-center text-sm text-muted-foreground mt-6">
            Questions? Email us at hello@familylyfefix.com
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
    </div>
  );
};

export default FamilyLyfeFix;
