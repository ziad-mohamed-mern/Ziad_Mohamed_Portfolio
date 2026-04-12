import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "../shared/translations";

const ContactPage = () => {
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  return (
    <div className="mt-16 pb-16 container mx-auto px-4">
      <p className="text-subtitle text-lg text-center">
        {t('getInTouch')}
      </p>
      <h1 className="text-4xl font-bold mb-2 text-center">{t('contactMe')}</h1>
      {/* <p className="text-subtitle">Coming soon...</p> */}
      <Contact />
      <div className="border border-gray-200 my-2" />
      <FAQ />
    </div>
  );
};

export default ContactPage;