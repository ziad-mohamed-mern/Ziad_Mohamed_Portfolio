import { useState, useEffect } from "react";
import { fetchSkills } from "../services/api";
import { Code2, Sparkles, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "../shared/translations";

const SkillsPage = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        setLoading(true);
        const data = await fetchSkills();
        setSkills(data);
        setError(null);
      } catch (err) {
        setError("Failed to load skills. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadSkills();
  }, []);

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || "other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {});

  const categoryInfo = {
    frontend: {
      title: language === 'ar' ? 'تطوير الواجهة الأمامية' : 'Frontend Development',
      description: language === 'ar' ? 'بناء واجهات مستخدم جميلة ومتجاوبة وتفاعلية' : 'Building beautiful, responsive, and interactive user interfaces',
      color: "text-blue-500"
    },
    backend: {
      title: language === 'ar' ? 'تطوير الخلفية' : 'Backend Development',
      description: language === 'ar' ? 'إنشاء تطبيقات وواجهات برمجية قوية من جانب الخادم' : 'Creating robust server-side applications and APIs',
      color: "text-green-500"
    },
    tools: {
      title: language === 'ar' ? 'الأدوات والتقنيات' : 'Tools & Technologies',
      description: language === 'ar' ? 'أدوات أساسية لسير عمل التطوير الحديث' : 'Essential tools for modern development workflow',
      color: "text-purple-500"
    },
    other: {
      title: language === 'ar' ? 'مهارات أخرى' : 'Other Skills',
      description: language === 'ar' ? 'تقنيات وكفاءات إضافية' : 'Additional technologies and competencies',
      color: "text-gray-500"
    }
  };

  if (loading) {
    return (
      <div className="mt-16 pb-16 container mx-auto px-4">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-pulse text-subtitle text-lg">{t('loading')}</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-16 pb-16 container mx-auto px-4">
        <div className="flex justify-center items-center min-h-[60vh]">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16 pb-16 container mx-auto px-4">
      {/* Header Section */}
      <div className="text-center mb-16">
        <p className="text-subtitle text-lg mb-4">
          {language === 'ar' ? 'ما أقدمه' : 'What I Bring to the Table'}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('mySkills')}</h1>
        <p className="text-subtitle text-lg max-w-3xl mx-auto leading-relaxed">
          {language === 'ar'
            ? 'نظرة شاملة على التقنيات والأدوات التي أعمل بها لإنشاء تجارب ويب استثنائية.'
            : 'A comprehensive overview of the technologies and tools I work with to create exceptional web experiences.'}
        </p>
      </div>

      {/* Introduction Section */}
      <section className="mb-20">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-secondary border border-border rounded-xl p-6 text-center">
            <div className="flex justify-center mb-4">
              <Code2 className="text-blue-500" size={40} />
            </div>
            <h3 className="text-xl font-bold mb-3">
              {language === 'ar' ? 'تقنيات حديثة' : 'Modern Technologies'}
            </h3>
            <p className="text-subtitle text-sm">
              {language === 'ar'
                ? 'العمل مع أحدث الأطر والمكتبات لبناء تطبيقات قابلة للتوسع'
                : 'Working with cutting-edge frameworks and libraries to build scalable applications'}
            </p>
          </div>

          <div className="bg-secondary border border-border rounded-xl p-6 text-center">
            <div className="flex justify-center mb-4">
              <Sparkles className="text-purple-500" size={40} />
            </div>
            <h3 className="text-xl font-bold mb-3">
              {language === 'ar' ? 'التعلم المستمر' : 'Continuous Learning'}
            </h3>
            <p className="text-subtitle text-sm">
              {language === 'ar'
                ? 'دائماً أوسع مجموعة مهاراتي وأبقى محدثاً بأفضل ممارسات الصناعة'
                : 'Always expanding my skill set and staying updated with industry best practices'}
            </p>
          </div>

          <div className="bg-secondary border border-border rounded-xl p-6 text-center">
            <div className="flex justify-center mb-4">
              <Target className="text-green-500" size={40} />
            </div>
            <h3 className="text-xl font-bold mb-3">
              {language === 'ar' ? 'خبرة عملية' : 'Practical Experience'}
            </h3>
            <p className="text-subtitle text-sm">
              {language === 'ar'
                ? 'خبرة عملية من خلال مشاريع حقيقية وعمل حر'
                : 'Hands-on experience through real-world projects and freelance work'}
            </p>
          </div>
        </div>
      </section>

      {/* Skills by Category */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('technicalSkills')}</h2>
          <p className="text-subtitle">
            {language === 'ar' ? 'منظمة حسب الفئة لسهولة التصفح' : 'Organized by category for easy navigation'}
          </p>
        </div>

        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category} className="mb-16">
            <div className="mb-8">
              <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${categoryInfo[category]?.color || "text-foreground"}`}>
                {categoryInfo[category]?.title || category}
              </h3>
              <p className="text-subtitle">
                {categoryInfo[category]?.description || ""}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {categorySkills.map((skill) => (
                <div
                  key={skill._id}
                  className="bg-secondary border border-border rounded-xl p-6 hover:border-accent transition-all group"
                >
                  {skill.icon && (
                    <div className="mb-4 flex justify-center">
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-16 h-16 object-contain group-hover:scale-110 transition-transform"
                      />
                    </div>
                  )}
                  <h4 className="text-lg font-bold text-center group-hover:text-accent transition-colors">
                    {skill.name}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        ))}

        {skills.length === 0 && (
          <div className="text-center py-12">
            <p className="text-subtitle">{t('noData')}</p>
          </div>
        )}
      </section>

      {/* Skills Summary */}
      <section className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {language === 'ar' ? 'جاهز للتعاون' : 'Ready to Collaborate'}
          </h2>
          <p className="text-subtitle mb-6 leading-relaxed">
            {language === 'ar'
              ? 'مع هذه المجموعة المتنوعة من المهارات، أنا مستعد لمواجهة المشاريع الصعبة والمساهمة في حلول مبتكرة. دعنا نعمل معاً لتحقيق أفكارك!'
              : 'With this diverse skill set, I\'m ready to tackle challenging projects and contribute to innovative solutions. Let\'s work together to bring your ideas to life!'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/portfolio"
              className="px-6 py-3 bg-accent text-primary rounded-full font-medium hover:scale-105 transition-all"
            >
              {t('viewAllProjects')}
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 bg-secondary border border-border text-foreground rounded-full font-medium hover:border-accent transition-all"
            >
              {t('getInTouch')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SkillsPage;