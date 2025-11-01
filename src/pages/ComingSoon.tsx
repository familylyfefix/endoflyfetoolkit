import { useEffect, useState } from 'react';
import { WaitlistForm } from '@/components/WaitlistForm';
import ExitIntentPopup from '@/components/ExitIntentPopup';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  FolderOpen, 
  Infinity, 
  Users, 
  Smartphone, 
  Target, 
  BadgeCheck 
} from 'lucide-react';

const ComingSoon = () => {
  const launchDate = new Date('2025-11-28T00:00:00').getTime();
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = launchDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  const features = [
    {
      icon: Shield,
      text: 'Bank-Level Security for your private information',
    },
    {
      icon: FolderOpen,
      text: '7 Comprehensive Planning Sections covering every major part of life',
    },
    {
      icon: Infinity,
      text: 'Lifetime Access — pay once, update anytime',
    },
    {
      icon: Users,
      text: 'Family Sharing Features so loved ones can securely access your plan',
    },
    {
      icon: Smartphone,
      text: 'Works on Any Device — desktop, tablet, or phone',
    },
    {
      icon: Target,
      text: 'Guided Experience that makes planning simple, even for beginners',
    },
    {
      icon: BadgeCheck,
      text: '14-Day Money-Back Guarantee — no risk, no pressure',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      <ExitIntentPopup />
      {/* Hero Section with Countdown */}
      <section className="py-20 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full text-center space-y-8 animate-fade-in">
          {/* Coming Soon Badge */}
          <div className="inline-block">
            <span className="text-sm md:text-base px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
              🕒 COMING SOON — November 28, 2025
            </span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
              The End-Of-Lyfe Playbook
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-foreground mt-4">
              🥳 November 28 Is the Day to Get Ready for Peace of Mind
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="grid grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto pt-8">
            {[
              { value: timeLeft.days, label: 'Days' },
              { value: timeLeft.hours, label: 'Hours' },
              { value: timeLeft.minutes, label: 'Minutes' },
              { value: timeLeft.seconds, label: 'Seconds' },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl md:text-6xl font-bold text-primary">
                  {item.value}
                </div>
                <div className="text-sm md:text-base text-muted-foreground mt-2">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Quiz and Waitlist CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button size="lg" asChild>
              <a href="https://www.familylyfefix.io/quiz" target="_blank" rel="noopener noreferrer">
                📋 Take the Free Quiz
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#waitlist">
                ✉️ Join the Waitlist
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* The Story Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            💬 Why I Built This
          </h2>
          
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              I grew up watching my mother live with extraordinary organization.
              She has everything documented — where things are, what matters, who to contact.
              And that single habit gave our entire family peace of mind.
            </p>
            
            <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg my-8">
              <p className="text-2xl font-semibold text-foreground">
                68% of families have no system for their important information.
              </p>
            </div>
            
            <p>
              But I also learned that most families don't have that.
              When something unexpected happens, they're left searching, stressing, and struggling during the worst possible time.
            </p>
            
            <p>
              That's why I created End-Of-Lyfe Playbook — so every family can experience what mine did: clarity, confidence, and calm when it matters most.
            </p>
            
            <p className="text-xl font-semibold text-foreground pt-4">
              That gap between chaos and peace?<br />
              That's what I set out to fix.
            </p>
          </div>
        </div>
      </section>

      {/* Why Now Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            🌿 Why Now
          </h2>
          
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              Life is unpredictable. We all know we should get organized — but most of us never do.
            </p>
            <p className="text-xl font-semibold text-foreground">
              The truth is, the best time to prepare was yesterday.<br />
              The second-best time is today.
            </p>
            <p>
              Your family deserves the same peace of mind I've seen firsthand.<br />
              Now, you can give them that gift.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            🔎 What's Inside the End-Of-Lyfe Playbook
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 bg-card/50 backdrop-blur-sm border border-border rounded-lg hover:shadow-lg transition-shadow"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-base leading-relaxed">
                      ✅ {feature.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            💸 Launch-Day Special
          </h2>
          
          <div className="bg-card/50 backdrop-blur-sm border-2 border-primary rounded-2xl p-8 md:p-12 shadow-xl">
            <p className="text-lg text-muted-foreground mb-4">
              Go Live: <span className="font-semibold text-foreground">November 28, 2025</span>
            </p>
            
            <div className="my-8">
              <div className="inline-block relative">
                <div className="text-6xl md:text-8xl font-bold text-primary">
                  $147
                </div>
                <div className="text-lg text-muted-foreground mt-2">
                  One-time payment
                </div>
              </div>
            </div>
            
            <p className="text-lg text-muted-foreground mb-6">
              🕐 BNPL (Pay Later) Options Available
            </p>
            
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full border border-primary/20">
              <BadgeCheck className="w-5 h-5 text-primary" />
              <span className="font-semibold text-primary">14-Day Money-Back Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Email Signup Section */}
      <section id="waitlist" className="py-20 px-4 bg-card/30">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            ✉️ Be First to Access It
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8">
            Not sure where to start?{' '}
            <a 
              href="https://www.familylyfefix.io/quiz" 
              className="text-primary hover:underline font-semibold" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Take our free quiz
            </a>
            {' '}to discover your family's gaps, or join the waitlist for early access when we launch.
          </p>
          
          <WaitlistForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h3 className="text-2xl font-bold mb-2">
            🔐 Privacy-First Platform
          </h3>
          <p className="text-muted-foreground">
            No Tracking • No Analytics • Your Data Stays Private
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ComingSoon;
