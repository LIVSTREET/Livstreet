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

        <Accordion type="multiple" className="w-full space-y-3">
          {FAQ_SECTIONS.map((section, idx) => (
            <AccordionItem
              key={section.sectionTitle}
              value={`section-${idx}`}
              className="border rounded-lg bg-background px-4"
            >
              <AccordionTrigger className="text-left font-serif text-lg md:text-xl text-foreground hover:no-underline">
                {section.sectionTitle}
              </AccordionTrigger>
              <AccordionContent>
                <Accordion type="multiple" className="w-full">
                  {section.items.map((item) => (
                    <AccordionItem key={item.id} value={item.id}>
                      <AccordionTrigger className="text-left text-base">
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
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
