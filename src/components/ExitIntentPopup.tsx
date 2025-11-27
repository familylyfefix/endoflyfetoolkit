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
import { Gift } from 'lucide-react';

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
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Gift className="h-6 w-6 text-primary" />
            Wait! Special Launch Pricing
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            You're seeing our lowest price ever.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-5 py-4">
          {/* Discount highlight */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Launch Special</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl text-muted-foreground line-through">$197</span>
              <span className="text-4xl font-bold text-primary">$147</span>
            </div>
            <p className="text-sm font-semibold text-primary mt-1">Save $50 today</p>
          </div>

          <p className="text-muted-foreground text-center">
            This introductory price won't last forever. Lock in your savings now.
          </p>

          <div className="flex flex-col gap-3">
            <Button size="lg" asChild className="w-full" onClick={handleClose}>
              <a 
                href="https://www.familylyfefix.io/product-overview"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get the Planner for $147 →
              </a>
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              Not ready?{' '}
              <Link 
                to="/quiz"
                onClick={handleClose}
                className="text-primary hover:underline font-semibold"
              >
                Take the free quiz first
              </Link>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;
