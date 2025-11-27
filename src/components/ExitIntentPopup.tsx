import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';

const ExitIntentPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Check if popup has already been shown this session
    const hasShownPopup = sessionStorage.getItem('exitIntentShown');
    if (hasShownPopup) return;

    // Desktop: Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse moves to top 10px of viewport (leaving browser)
      if (e.clientY < 10 && !hasShownPopup) {
        setShowPopup(true);
        sessionStorage.setItem('exitIntentShown', 'true');
      }
    };

    // Mobile: Time-based fallback (show after 15 seconds)
    let mobileTimer: NodeJS.Timeout | null = null;
    
    if (isMobile) {
      mobileTimer = setTimeout(() => {
        setShowPopup(true);
        sessionStorage.setItem('exitIntentShown', 'true');
      }, 15000);
    } else {
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (mobileTimer) clearTimeout(mobileTimer);
      if (!isMobile) {
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isMobile]);

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <Dialog open={showPopup} onOpenChange={setShowPopup}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Wait! Before You Go...</DialogTitle>
          <DialogDescription className="text-base pt-2">
            Not sure if this is right for you?
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <p className="text-muted-foreground">
            Take our <strong>free 2-minute quiz</strong> to see where your family's gaps are. 
            You'll get personalized insights instantly — no purchase required.
          </p>

          <div className="flex flex-col gap-3">
            <Button size="lg" asChild className="w-full" onClick={handleClose}>
              <Link to="/quiz">
                Take the Free Quiz →
              </Link>
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              Or{' '}
              <a 
                href="https://www.familylyfefix.io/product-overview"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClose}
                className="text-primary hover:underline font-semibold"
              >
                see what's included
              </a>
              {' '}in the End-Of-Lyfe Planner
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;
