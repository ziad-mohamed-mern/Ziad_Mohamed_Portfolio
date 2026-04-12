import { useState, useEffect } from "react";
import { Github, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchProjects } from "../services/api";
import { useLanguage } from "../contexts/LanguageContext";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { language } = useLanguage();

    useEffect(() => {
        const loadProjects = async () => {
            try {
                setLoading(true);
                const data = await fetchProjects();
                setProjects(data);
                setError(null);
            } catch (err) {
                setError("Failed to load projects. Please try again later.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, []);

    if (loading) {
        return (
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
                        <p className="text-subtitle max-w-2xl">My Recent Work</p>
                    </div>
                    <div className="flex justify-center">
                        <div className="animate-pulse text-subtitle">Loading projects...</div>
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
                        <p className="text-subtitle max-w-2xl">My Recent Work</p>
                    </div>
                    <div className="flex justify-center">
                        <p className="text-red-500">{error}</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
                    <p className="text-subtitle max-w-2xl">My Recent Work</p>
                </div>

                {projects.length === 0 ? (
                    <div className="flex justify-center">
                        <p className="text-subtitle">No projects found.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((project) => (
                                <Link
                                    key={project._id}
                                    to={`/product/${project._id}`}
                                    className="group bg-secondary border border-border rounded-xl overflow-hidden hover:border-accent transition-all"
                                >
                                    <div className="relative overflow-hidden h-48">
                                        <img
                                            src={project.image || "https://via.placeholder.com/600x400"}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                            {project.github && (
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        window.open(project.github, '_blank');
                                                    }}
                                                    className="p-2 bg-white text-black rounded-full hover:bg-accent hover:text-primary transition-colors"
                                                >
                                                    <Github size={20} />
                                                </button>
                                            )}
                                            {project.demo && (
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        window.open(project.demo, '_blank');
                                                    }}
                                                    className="p-2 bg-white text-black rounded-full hover:bg-accent hover:text-primary transition-colors"
                                                >
                                                    <ExternalLink size={20} />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                        <p className="text-subtitle text-sm mb-4 line-clamp-2">
                                            {project.description?.en || project.description?.ar || project.description
                                                ? (language === 'ar'
                                                    ? (project.description?.ar || project.description)
                                                    : (project.description?.en || project.description))
                                                : ''}
                                        </p>
                                        {project.tech && project.tech.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {project.tech.map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1 text-xs bg-primary border border-border rounded-full text-subtitle"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <Link
                                to="/portfolio"
                                className="inline-block px-8 py-3 border border-accent text-accent font-medium rounded-full hover:bg-accent hover:text-primary transition-colors"
                            >
                                View All Projects
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default Projects;
