import { Mail, Phone, MapPin, type LucideIcon } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { SectionDivider } from "./SectionDivider";
import benefitsBg from "@/assets/benefits-oak-bg.jpg";

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
      className={`group relative overflow-hidden p-6 md:p-8 bg-background/95 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-accent/60 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 text-center opacity-0 ${
        inView ? "animate-reveal-up" : ""
      }`}
    >
      <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 mb-3 md:mb-4 rounded-full bg-accent/15 text-accent group-hover:bg-accent group-hover:text-accent-foreground group-hover:scale-110 transition-all duration-500">
        <Icon className="h-6 w-6 md:h-7 md:w-7" />
      </div>
      <h3 className="font-display text-xl md:text-2xl font-semibold mb-2 text-foreground">{title}</h3>
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
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover"
        style={{ backgroundImage: `url(${benefitsBg})`, backgroundPosition: "center 40%" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/80"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(0,0,0,0.6)_100%)]"
      />

      <div className="container relative px-4">
        <div className="max-w-5xl mx-auto">
          <div
            ref={headRef}
            className={`text-center mb-8 md:mb-12 opacity-0 ${headInView ? "animate-reveal-up" : ""}`}
          >
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-3 md:mb-4 text-white drop-shadow-lg leading-tight">
              Vi er her for deg
            </h2>
            <p className="text-white/85 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed drop-shadow">
              Har du spørsmål eller trenger veiledning? Ta kontakt med oss – vi hjelper deg gjerne.
            </p>
            <SectionDivider className="mt-5" />
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <ContactCard
              href="mailto:livstreet.store@gmail.com"
              icon={Mail}
              title="E-post"
              description="Send oss en melding når som helst"
              value="livstreet.store@gmail.com"
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

          <div className="mt-6 md:mt-8 p-5 md:p-6 bg-background/90 backdrop-blur-sm rounded-2xl flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 text-center md:text-left border border-white/20">
            <MapPin className="h-6 w-6 md:h-7 md:w-7 text-accent shrink-0" />
            <p className="text-foreground text-base md:text-lg">Oslo, Norge</p>
          </div>
        </div>
      </div>
    </section>
  );
}
