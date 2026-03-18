import PageLayout from "@/components/PageLayout";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import EnvironmentSection from "@/components/EnvironmentSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <PageLayout>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <EnvironmentSection />
      <ContactSection />
    </PageLayout>
  );
};

export default Index;
