import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import PhilosophySection from "@/components/PhilosophySection";
import AboutSection from "@/components/AboutSection";
import CareersSection from "@/components/CareersSection";
import PartnershipsSection from "@/components/PartnershipsSection";
import ContactSection from "@/components/ContactSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import FloatingSocialButtons from "@/components/FloatingSocialButtons";
import CookieConsent from "@/components/CookieConsent";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <AboutSection />
      <ServicesSection />
      <PhilosophySection />
      <CareersSection />
      <PartnershipsSection />
      <ContactSection />
      <ContactForm />
      <Footer />
      <FloatingSocialButtons />
      <CookieConsent />
    </div>
  );
};

export default Index;
