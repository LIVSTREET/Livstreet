import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { VideoSection } from "@/components/home/VideoSection";
import { ConfiguratorTeaser } from "@/components/home/ConfiguratorTeaser";
import { StepsSection } from "@/components/home/StepsSection";
import { ArticlesSection } from "@/components/home/ArticlesSection";
import { ContactSection } from "@/components/home/ContactSection";
import { SeoHead } from "@/seo/SeoHead";
import { ROUTE_META } from "@/seo/metadata";
import { organizationJsonLd, websiteJsonLd } from "@/seo/jsonLd";

const Index = () => {
  const meta = ROUTE_META["/"];
  return (
    <Layout>
      <SeoHead
        title={meta.title}
        description={meta.description}
        path={meta.path}
        jsonLd={[organizationJsonLd, websiteJsonLd]}
      />
      <HeroSection />
      <TestimonialsCarousel />
      <VideoSection />
      <StepsSection />
      <ConfiguratorTeaser />
      <ArticlesSection />
      <ContactSection />
    </Layout>
  );
};

export default Index;
