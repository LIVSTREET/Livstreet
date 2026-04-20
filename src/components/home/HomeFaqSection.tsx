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
    <section className="py-20 md:py-28">
      <div className="container max-w-3xl px-4">
        <header
          ref={headRef}
          className={`mb-12 md:mb-14 text-center opacity-0 ${headInView ? "animate-reveal-up" : ""}`}
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
            Ofte stilte spørsmål
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Svar på vanlige spørsmål om gravplate, gravminne, miljø, pris og
            bestilling hos Livstreet.
          </p>
          <SectionDivider className="mt-6" />
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
                className="border border-border/60 rounded-2xl bg-card/80 backdrop-blur-sm px-5 hover:border-accent/40 transition-colors"
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
