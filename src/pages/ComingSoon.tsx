import { useEffect, useState } from 'react';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center space-y-8 animate-fade-in">
        {/* Main Heading */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
            Coming Soon
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            We're preparing something amazing for you
          </p>
        </div>

        {/* Launch Date */}
        <div className="space-y-2">
          <p className="text-lg text-muted-foreground">Launching</p>
          <p className="text-3xl md:text-4xl font-semibold text-foreground">
            November 28, 2025
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="grid grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto pt-8">
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl md:text-6xl font-bold text-primary">
              {timeLeft.days}
            </div>
            <div className="text-sm md:text-base text-muted-foreground mt-2">
              Days
            </div>
          </div>
          
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl md:text-6xl font-bold text-primary">
              {timeLeft.hours}
            </div>
            <div className="text-sm md:text-base text-muted-foreground mt-2">
              Hours
            </div>
          </div>
          
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl md:text-6xl font-bold text-primary">
              {timeLeft.minutes}
            </div>
            <div className="text-sm md:text-base text-muted-foreground mt-2">
              Minutes
            </div>
          </div>
          
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl md:text-6xl font-bold text-primary">
              {timeLeft.seconds}
            </div>
            <div className="text-sm md:text-base text-muted-foreground mt-2">
              Seconds
            </div>
          </div>
        </div>

        {/* Additional Message */}
        <div className="pt-8">
          <p className="text-muted-foreground max-w-md mx-auto">
            Our website is currently under construction. Check back soon for an exciting new experience!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
