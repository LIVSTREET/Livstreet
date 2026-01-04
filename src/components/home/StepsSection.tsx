import { FileText, Palette, Truck, Wrench } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "1. Bestill",
    description: "Design din plate online eller kontakt oss for hjelp med personlig veiledning.",
  },
  {
    icon: Palette,
    title: "2. Vi lager",
    description: "Platen produseres i Danmark i eik med lasergravering og naturlig finish.",
  },
  {
    icon: Truck,
    title: "3. Levering",
    description: "Platen sendes trygt til deg eller direkte til kirkegården etter avtale.",
  },
  {
    icon: Wrench,
    title: "4. Montering",
    description: "Vi tilbyr profesjonell montering, eller du kan gjøre det selv med enkel guide.",
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-border" />
              )}

              <div className="relative bg-card rounded-xl md:rounded-2xl p-3 md:p-8 text-center shadow-sm hover:shadow-lg transition-shadow border border-border group-hover:border-primary/20">
                <div className="inline-flex items-center justify-center w-10 h-10 md:w-16 md:h-16 mb-3 md:mb-6 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
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
      </div>
    </section>
  );
}
