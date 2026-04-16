import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { VideoSection } from "@/components/home/VideoSection";
import { ConfiguratorTeaser } from "@/components/home/ConfiguratorTeaser";
import { StepsSection } from "@/components/home/StepsSection";
import { ArticlesSection } from "@/components/home/ArticlesSection";
import { HomeFaqSection } from "@/components/home/HomeFaqSection";
import { ContactSection } from "@/components/home/ContactSection";
import { SeoHead } from "@/seo/SeoHead";
import { ROUTE_META } from "@/seo/metadata";
import { homePageGraphJsonLd, buildFaqPageJsonLd } from "@/seo/jsonLd";
import { FAQ_SECTIONS } from "@/data/homeFaqContent";

const Index = () => {
  const meta = ROUTE_META["/"];
  const faqJsonLd = buildFaqPageJsonLd(FAQ_SECTIONS);
  return (
    <Layout>
      <SeoHead
        title={meta.title}
        description={meta.description}
        path={meta.path}
        jsonLd={[homePageGraphJsonLd, faqJsonLd]}
      />
      <HeroSection />
      <TestimonialsCarousel />
      <VideoSection />
      <StepsSection />
      <ConfiguratorTeaser />
      <ArticlesSection />
      <HomeFaqSection />
      <ContactSection />
    </Layout>
  );
};

export default Index;
