import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Palette, Type, Eye, type LucideIcon } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { SectionDivider } from "./SectionDivider";

const features: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Palette, title: "Velg symboler", desc: "Livets tre, kors, hjerte, due og mange flere" },
  { icon: Type, title: "Personlig tekst", desc: "Legg til navn, datoer og en vakker etterskrift" },
  { icon: Eye, title: "Se resultatet", desc: "Forhåndsvisning i sanntid før du bestiller" },
];

function FeatureRow({
  icon: Icon,
  title,
  desc,
  index,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  index: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ animationDelay: `${index * 100}ms` }}
      className={`group flex items-start gap-4 p-4 md:p-5 bg-card rounded-2xl border border-border/60 hover:border-accent/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-500 opacity-0 ${
        inView ? "animate-reveal-up" : ""
      }`}
    >
      <div className="p-2.5 md:p-3 bg-accent/15 rounded-xl group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-500 shrink-0">
        <Icon className="h-5 w-5 md:h-6 md:w-6 text-accent group-hover:text-accent-foreground" />
      </div>
      <div>
        <h4 className="font-semibold mb-1 text-base md:text-lg">{title}</h4>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export function ConfiguratorTeaser() {
  const { ref: imgRef, inView: imgInView } = useInView<HTMLDivElement>();
  const { ref: headRef, inView: headInView } = useInView<HTMLDivElement>();
  return (
    <section className="relative py-12 md:py-20 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 md:w-96 md:h-96 rounded-full bg-accent/10 blur-3xl"
      />
      <div className="container relative px-4">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Preview */}
          <div
            ref={imgRef}
            className={`relative opacity-0 ${imgInView ? "animate-reveal-zoom" : ""}`}
          >
            <span
              aria-hidden
              className="absolute -inset-2 md:-inset-3 rounded-3xl bg-gradient-to-br from-accent/25 via-wood/15 to-transparent blur-lg"
            />
            <div className="relative aspect-[4/3] max-w-lg mx-auto rounded-2xl overflow-hidden shadow-2xl bg-card ring-2 ring-primary/30">
              <img
                alt="Gravplate i tre"
                src="/lovable-uploads/d0419dda-1a16-415b-abb8-e0af94719ab4.png"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div
            ref={headRef}
            className={`space-y-5 md:space-y-8 opacity-0 ${headInView ? "animate-reveal-up" : ""}`}
          >
            <div>
              <span className="inline-block px-4 py-1.5 md:px-4 md:py-2 bg-accent/15 text-accent rounded-full text-sm md:text-base font-medium mb-3 md:mb-4">
                Lag din egen
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-3 md:mb-4">
                Komponer din personlige gravplate
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                Bruk vårt enkle verktøy for å designe en unik minneplate. Velg størrelse,
                legg til navn, datoer og velg blant vakre symboler.
              </p>
              <SectionDivider className="mt-5 md:[&>span:first-child]:hidden md:justify-start" />
            </div>

            <div className="grid gap-3 md:gap-4">
              {features.map((f, i) => (
                <FeatureRow key={f.title} {...f} index={i} />
              ))}
            </div>

            <Button variant="hero" size="lg" asChild>
              <Link to="/komponer" className="text-base md:text-lg">
                Lag din plate
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
