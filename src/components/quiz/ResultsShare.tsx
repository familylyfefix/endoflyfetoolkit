import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Share2, Facebook, Twitter, Linkedin, Link2 } from 'lucide-react';
import { toast } from 'sonner';

interface ResultsShareProps {
  score: number;
  tier: number;
}

const getTierName = (tier: number): string => {
  if (tier === 1) return 'Caring Procrastinator';
  if (tier === 2) return 'Thoughtful Planner';
  return 'Conversation-Ready Champion';
};

export const ResultsShare: React.FC<ResultsShareProps> = ({ score, tier }) => {
  const tierName = getTierName(tier);
  const shareUrl = 'https://familylyfefix.com/quiz';
  const shareText = `I just discovered I'm a ${tierName} on the End-of-Lyfe Readiness Quiz! Find out your readiness level:`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success('Link copied to clipboard!');
  };

  const handleShare = (platform: string) => {
    let url = '';
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);

    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
    }

    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  return (
    <Card className="p-8">
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-2">
          <Share2 className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-bold text-foreground">
            Share Your Results
          </h3>
        </div>
        
        <p className="text-muted-foreground">
          Help others discover their readiness level too!
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => handleShare('facebook')}
            className="gap-2"
          >
            <Facebook className="h-5 w-5" />
            Facebook
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => handleShare('twitter')}
            className="gap-2"
          >
            <Twitter className="h-5 w-5" />
            Twitter
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => handleShare('linkedin')}
            className="gap-2"
          >
            <Linkedin className="h-5 w-5" />
            LinkedIn
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            onClick={handleCopyLink}
            className="gap-2"
          >
            <Link2 className="h-5 w-5" />
            Copy Link
          </Button>
        </div>
      </div>
    </Card>
  );
};
