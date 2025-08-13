
import React, { useEffect } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "Who is Family Lyfe Fix?",
    a: "Family Lyfe Fix is the trusted guide and resource for families who want to be prepared for life’s unpredictable moments. We’re here to help you organize, protect, and share critical information so your loved ones have clarity, confidence, and peace of mind—no matter what happens.",
  },
  {
    q: "Who is it for?",
    a: "Busy families, caregivers, and anyone who wants clarity around healthcare wishes, finances, accounts, and responsibilities.",
  },
  {
    q: "How long does setup take?",
    a: "Most families get the essentials in place within a weekend. You can then iterate and improve over time.",
  },
  {
    q: "What tools do I need?",
    a: "The toolkit is built for Notion, plus optional cloud storage for backups.",
  },
  {
    q: "Is my information secure?",
    a: "Yes—you're in control. We guide you to set up permissions, backups, and read-only access for the right people.",
  },
];

const FAQSection: React.FC = () => {
  // Inject FAQ JSON-LD
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "faq-jsonld";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
    const existing = document.getElementById("faq-jsonld");
    if (existing) existing.remove();
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById("faq-jsonld");
      if (el) el.remove();
    };
  }, []);

  return (
    <section className="container mx-auto px-4 py-16" aria-label="Frequently Asked Questions">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-3">Frequently Asked Questions</h2>
        <p className="text-muted-foreground">Quick answers to common questions about getting your family set up for certainty.</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
