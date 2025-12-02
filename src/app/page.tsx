import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import RecruiterToggle from "@/components/RecruiterToggle";
import Background from "@/components/Background";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Background />
      <RecruiterToggle />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Contact />

      {/* Footer */}
      <footer className="py-8 text-center border-t border-autumn-gold/20 relative z-10">
        <p className="text-ancient-wood/60 font-sans text-sm">
          © 2025 Yashvir. Crafted in the spirit of Rivendell.
        </p>
      </footer>
    </main>
  );
}
