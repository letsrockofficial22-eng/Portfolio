import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MarqueeStrip from "./components/MarqueeStrip";
import Skills from "./components/Skills";
import Sandbox from "./components/Sandbox";
import Projects from "./components/Projects";
import Manifesto from "./components/Manifesto";
import Footer from "./components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen bg-bg text-ink overflow-hidden">
      <AnimatePresence>{loading && <Preloader />}</AnimatePresence>
      <CustomCursor />
      <Header />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Hero />
        <MarqueeStrip text="WHAT SETS ME APART  ·  WHAT SETS ME APART  ·  WHAT SETS ME APART  ·  " />
        <Skills />
        <Sandbox />
        <Projects />
        <MarqueeStrip text="THE ARTWORKS  ·  THE ARTWORKS  ·  THE ARTWORKS  ·  THE ARTWORKS  ·  " />
        <Manifesto />
        <Footer />
      </motion.main>
    </div>
  );
}
