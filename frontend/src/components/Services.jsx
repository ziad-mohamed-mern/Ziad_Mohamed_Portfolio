import { Palette, Zap, Code } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "../shared/translations";

const Services = () => {
    const { language } = useLanguage();
    const { t } = useTranslation(language);

    const services = [
        {
            icon: <Palette size={40} className="text-yellow-500" />,
            title: language === 'ar' ? 'تصميم واجهة المستخدم' : 'UI/UX Design',
            description: language === 'ar'
                ? 'أصمم واجهات مستخدم متجاوبة وحديثة توفر تجربة مستخدم سلسة عبر جميع الأجهزة.'
                : 'I design responsive and modern user interfaces that provide a smooth user experience across all devices.'
        },
        {
            icon: <Zap size={40} className="text-purple-500" />,
            title: language === 'ar' ? 'تحسين الأداء' : 'Performance Optimization',
            description: language === 'ar'
                ? 'أبني مواقع ويب سريعة ومحسّنة باستخدام أفضل الممارسات مثل التحميل الكسول والتخزين المؤقت وتحسين الصور.'
                : 'I build fast and optimized websites using best practices like lazy loading, caching, and image optimization.'
        },
        {
            icon: <Code size={40} className="text-green-500" />,
            title: language === 'ar' ? 'كود نظيف وقابل لإعادة الاستخدام' : 'Clean & Reusable Code',
            description: language === 'ar'
                ? 'أكتب كود نظيف وقابل لإعادة الاستخدام ومنظم جيداً باستخدام React و Tailwind CSS وأدوات التطوير الحديثة.'
                : 'I write clean, reusable, and well-structured code using React, Tailwind CSS, and modern development tools.'
        }
    ];

    return (
        <section className="py-16 bg-secondary/30">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('services')}</h2>
                    <p className="text-subtitle max-w-2xl">
                        {t('whatIOffer')}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="p-8 bg-secondary border border-border rounded-xl hover:border-blue transition-all hover:-translate-y-2"
                        >
                            <div className="mb-6">{service.icon}</div>
                            <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                            <p className="text-subtitle leading-relaxed">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
