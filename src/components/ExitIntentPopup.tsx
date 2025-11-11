import React, { useEffect, useState } from 'react';
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

    // Mobile: Time-based fallback (show after 10 seconds)
    let mobileTimer: NodeJS.Timeout | null = null;
    
    if (isMobile) {
      mobileTimer = setTimeout(() => {
        setShowPopup(true);
        sessionStorage.setItem('exitIntentShown', 'true');
      }, 10000); // 10 seconds
    } else {
      // Desktop: Add mouse leave listener
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

  const handleWaitlistClick = () => {
    setShowPopup(false);
    // Scroll to waitlist form
    const waitlistSection = document.querySelector('section:has(form)');
    waitlistSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Dialog open={showPopup} onOpenChange={setShowPopup}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Wait! Before You Go... 👋</DialogTitle>
          <DialogDescription className="text-base pt-2">
            Want to see where your family's gaps are?
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <p className="text-muted-foreground">
            I've got a <strong>free quiz</strong> that shows you exactly what you're missing. 
            Takes 2 minutes, and you'll get personalized insights instantly.
          </p>

          <div className="flex flex-col gap-3">
            <Button size="lg" asChild className="w-full">
              <a 
                href="/quiz"
                onClick={handleClose}
              >
                📋 Take the Free Quiz →
              </a>
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              Or{' '}
              <button 
                onClick={handleWaitlistClick}
                className="text-primary hover:underline font-semibold"
              >
                join the waitlist
              </button>
              {' '}for the complete End-Of-Lyfe Planner launching November 28th
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;
