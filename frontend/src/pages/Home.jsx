import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Services from "../components/Services";
import Projects from "../components/Projects";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "../shared/translations";

const Home = () => {
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  return (
    <>
      <Hero />
      {/* <About /> */}
      <div className="divider" />
      <Skills limit={8} />
      <div className="divider" />
      <Services />
      <div className="divider" />
      <Projects />
      <div className="divider" />
      <Testimonials />
      <div className="divider" />
      <FAQ />
      <div className="divider" />
      {/* CTA Section */}
      <section className="mb-16 max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-gray-50 to-gray-200 dark:from-white/10 dark:via-black/60 dark:to-black border border-gray-200 dark:border-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 text-center transition-all duration-300">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white transition-colors">{t('letsConnect')}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors">
            {t('ctaDescription')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-full font-medium hover:scale-105 transition-all"
            >
              {t('getInTouch')}
            </Link>
            <a
              href="https://github.com/pigpis-Curwud-0wikty"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-transparent border border-black/10 dark:border-white/30 text-black dark:text-white rounded-full font-medium hover:border-black dark:hover:border-white transition-all"
            >
              {t('viewGithub')}
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;