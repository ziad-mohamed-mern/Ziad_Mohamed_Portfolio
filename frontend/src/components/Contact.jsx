import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { sendMessage } from "../services/api";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "../shared/translations";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState({ type: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { language } = useLanguage();
    const { t } = useTranslation(language);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: "", message: "" });

        try {
            await sendMessage(formData);
            setStatus({
                type: "success",
                message: language === 'ar'
                    ? 'تم إرسال الرسالة بنجاح! سأرد عليك قريباً.'
                    : "Message sent successfully! I'll get back to you soon.",
            });
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            setStatus({
                type: "error",
                message: language === 'ar'
                    ? 'فشل إرسال الرسالة. يرجى المحاولة مرة أخرى لاحقاً.'
                    : "Failed to send message. Please try again later.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-16 bg-secondary/30">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="flex flex-col items-center text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-2">
                        <Mail className="text-accent" /> {t('letsConnect')}
                    </h2>
                    <p className="text-subtitle max-w-2xl mb-8">
                        {t('ctaDescription')}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                            {t('yourName')}
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:border-accent transition-colors text-foreground"
                            placeholder={language === 'ar' ? 'اسمك' : 'Your name'}
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                            {t('yourEmail')}
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:border-accent transition-colors text-foreground"
                            placeholder={language === 'ar' ? 'your.email@example.com' : 'your.email@example.com'}
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                            {t('yourMessage')}
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows="6"
                            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:border-accent transition-colors text-foreground resize-none"
                            placeholder={language === 'ar' ? 'رسالتك...' : 'Your message...'}
                        />
                    </div>

                    {status.message && (
                        <div
                            className={`p-4 rounded-lg ${status.type === "success"
                                ? "bg-green-500/10 border border-green-500/50 text-green-500"
                                : "bg-red-500/10 border border-red-500/50 text-red-500"
                                }`}
                        >
                            {status.message}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-8 py-3 bg-accent text-primary font-medium rounded-full hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                                {t('sending')}
                            </>
                        ) : (
                            <>
                                <Send size={18} /> {t('sendMessage')}
                            </>
                        )}
                    </button>
                </form>

                <div className="text-center mt-12">
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-8 py-3 bg-transparent border border-border text-foreground font-medium rounded-full hover:bg-white/5 transition-colors"
                    >
                        {t('viewGithub')}
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Contact;
