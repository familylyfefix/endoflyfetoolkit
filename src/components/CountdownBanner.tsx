import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "flf-offer-deadline";
const HIDE_KEY = "flf-offer-hide";
const OFFER_DURATION_MS = 72 * 60 * 60 * 1000; // 72 hours

function formatTime(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const parts = [
    days > 0 ? `${days}d` : null,
    `${hours.toString().padStart(2, "0")}h`,
    `${minutes.toString().padStart(2, "0")}m`,
    `${seconds.toString().padStart(2, "0")}s`,
  ].filter(Boolean);
  return parts.join(" ");
}

const CountdownBanner: React.FC = () => {
  const [hidden, setHidden] = useState<boolean>(() => sessionStorage.getItem(HIDE_KEY) === "1");
  const [now, setNow] = useState<number>(() => Date.now());

  const deadline = useMemo(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return parseInt(stored, 10);
    const d = Date.now() + OFFER_DURATION_MS;
    localStorage.setItem(STORAGE_KEY, String(d));
    return d;
  }, []);

  useEffect(() => {
    if (hidden) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [hidden]);

  if (hidden) return null;

  const timeLeft = Math.max(0, deadline - now);

  return (
    <div className="w-full bg-accent/20 border-b border-border backdrop-blur supports-[backdrop-filter]:bg-accent/10">
      <div className="container mx-auto px-4 py-2 flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-2">
          <span className="font-medium">Limited-time offer:</span>
          <span className="text-muted-foreground">Ends in {formatTime(timeLeft)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" asChild>
            <a href="#playbook">Get the Playbook</a>
          </Button>
          <Button size="sm" asChild>
            <a href="/checkout">Get the Toolkit</a>
          </Button>
          <button
            aria-label="Hide countdown"
            className="text-muted-foreground hover:underline"
            onClick={() => {
              sessionStorage.setItem(HIDE_KEY, "1");
              setHidden(true);
            }}
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountdownBanner;
