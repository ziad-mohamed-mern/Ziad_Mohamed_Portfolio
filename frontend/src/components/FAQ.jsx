import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "../shared/translations";

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const { language } = useLanguage();
    const { t } = useTranslation(language);

    const faqs = [
        {
            question: language === 'ar' ? 'ما هي المهارات الأساسية التي أمتلكها؟' : 'What core skills do I have?',
            answer: language === 'ar'
                ? 'أتخصص في تطوير الواجهة الأمامية باستخدام React و Next.js و Tailwind CSS. لدي أيضاً خبرة في تقنيات الخلفية مثل Node.js وقواعد البيانات.'
                : 'I specialize in Front-end development using React, Next.js, and Tailwind CSS. I also have experience with backend technologies like Node.js and databases.'
        },
        {
            question: language === 'ar' ? 'هل يمكنني بناء موقع احترافي من الصفر؟' : 'Can I build a professional website from scratch?',
            answer: language === 'ar'
                ? 'نعم، يمكنني التعامل مع العملية بأكملها من التصميم إلى النشر، مع ضمان موقع ويب عالي الجودة ومتجاوب وعالي الأداء.'
                : 'Yes, I can handle the entire process from design to deployment, ensuring a high-quality, responsive, and performant website.'
        },
        {
            question: language === 'ar' ? 'هل يمكنني العمل مع واجهات برمجة التطبيقات؟' : 'Am I able to work with APIs?',
            answer: language === 'ar'
                ? 'بالتأكيد! لدي خبرة واسعة في دمج واجهات برمجة التطبيقات الخارجية وبناء نقاط نهاية API مخصصة لجلب البيانات ومعالجتها.'
                : 'Absolutely! I have extensive experience integrating third-party APIs and building custom API endpoints for data fetching and manipulation.'
        },
        {
            question: language === 'ar' ? 'هل يمكنني تعديل أو تحسين موقع موجود؟' : 'Can I edit or improve an existing website?',
            answer: language === 'ar'
                ? 'نعم، يمكنني مراجعة موقعك الحالي وتحديد مجالات التحسين وتنفيذ التغييرات لتعزيز الأداء وإمكانية الوصول وتجربة المستخدم.'
                : 'Yes, I can audit your existing website, identify areas for improvement, and implement changes to enhance performance, accessibility, and user experience.'
        }
    ];

    return (
        <section className="py-16">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="flex flex-col items-center text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('faq')}</h2>
                    <p className="text-subtitle max-w-2xl">
                        {t('frequentlyAsked')}
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-border rounded-xl overflow-hidden bg-secondary transition-all"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                            >
                                <span className="font-medium text-lg">{faq.question}</span>
                                {openIndex === index ? (
                                    <Minus className="text-blue flex-shrink-0" />
                                ) : (
                                    <Plus className="text-blue flex-shrink-0" />
                                )}
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                                    }`}
                            >
                                <div className="p-6 pt-2 text-gray-500 font-medium text-lg border-t border-border/50">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
