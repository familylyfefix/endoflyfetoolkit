import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ResultsShare } from './ResultsShare';
import { ArrowLeft, RefreshCw } from 'lucide-react';

interface QuizResultsProps {
  score: number;
  tier: number;
  onRetake: () => void;
}

const getTierContent = (tier: number, score: number) => {
  if (tier === 1) {
    return {
      emoji: '🚨',
      title: "You're a Caring Procrastinator - And That's Okay!",
      subtitle: "You love your family deeply, but planning feels overwhelming. The good news? You don't need to have everything figured out today.",
      bgColor: 'bg-destructive/10',
      borderColor: 'border-destructive/30',
      textColor: 'text-destructive',
      whatThisMeans: [
        { icon: '✅', text: 'You recognize the importance of planning' },
        { icon: '⚠️', text: "You haven't started the conversation yet" },
        { icon: '⚠️', text: 'Your family may not know your wishes' }
      ],
      nextStep: "Start with ONE simple conversation this week using the FREE guide we just sent to your email.",
      ctaText: "Download Your Conversation Starter Guide",
      secondaryCtaText: "Join Waitlist for Full End-Of-Lyfe Playbook"
    };
  } else if (tier === 2) {
    return {
      emoji: '⚖️',
      title: "You're a Thoughtful Planner - You're On Your Way!",
      subtitle: "You've started thinking about your family's future, but there are still some gaps to fill. Let's close those gaps together.",
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/30',
      textColor: 'text-accent',
      whatThisMeans: [
        { icon: '✅', text: "You've made progress on planning" },
        { icon: '✅', text: "You've had some important conversations" },
        { icon: '⚠️', text: 'There are still missing pieces' }
      ],
      nextStep: "Use the FREE guide in your email to identify and fill the remaining gaps.",
      ctaText: "Download Your Gap-Filling Guide",
      secondaryCtaText: "Get Full End-Of-Lyfe Playbook (Launching Nov 28)"
    };
  } else {
    return {
      emoji: '⭐',
      title: "You're a Conversation-Ready Champion! 🎉",
      subtitle: "You're ahead of 90% of families. Your loved ones will feel confident and prepared because of the work you've done.",
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/30',
      textColor: 'text-primary',
      whatThisMeans: [
        { icon: '✅', text: "You've done the hard work of planning" },
        { icon: '✅', text: 'Your family knows your wishes' },
        { icon: '✅', text: "You're protecting your family's future" }
      ],
      nextStep: "Keep everything organized and updated with the comprehensive End-Of-Lyfe Playbook.",
      ctaText: "Download Your Advanced Planning Guide",
      secondaryCtaText: "Join Waitlist for Full Toolkit (Nov 28)"
    };
  }
};

export const QuizResults: React.FC<QuizResultsProps> = ({ score, tier, onRetake }) => {
  const content = getTierContent(tier, score);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 p-4 py-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" asChild>
            <a href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </a>
          </Button>
          
          <Button variant="outline" onClick={onRetake}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Retake Quiz
          </Button>
        </div>

        <Card className={`p-8 md:p-12 ${content.bgColor} border-2 ${content.borderColor} animate-fade-in`}>
          <div className="text-center space-y-6">
            <div className="text-7xl mb-4">{content.emoji}</div>
            
            <div className="inline-block px-6 py-3 bg-card rounded-full border border-border">
              <p className="text-2xl font-bold">
                Your Score: <span className={content.textColor}>{score}/24 Points</span>
              </p>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
              {content.title}
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {content.subtitle}
            </p>
          </div>
        </Card>

        <Card className="p-8 md:p-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            What This Means:
          </h2>
          <div className="space-y-4">
            {content.whatThisMeans.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <p className="text-lg text-muted-foreground pt-1">{item.text}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-8 md:p-12 bg-accent/5 border-accent/20">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Your Next Step:
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            {content.nextStep}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild className="flex-1">
              <a href="mailto:?subject=Check your email for the guide">
                {content.ctaText}
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="flex-1">
              <a href="/#waitlist">
                {content.secondaryCtaText}
              </a>
            </Button>
          </div>
        </Card>

        <ResultsShare score={score} tier={tier} />
      </div>
    </div>
  );
};
