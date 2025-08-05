
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Heart, Shield, Target, CheckCircle, Star, Download, Book, Wrench } from "lucide-react";

const FamilyLyfeFix = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/820d0aa7-429e-407e-8453-4ba0be3cb2be.png"
              alt="Family Lyfe Fix - Plan for Tomorrow Live Today" 
              className="h-16 w-auto"
            />
          </div>
          <Button variant="outline">Contact</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">
            Family Organization System
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Transform Your Family's Future
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            The complete system to organize, protect, and empower your family for any situation
          </p>
        </div>

        {/* Family Lyfe Fix Logo */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <img 
                src="/lovable-uploads/820d0aa7-429e-407e-8453-4ba0be3cb2be.png"
                alt="Family Lyfe Fix - Plan for Tomorrow Live Today"
                className="w-full h-[400px] object-cover"
              />
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="quiz" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="quiz" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Quiz
              </TabsTrigger>
              <TabsTrigger value="free" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                FREE
              </TabsTrigger>
              <TabsTrigger value="playbook" className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                Playbook
              </TabsTrigger>
              <TabsTrigger value="toolkit" className="flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                Toolkit
              </TabsTrigger>
            </TabsList>

            {/* Quiz Tab */}
            <TabsContent value="quiz" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Family Preparedness Assessment</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Discover how prepared your family is and get personalized recommendations
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
                <Button size="lg" className="px-8">
                  Take the Assessment
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

              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="h-5 w-5 text-primary" />
                      Emergency Checklist
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Essential items and information every family should have ready
                    </p>
                    <Button variant="outline" className="w-full">
                      Download Free
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Contact Template
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Organize all important family contacts in one place
                    </p>
                    <Button variant="outline" className="w-full">
                      Download Free
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
                      Weekly tips and strategies for family organization
                    </p>
                    <Button variant="outline" className="w-full">
                      Subscribe Free
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle>Join Our Community</CardTitle>
                  <CardDescription>
                    Get exclusive access to family organization tips and resources
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="flex-1 px-3 py-2 border rounded-md"
                    />
                    <Button>Subscribe</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Playbook Tab */}
            <TabsContent value="playbook" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Complete Family Playbook</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  The comprehensive system to organize and protect your family's future
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
                <Button size="lg" className="px-8">
                  Get the Complete Playbook
                </Button>
              </div>
            </TabsContent>

            {/* Toolkit Tab */}
            <TabsContent value="toolkit" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Family Organization Toolkit</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Everything you need to implement and maintain your family organization system
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Notion Templates</CardTitle>
                    <CardDescription>
                      Pre-built templates for complete family organization
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm">• Emergency contact database</p>
                      <p className="text-sm">• Document tracker and storage</p>
                      <p className="text-sm">• Financial planning worksheets</p>
                      <p className="text-sm">• Family calendar and task management</p>
                      <p className="text-sm">• Password and account organizer</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Implementation Guides</CardTitle>
                    <CardDescription>
                      Step-by-step instructions for setting up your system
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm">• Quick start setup guide</p>
                      <p className="text-sm">• Customization instructions</p>
                      <p className="text-sm">• Maintenance and update procedures</p>
                      <p className="text-sm">• Family training materials</p>
                      <p className="text-sm">• Troubleshooting support</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="max-w-4xl mx-auto">
                <CardHeader>
                  <CardTitle>Technical Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <h4 className="font-semibold mb-2">Notion Account</h4>
                      <p className="text-sm text-muted-foreground">
                        Free or paid Notion account required
                      </p>
                    </div>
                    <div className="text-center">
                      <h4 className="font-semibold mb-2">Any Device</h4>
                      <p className="text-sm text-muted-foreground">
                        Works on phone, tablet, or computer
                      </p>
                    </div>
                    <div className="text-center">
                      <h4 className="font-semibold mb-2">Internet Access</h4>
                      <p className="text-sm text-muted-foreground">
                        Sync across all your devices
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <Button size="lg" className="px-8">
                  Access the Toolkit
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default FamilyLyfeFix;
