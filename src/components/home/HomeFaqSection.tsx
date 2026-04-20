import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_SECTIONS } from "@/data/homeFaqContent";
import { useInView } from "@/hooks/useInView";
import { SectionDivider } from "./SectionDivider";

export function HomeFaqSection() {
  const { ref: headRef, inView: headInView } = useInView<HTMLElement>();
  const { ref: listRef, inView: listInView } = useInView<HTMLDivElement>();
  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <div className="container max-w-3xl px-4">
        <header
          ref={headRef}
          className={`mb-10 text-center opacity-0 ${headInView ? "animate-reveal-up" : ""}`}
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-3">
            Ofte stilte spørsmål
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            Svar på vanlige spørsmål om gravplate, gravminne, miljø, pris og
            bestilling hos Livstreet.
          </p>
          <SectionDivider className="mt-5" />
        </header>

        <div
          ref={listRef}
          className={`opacity-0 ${listInView ? "animate-reveal-up" : ""}`}
        >
          <Accordion type="multiple" className="w-full space-y-3">
            {FAQ_SECTIONS.map((section, idx) => (
              <AccordionItem
                key={section.sectionTitle}
                value={`section-${idx}`}
                className="border border-border/60 rounded-2xl bg-background px-5 hover:border-accent/40 transition-colors"
              >
                <AccordionTrigger className="text-left font-display text-xl md:text-2xl text-foreground hover:no-underline py-5">
                  {section.sectionTitle}
                </AccordionTrigger>
                <AccordionContent>
                  <Accordion type="multiple" className="w-full">
                    {section.items.map((item) => (
                      <AccordionItem key={item.id} value={item.id}>
                        <AccordionTrigger className="text-left text-lg md:text-xl">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
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
      </div>
    </section>
  );
}
