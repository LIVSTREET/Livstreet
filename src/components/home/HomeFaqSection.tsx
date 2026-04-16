import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_SECTIONS } from "@/data/homeFaqContent";

export function HomeFaqSection() {
  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <div className="container max-w-3xl px-4">
        <header className="mb-10 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-3">
            Ofte stilte spørsmål
          </h2>
          <p className="text-muted-foreground">
            Svar på vanlige spørsmål om gravplate, gravminne, miljø, pris og
            bestilling hos Livstreet.
          </p>
        </header>

        <div className="space-y-10">
          {FAQ_SECTIONS.map((section) => (
            <div key={section.sectionTitle}>
              <h3 className="font-serif text-xl md:text-2xl text-foreground mb-3">
                {section.sectionTitle}
              </h3>
              <Accordion type="multiple" className="w-full">
                {section.items.map((item) => (
                  <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger className="text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
