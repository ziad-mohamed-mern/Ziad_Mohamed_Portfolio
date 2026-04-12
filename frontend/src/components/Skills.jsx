import { useState, useEffect } from "react";
import { fetchSkills } from "../services/api";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "../shared/translations";

const Skills = ({ limit }) => {
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

    if (loading) {
        return (
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            My Experience
                        </h2>
                        <p className="text-subtitle max-w-2xl">
                            What Skills I Have
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <div className="animate-pulse text-subtitle">Loading skills...</div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            My Experience
                        </h2>
                        <p className="text-subtitle max-w-2xl">
                            What Skills I Have
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <p className="text-red-500">{error}</p>
                    </div>
                </div>
            </section>
        );
    }

    const displayedSkills = limit ? skills.slice(0, limit) : skills;

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        My Experience
                    </h2>
                    <p className="text-subtitle max-w-2xl">
                        What Skills I Have
                    </p>
                </div>

                {skills.length === 0 ? (
                    <div className="flex justify-center">
                        <p className="text-subtitle">No skills found.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {displayedSkills.map((skill) => (
                                <div
                                    key={skill._id}
                                    className="p-6 bg-secondary border border-border rounded-xl hover:border-accent transition-colors group"
                                >
                                    {skill.icon && (
                                        <div className="mb-4 flex justify-center">
                                            <img
                                                src={skill.icon}
                                                alt={skill.name}
                                                className="w-12 h-12 object-contain"
                                            />
                                        </div>
                                    )}
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors text-center">
                                        {skill.name}
                                    </h3>
                                    {skill.category && (
                                        <p className="text-subtitle text-sm text-center">{skill.category}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {limit && skills.length > limit && (
                            <div className="flex justify-center mt-12">
                                <Link
                                    to="/skills"
                                    className="px-8 py-3 bg-primary border border-accent text-accent font-medium rounded-full hover:bg-accent hover:text-primary transition-all duration-300"
                                >
                                    {t('moreSkills')}
                                </Link>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default Skills;
