import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FloatingCTAProps {
  onCTAClick: () => void;
  isExpired: boolean;
}

const FloatingCTA: React.FC<FloatingCTAProps> = ({ onCTAClick, isExpired }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isDismissed) return;
      const scrolled = window.scrollY > 800;
      setIsVisible(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  if (!isVisible || isDismissed) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-in-right">
      <div className="relative bg-card border border-border rounded-lg shadow-xl p-6 max-w-sm">
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
        
        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">
            Don't wait for "someday"
          </p>
          <p className="text-xs text-muted-foreground">
            Get your family organized with the End-Of-Lyfe Toolkit
          </p>
          
          <div className="space-y-2">
            <div className="text-center">
              {!isExpired && (
                <span className="inline-block bg-destructive/10 text-destructive text-xs font-semibold px-2 py-1 rounded-full mb-2">
                  SAVE $20 - Limited Time
                </span>
              )}
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl font-bold">${isExpired ? "67" : "47"}</span>
                {!isExpired && (
                  <span className="text-sm text-muted-foreground line-through">$67</span>
                )}
              </div>
            </div>
            
            <Button 
              onClick={onCTAClick}
              className="w-full animate-pulse-subtle"
              size="lg"
            >
              Get The Toolkit Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingCTA;