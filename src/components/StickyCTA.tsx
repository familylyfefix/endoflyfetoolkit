
import React from "react";
import { Button } from "@/components/ui/button";

const StickyCTA: React.FC = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40">
      <div className="container mx-auto px-4 pb-4">
        <div className="rounded-xl border border-border bg-card/90 backdrop-blur shadow-lg p-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">Plan for Tomorrow, Live Today</p>
            <p className="font-medium">Get the End-Of-Lyfe Playbook or Toolkit—set your family up for certainty.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" asChild>
              <a href="#playbook">Get the Playbook</a>
            </Button>
            <Button size="sm" asChild>
              <a href="/checkout">Get the Toolkit</a>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <a href="https://familylyfefix.typeform.com/ready-4the-talk" target="_blank" rel="noopener noreferrer">Take the Quiz</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyCTA;
