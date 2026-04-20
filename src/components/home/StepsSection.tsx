import { MessageCircle, FileEdit, CheckCircle, Hammer, Truck, ArrowRight, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useInView } from "@/hooks/useInView";
import { SectionDivider } from "./SectionDivider";


const steps = [
  {
    icon: MessageCircle,
    title: "1. Du tar kontakt",
    description: "Fortell oss litt om dine ønsker – helt uforpliktende.",
  },
  {
    icon: FileEdit,
    title: "2. Vi lager et forslag",
    description: "Du mottar et designutkast som kan justeres til det føles riktig.",
  },
  {
    icon: CheckCircle,
    title: "3. Du godkjenner",
    description: "Ingen hast. Vi går videre først når du er fornøyd.",
  },
  {
    icon: Hammer,
    title: "4. Vi lager gravplaten",
    description: "Håndlaget i massivt eiketre med stor omtanke.",
  },
  {
    icon: Truck,
    title: "5. Levering",
    description: "Normalt 2–4 uker. Ved høy pågang kan levering ta lengre tid, og du varsles.",
  },
];

function StepCard({
  icon: Icon,
  title,
  description,
  index,
  isLast,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  isLast: boolean;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ animationDelay: `${index * 100}ms` }}
      className={`relative group h-full opacity-0 ${inView ? "animate-reveal-up" : ""}`}
    >
      {!isLast && (
        <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-white/40 to-transparent" />
      )}
      <div className="relative h-full flex flex-col items-center bg-card/95 backdrop-blur-sm rounded-2xl p-4 md:p-8 text-center shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:border-accent/50 transition-all duration-500 border border-border/60 overflow-hidden">
        <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 mb-3 md:mb-6 rounded-full bg-accent/15 text-accent group-hover:bg-accent group-hover:text-accent-foreground group-hover:scale-110 transition-all duration-500 shrink-0">
          <Icon className="h-6 w-6 md:h-7 md:w-7" />
        </div>
        <h3 className="font-display text-base md:text-xl font-semibold mb-2 md:mb-3 text-foreground">
          {title}
        </h3>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed hidden md:block">
          {description}
        </p>
      </div>
    </div>
  );
}

export function StepsSection() {
  const { ref: headRef, inView: headInView } = useInView<HTMLDivElement>();
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="container relative px-4">
        <div
          ref={headRef}
          className={`text-center max-w-3xl mx-auto mb-8 md:mb-16 opacity-0 ${
            headInView ? "animate-reveal-up" : ""
          }`}
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-foreground">
            Fra bestilling til montering
          </h2>
          <p className="text-foreground/75 text-lg md:text-xl leading-relaxed">
            En enkel prosess som ivaretar deg hele veien.
          </p>
          <SectionDivider className="mt-5" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          {steps.map((step, index) => (
            <StepCard
              key={step.title}
              icon={step.icon}
              title={step.title}
              description={step.description}
              index={index}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>

        <div className="text-center mt-10 md:mt-12">
          <p className="text-foreground/75 text-base md:text-lg mb-2">
            Vil du vite mer om hva som skjer videre?
          </p>
          <Link
            to="/informasjon/hva-skjer-etterpa"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all text-base md:text-lg"
          >
            Les mer om prosessen
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
