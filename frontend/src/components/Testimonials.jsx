import { Quote } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "../shared/translations";

const Testimonials = () => {
    const { language } = useLanguage();
    const { t } = useTranslation(language);

    const testimonials = [
        {
            name: language === 'ar' ? 'سارة جونسون' : 'Sarah Johnson',
            role: language === 'ar' ? 'مديرة التسويق في TechCorp' : 'Marketing Director at TechCorp',
            content: language === 'ar'
                ? 'كان العمل مع هذا المصمم متعة مطلقة. قدموا موقعاً مذهلاً يعكس هوية علامتنا التجارية بشكل مثالي. اهتمامهم بالتفاصيل وإبداعهم تجاوز توقعاتنا.'
                : 'Working with this designer was an absolute pleasure. They delivered a stunning website that perfectly captured our brand identity. Their attention to detail and creativity exceeded our expectations.'
        },
        {
            name: language === 'ar' ? 'مايكل تشين' : 'Michael Chen',
            role: language === 'ar' ? 'مؤسس StartupX' : 'Founder at StartupX',
            content: language === 'ar'
                ? 'استأجرت هذا المستقل لتصميم شعارنا وهوية العلامة التجارية. كانت النتائج رائعة! أخذوا الوقت لفهم رؤيتنا وترجموها إلى تمثيل مرئي مثالي لعلامتنا التجارية.'
                : 'I hired this freelancer for our logo design and brand identity. The results were outstanding! They took the time to understand our vision and translated it into a perfect visual representation of our brand.'
        },
        {
            name: language === 'ar' ? 'إميلي رودريغيز' : 'Emily Rodriguez',
            role: language === 'ar' ? 'مديرة التجارة الإلكترونية' : 'E-commerce Manager',
            content: language === 'ar'
                ? 'كان متجرنا الإلكتروني بحاجة إلى إعادة تصميم كاملة، وقدم هذا المطور أكثر من توقعاتنا. الموقع ليس جميلاً فحسب، بل يعمل بشكل استثنائي، مما أدى إلى زيادة المبيعات.'
                : 'Our online store needed a complete redesign, and this developer delivered beyond our expectations. The site is not only beautiful but also performs exceptionally well, leading to increased sales.'
        }
    ];

    return (
        <section className="py-16 bg-secondary/30">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('testimonials')}</h2>
                    <p className="text-subtitle max-w-2xl">
                        {t('whatClientsSay')}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <div
                            key={index}
                            className="p-8 bg-primary border border-border rounded-xl relative hover:bg-white/5 transition-colors"
                        >
                            <Quote className="absolute top-5 right-5 text-blue/20 text-subtitle" size={30} />
                            <p className="text-subtitle italic mb-6 relative z-10">"{item.content}"</p>
                            <div>
                                <h4 className="font-bold text-subtitle">{item.name}</h4>
                                <p className="text-subtitle">{item.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
