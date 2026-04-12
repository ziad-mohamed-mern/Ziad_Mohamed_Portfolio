import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { fetchAbout } from "../services/api";

const About = () => {
    const [aboutData, setAboutData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadAbout = async () => {
            try {
                setLoading(true);
                const data = await fetchAbout();
                setAboutData(data);
                setError(null);
            } catch (err) {
                setError("Failed to load about information. Please try again later.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadAbout();
    }, []);

    if (loading) {
        return (
            <section className="py-16 bg-secondary/50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-2">
                            <User className="text-accent" /> About Me
                        </h2>
                    </div>
                    <div className="flex justify-center">
                        <div className="animate-pulse text-subtitle">Loading...</div>
                    </div>
                </div>
            </section>
        );
    }

    if (error || !aboutData) {
        return (
            <section className="py-16 bg-secondary/50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-2">
                            <User className="text-accent" /> About Me
                        </h2>
                    </div>
                    <div className="flex justify-center">
                        <p className="text-red-500">{error || "No about information found."}</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 bg-secondary/50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-2">
                        <User className="text-accent" /> About Me
                    </h2>
                    <p className="text-subtitle max-w-2xl">
                        Here you will find more information about me, what I do, and my current skills
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h3 className="text-2xl font-bold mb-6">Get to know me!</h3>
                        <div className="space-y-4 text-subtitle leading-relaxed">
                            <p>
                                I'm <span className="text-foreground font-medium">{aboutData.name}</span>, a{" "}
                                <span className="text-foreground font-medium">{aboutData.role}</span>.
                            </p>
                            <p>{aboutData.description}</p>
                            {aboutData.address && (
                                <p>
                                    <span className="text-foreground font-medium">Location:</span> {aboutData.address}
                                </p>
                            )}
                            {aboutData.email && (
                                <p>
                                    <span className="text-foreground font-medium">Email:</span>{" "}
                                    <a href={`mailto:${aboutData.email}`} className="text-accent hover:underline">
                                        {aboutData.email}
                                    </a>
                                </p>
                            )}
                            {aboutData.phone && (
                                <p>
                                    <span className="text-foreground font-medium">Phone:</span> {aboutData.phone}
                                </p>
                            )}
                        </div>
                        <div className="flex gap-4 mt-8">
                            <a
                                href="/contact"
                                className="inline-block px-8 py-3 bg-accent text-primary font-medium rounded-full hover:bg-accent/90 transition-colors"
                            >
                                Contact Me
                            </a>
                            {aboutData.cvLink && (
                                <a
                                    href={aboutData.cvLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block px-8 py-3 border border-border text-foreground font-medium rounded-full hover:bg-white/5 transition-colors"
                                >
                                    Download CV
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-center">
                        {aboutData.profileImage && (
                            <div className="relative w-72 h-72 md:w-96 md:h-96">
                                <div className="absolute inset-0 bg-gradient-to-tr from-accent to-accent/50 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                                <img
                                    src={aboutData.profileImage}
                                    alt={aboutData.name}
                                    className="relative w-full h-full object-cover rounded-full border-4 border-secondary shadow-2xl"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
