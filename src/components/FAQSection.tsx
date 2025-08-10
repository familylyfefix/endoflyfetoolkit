
import React, { useEffect } from "react";

const faqs = [
  {
    q: "What is Family Lyfe Fix?",
    a: "A practical system and toolkit to organize, protect, and share your family's critical information so everyone knows what to do when life gets unpredictable.",
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
  {
    q: "What if I'm not satisfied?",
    a: "We offer a 30-day money-back guarantee. If it doesn't help your family, we'll make it right.",
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
        <dl className="space-y-6">
          {faqs.map((f, i) => (
            <div key={i} className="rounded-lg border border-border bg-card p-4">
              <dt className="font-medium text-foreground">{f.q}</dt>
              <dd className="mt-2 text-muted-foreground">{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default FAQSection;
