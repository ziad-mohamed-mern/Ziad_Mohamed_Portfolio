import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "../shared/translations";

const Hero = () => {
    const { language } = useLanguage();
    const { t } = useTranslation(language);

    return (
        <section className="mt-16 pb-16 min-h-screen flex items-center justify-center" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <div className="container mx-auto px-4 flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
                <div className={`flex-1 text-center ${language === 'ar' ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className="inline-block px-4 py-2 mb-4 text-sm font-medium text-green-500 bg-green-500/10 rounded-full">
                        {language === 'ar' ? 'متاح للعمل' : 'Available For Work'}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        {language === 'ar' ? 'مرحباً! أنا' : 'Hello! I\'m'} <br />
                        <span className="text-blue">Ziad Mohamed</span> <span className="inline-block animate-wave">👋</span>
                    </h1>
                    <h2 className="text-2xl md:text-3xl text-subtitle mb-6 font-medium">
                        {language === 'ar' ? 'مطور واجهات أمامية | خبير React و Next.js' : 'Full-stack Developer | React & Next.js Expert'}
                    </h2>
                    <p className="text-subtitle text-lg mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                        {language === 'ar'
                            ? 'كمطور واجهات أمامية شغوف مع خبرة عملية، أقوم بإنشاء تجارب ويب جذابة بصرياً وسهلة الاستخدام. رحلتي عززت مهاراتي في تقنيات الواجهة الأمامية الحديثة وحل المشكلات في العالم الحقيقي.'
                            : 'As a passionate Full-stack Developer with hands-on experience, I create visually captivating and user-friendly web experiences. My journey has strengthened my skills in modern front-end technologies and real-world problem solving.'}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
                        <Link
                            to="/about"
                            className="px-8 py-3 bg-blue text-primary font-medium rounded-full hover:bg-blue/90 transition-colors w-full sm:w-auto"
                        >
                            {t('aboutMe')}
                        </Link>
                        <a
                            href="https://drive.google.com/drive/folders/19jZ2d4r-ZzOtxFwtZ3qNU743IfqCHj97"
                            target="_blank"
                            download
                            className="px-8 py-3 bg-secondary border border-border text-blue font-medium rounded-full hover:bg-border transition-colors w-full sm:w-auto"
                        >
                            {t('downloadCV')}
                        </a>
                    </div>

                    <div className="flex items-center justify-center lg:justify-start gap-6">
                        <a href="https://github.com/pigpis-Curwud-0wikty" target="_blank" rel="noopener noreferrer" className="text-subtitle hover:text-blue transition-colors">
                            <Github size={24} />
                        </a>
                        <a href="https://www.linkedin.com/in/ziad-mohamed-dev" target="_blank" rel="noopener noreferrer" className="text-subtitle hover:text-blue transition-colors">
                            <Linkedin size={24} />
                        </a>
                        <a href="mailto:aom630619@gmail.com" className="text-subtitle hover:text-blue transition-colors">
                            <Mail size={24} />
                        </a>
                    </div>
                </div>

                <div className="flex-1 relative">
                    <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue to-purple-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                        <img
                            src="/me-modified.jpg"
                            alt="Ziad Mohamed"
                            className="relative w-full h-full object-cover rounded-full border-4 border-secondary shadow-2xl"
                            onError={(e) => {
                                e.target.src = "https://via.placeholder.com/400";
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
