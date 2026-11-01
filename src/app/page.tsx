import { AppProvider } from "@/components/providers/AppProvider";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Expertise } from "@/components/sections/Expertise";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { TechBand } from "@/components/sections/TechBand";
import { Cursor } from "@/components/ui/Cursor";
import { Navbar } from "@/components/ui/Navbar";
import { Preloader } from "@/components/ui/Preloader";
import { profile } from "@/data/resume";
import { siteUrl } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  description: profile.tagline,
  url: siteUrl,
  image: `${siteUrl}/abdul-moeez.jpg`,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Islamabad", addressCountry: "PK" },
  sameAs: [profile.linkedin, profile.github],
  alumniOf: "SZABIST University Islamabad",
  worksFor: { "@type": "Organization", name: "GixiAI", url: "https://www.gixiai.com/" },
};

export default function Home() {
  return (
    <AppProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Preloader />
      <Cursor />
      <Navbar />
      <div aria-hidden className="noise" />
      <main className="relative">
        <Hero />
        <About />
        <TechBand />
        <Expertise />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </AppProvider>
  );
}
