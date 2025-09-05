import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    location: "Austin, TX",
    rating: 5,
    text: "When my dad had a sudden heart attack, this toolkit saved us. We knew exactly who to call, where everything was, and what his wishes were. What could have been chaos became manageable.",
    verified: true,
  },
  {
    name: "Michael R.",
    location: "Denver, CO",
    rating: 5,
    text: "As a single parent, I was terrified about what would happen to my kids if something happened to me. This toolkit helped me get everything organized in one weekend. The peace of mind is priceless.",
    verified: true,
  },
  {
    name: "Jennifer K.",
    location: "Seattle, WA",
    rating: 5,
    text: "My husband travels for work constantly. Having all our important info organized means I can handle anything that comes up. It's like having a family operations manual.",
    verified: true,
  },
  {
    name: "David & Lisa T.",
    location: "Chicago, IL",
    rating: 5,
    text: "We kept putting off 'getting organized' for years. This toolkit made it so simple. In just a few hours, we had everything documented. Our adult kids are so relieved!",
    verified: true,
  },
  {
    name: "Patricia L.",
    location: "Phoenix, AZ",
    rating: 5,
    text: "After watching my sister's family struggle when she was hospitalized, I knew I needed this. The medical wishes section alone is worth it. Every family needs this toolkit.",
    verified: true,
  },
];

const TestimonialCarousel: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
            Hear from Families Who've Found Peace of Mind
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join 500+ families who've transformed their "someday" into "done" with the End-Of-Lyfe Toolkit
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="h-full">
                  <CardContent className="pt-6 flex flex-col h-full">
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    
                    <p className="text-sm mb-4 flex-grow">"{testimonial.text}"</p>
                    
                    <div className="border-t pt-3">
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                        {testimonial.verified && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                            Verified
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold">500+ families</span> have organized their life with our toolkit
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;