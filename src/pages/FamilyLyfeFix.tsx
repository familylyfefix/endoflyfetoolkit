import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Heart, Shield, Target, CheckCircle, Star, Download, Book, Wrench } from "lucide-react";
import ContactDialog from "@/components/ContactDialog";
import StickyCTA from "@/components/StickyCTA";
import CountdownBanner from "@/components/CountdownBanner";
import FAQSection from "@/components/FAQSection";
import SocialProof from "@/components/SocialProof";

const FamilyLyfeFix = () => {
  const [tab, setTab] = useState<string>(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
    return hash === "playbook" || hash === "toolkit" || hash === "free" || hash === "quiz" ? hash : "quiz";
  });
  useEffect(() => {
    const onHashChange = () => {
      const h = window.location.hash.replace("#", "");
      if (h) setTab(h);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <CountdownBanner deferred start={tab === "playbook" || tab === "toolkit"} />
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src="/lovable-uploads/9cb42045-e209-4551-b4e3-f954ef3737cc.png" alt="Family Lyfe Fix - Plan for Tomorrow Live Today" className="h-16 w-auto" loading="lazy" />
          </div>
          <ContactDialog>
            <Button variant="outline">Contact</Button>
          </ContactDialog>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">
            Plan for Tomorrow, Live Today
          </Badge>
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent animate-fade-in">
            Don't Leave Your Family Guessing. Leave Them Guided.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            When life takes unexpected turns, your family needs a plan — not panic. Family Lyfe Fix ensures everyone knows exactly what to do.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" asChild>
              <a href="#playbook">Get the Playbook</a>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <a href="/checkout">Get the Toolkit</a>
            </Button>
          </div>
        </div>

        {/* Family Lyfe Fix Logo */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <img src="/lovable-uploads/baef2c11-0b05-429f-bc8e-0b2d2c97fa57.png" alt="Family Lyfe Fix - Plan for Tomorrow Live Today" className="w-full h-[400px] object-cover" loading="lazy" />
            </CardContent>
          </Card>
        </div>

        {/* About Section */}
        <div className="max-w-4xl mx-auto mb-8 text-center">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Every family crisis starts the same way: no one knows what to do. The arguments begin. The guessing starts. The stress multiplies. Family Lyfe Fix was born from this simple truth — one honest conversation today saves your family from chaos tomorrow.
          </p>
        </div>
        {/* Guarantee Strip */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="rounded-xl border bg-card text-card-foreground shadow-sm px-4 py-3 flex flex-col md:flex-row items-center justify-center gap-3 text-sm">
            <span>Secure checkout</span>
            <span className="hidden md:inline text-muted-foreground">•</span>
            <span>Lifetime access</span>
          </div>
        </div>
        {/* Social Proof */}
        <SocialProof />

        {/* Tabs Section */}
        <div className="max-w-6xl mx-auto">
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 h-14 bg-secondary/50 border-2 border-border/50 rounded-xl p-2 shadow-lg">
              <TabsTrigger value="quiz" className="flex items-center gap-2 h-10 px-6 rounded-lg font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:border-primary/20">
                <Target className="h-5 w-5" />
                Quiz
              </TabsTrigger>
              <TabsTrigger value="free" className="flex items-center gap-2 h-10 px-6 rounded-lg font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:border-primary/20">
                <Download className="h-5 w-5" />
                FREE
              </TabsTrigger>
              <TabsTrigger value="playbook" className="flex items-center gap-2 h-10 px-6 rounded-lg font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:border-primary/20">
                <Book className="h-5 w-5" />
                Playbook
              </TabsTrigger>
              <TabsTrigger value="toolkit" className="flex items-center gap-2 h-10 px-6 rounded-lg font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:border-primary/20">
                <Wrench className="h-5 w-5" />
                Toolkit
              </TabsTrigger>
            </TabsList>

            {/* Quiz Tab */}
            <TabsContent value="quiz" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 break-words">What If Your Family Had to Make Medical Decisions for You Tomorrow?</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  This short quiz will help you reflect on how ready you are to have the end-of-life talk with someone you love.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Emergency Preparedness
                    </CardTitle>
                    <CardDescription>
                      How ready is your family for unexpected situations?
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm">• Do you have an emergency contact list?</p>
                      <p className="text-sm">• Are important documents easily accessible?</p>
                      <p className="text-sm">• Does everyone know the emergency plan?</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Family Organization
                    </CardTitle>
                    <CardDescription>
                      How organized are your family's important information?
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm">• Are passwords and accounts organized?</p>
                      <p className="text-sm">• Can family members find what they need?</p>
                      <p className="text-sm">• Is financial information accessible?</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <Button size="lg" className="px-8" asChild>
                  <a href="https://familylyfefix.typeform.com/ready-4the-talk" target="_blank" rel="noopener noreferrer">
                    Let's Begin!
                  </a>
                </Button>
              </div>
            </TabsContent>

            {/* FREE Tab */}
            <TabsContent value="free" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Free Family Resources</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Start organizing your family today with these free tools and guides
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      End-Of-Lyfe Conversation Starter Guide
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      A guide to help families have important conversations about end-of-life wishes and planning
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <a href="https://familylyfefix.store/guide" target="_blank" rel="noopener noreferrer">
                        Download Free
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-primary" />
                      Family Newsletter
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Weekly tips and strategies for end of life planning
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <a href="https://familylifefix.substack.com/" target="_blank" rel="noopener noreferrer">
                        Subscribe Free
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>

            </TabsContent>

            {/* Playbook Tab */}
            <TabsContent value="playbook" id="playbook" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">End-Of-Lyfe Conversation Playbook</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Finally—know how to start "the talk" and actually follow through. This Notion-based playbook gives you the tools to confidently guide your family through conversations most people avoid — from healthcare wishes to digital accounts and final arrangements. No confusion. No guesswork. No chaos when it matters most.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Step 1: Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Evaluate your current family organization and identify gaps
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Step 2: Organization
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Implement systems for documents, contacts, and important information
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Step 3: Protection
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Secure your family's information and create backup plans
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="max-w-4xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-center">What's Included</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-primary" />
                        <span className="text-sm">Complete organization templates</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-primary" />
                        <span className="text-sm">Emergency planning guides</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-primary" />
                        <span className="text-sm">Document management system</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-primary" />
                        <span className="text-sm">Contact organization tools</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-primary" />
                        <span className="text-sm">Financial planning worksheets</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-primary" />
                        <span className="text-sm">Lifetime updates and support</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <Button size="lg" className="px-8" asChild>
                  <a href="https://familylyfefix.store/playbook" target="_blank" rel="noopener noreferrer">
                    Get the Complete Playbook
                  </a>
                </Button>
              </div>
            </TabsContent>

            {/* Toolkit Tab */}
            <TabsContent value="toolkit" id="toolkit" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">End-Of-Lyfe Toolkit</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  The Notion-based system that stores, protects, and keeps your family’s most important information ready for anything.  Built for modern families who want one place to manage chaos, this toolkit gives you the templates, training, and tools to keep everything organized — even when life gets unpredictable.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Step 1: Setup
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Install the toolkit and connect your family to a shared Notion workspace
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Step 2: Organize
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Populate templates for contacts, documents, accounts, and responsibilities
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Step 3: Protect
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Lock down sensitive info and create emergency-ready backups
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="max-w-4xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-center">What's Included</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-primary" />
                        <span className="text-sm">Centralized family dashboard (Notion)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-primary" />
                        <span className="text-sm">Emergency plan + grab-and-go binder</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-primary" />
                        <span className="text-sm">Roles, contacts, and responsibilities hub</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-primary" />
                        <span className="text-sm">Medical, insurance, and care details</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-primary" />
                        <span className="text-sm">Legal documents checklist & tracker</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-primary" />
                        <span className="text-sm">Accounts, bills, and subscriptions organizer</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-primary" />
                        <span className="text-sm">Passwords and digital assets inventory</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-primary" />
                        <span className="text-sm">Maintenance checklist with update reminders</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <Button size="lg" className="px-8" asChild>
                  <a href="https://familylyfefix.com/toolkit" target="_blank" rel="noopener noreferrer">
                    Access the Toolkit
                  </a>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <FAQSection />
      <StickyCTA />

      {/* Footer */}
      <footer className="border-t border-border bg-background/50">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Family Lyfe Fix, LLC. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default FamilyLyfeFix;
