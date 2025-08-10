import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const SocialProof: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-6">Families who’ve used this system</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm mb-3">“We had a health scare in our family and realized no one knew where anything was. This made the hardest week of our lives shockingly manageable.”</p>
                <p className="text-sm text-muted-foreground">— Taylor R.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm mb-3">“It’s like we finally got our family operations out of our heads and into one calm place. Worth it for the peace of mind alone.”</p>
                <p className="text-sm text-muted-foreground">— Morgan L., parent of 3</p>
              </CardContent>
            </Card>
          </div>
      </div>
    </section>
  );
};

export default SocialProof;
