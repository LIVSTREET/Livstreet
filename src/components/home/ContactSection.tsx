import { Mail, Phone, MapPin, type LucideIcon } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { SectionDivider } from "./SectionDivider";

function ContactCard({
  href,
  icon: Icon,
  title,
  description,
  value,
  index,
}: {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  value: string;
  index: number;
}) {
  const { ref, inView } = useInView<HTMLAnchorElement>();
  return (
    <a
      ref={ref}
      href={href}
      style={{ animationDelay: `${index * 120}ms` }}
      className={`group relative overflow-hidden p-6 md:p-8 bg-card rounded-2xl border border-border/60 hover:border-accent/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 text-center opacity-0 ${
        inView ? "animate-reveal-up" : ""
      }`}
    >
      <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 mb-3 md:mb-4 rounded-full bg-accent/15 text-accent group-hover:bg-accent group-hover:text-accent-foreground group-hover:scale-110 transition-all duration-500">
        <Icon className="h-6 w-6 md:h-7 md:w-7" />
      </div>
      <h3 className="font-display text-xl md:text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-base md:text-lg mb-3 md:mb-4 hidden md:block leading-relaxed">
        {description}
      </p>
      <span className="text-primary font-medium text-base md:text-lg">{value}</span>
    </a>
  );
}

export function ContactSection() {
  const { ref: headRef, inView: headInView } = useInView<HTMLDivElement>();
  return (
    <section className="py-12 md:py-20">
      <div className="container px-4">
        <div className="max-w-5xl mx-auto">
          <div
            ref={headRef}
            className={`text-center mb-8 md:mb-12 opacity-0 ${headInView ? "animate-reveal-up" : ""}`}
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              Vi er her for deg
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Har du spørsmål eller trenger veiledning? Ta kontakt med oss – vi hjelper deg gjerne.
            </p>
            <SectionDivider className="mt-5" />
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <ContactCard
              href="mailto:post@livstreet.no"
              icon={Mail}
              title="E-post"
              description="Send oss en melding når som helst"
              value="post@livstreet.no"
              index={0}
            />
            <ContactCard
              href="tel:+4745251280"
              icon={Phone}
              title="Telefon"
              description="Man-fre 09:00-16:00"
              value="+47 452 51 280"
              index={1}
            />
          </div>

          <div className="mt-6 md:mt-8 p-5 md:p-6 bg-card/70 backdrop-blur-sm border border-border/40 rounded-2xl flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 text-center md:text-left">
            <MapPin className="h-6 w-6 md:h-7 md:w-7 text-accent shrink-0" />
            <p className="text-muted-foreground text-base md:text-lg">Oslo, Norge</p>
          </div>
        </div>
      </div>
    </section>
  );
}
