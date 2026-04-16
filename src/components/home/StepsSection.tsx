import { MessageCircle, FileEdit, CheckCircle, Hammer, Truck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
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

export function StepsSection() {
  return (
    <section className="py-10 md:py-20 bg-background">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
          <h2 className="font-display text-2xl md:text-4xl font-bold mb-2 md:mb-4">
            Fra bestilling til montering
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg">
            En enkel prosess som ivaretar deg hele veien.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group h-full"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-border" />
              )}

              <div className="relative h-full flex flex-col items-center bg-card rounded-xl md:rounded-2xl p-3 md:p-8 text-center shadow-sm hover:shadow-lg transition-shadow border border-border group-hover:border-primary/20">
                <div className="inline-flex items-center justify-center w-10 h-10 md:w-16 md:h-16 mb-3 md:mb-6 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                  <step.icon className="h-5 w-5 md:h-7 md:w-7" />
                </div>
                <h3 className="font-display text-sm md:text-xl font-semibold mb-1 md:mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-xs md:text-sm leading-relaxed hidden md:block">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Micro CTA */}
        <div className="text-center mt-8 md:mt-12">
          <p className="text-muted-foreground text-sm md:text-base mb-2">
            Vil du vite mer om hva som skjer videre?
          </p>
          <Link 
            to="/informasjon/hva-skjer-etterpa" 
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all text-sm md:text-base"
          >
            Les mer om prosessen
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
