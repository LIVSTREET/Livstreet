import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { VideoSection } from "@/components/home/VideoSection";
import { ConfiguratorTeaser } from "@/components/home/ConfiguratorTeaser";
import { StepsSection } from "@/components/home/StepsSection";
import { ArticlesSection } from "@/components/home/ArticlesSection";
import { ContactSection } from "@/components/home/ContactSection";

const Index = () => {
  return (
    <Layout>
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
