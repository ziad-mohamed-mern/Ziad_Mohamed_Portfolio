import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-secondary border-t border-border py-8 mt-auto">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-subtitle text-sm text-center md:text-left">
                    © {new Date().getFullYear()} Ziad Mohamed. All rights reserved.
                </p>

                <div className="flex items-center gap-6">
                    <a href="https://github.com/pigpis-Curwud-0wikty" target="_blank" rel="noopener noreferrer" className="text-subtitle hover:text-blue transition-colors">
                        <Github size={20} />
                    </a>
                    <a href="https://linkedin.com/in/ziad-mohamed-dev" target="_blank" rel="noopener noreferrer" className="text-subtitle hover:text-blue transition-colors">
                        <Linkedin size={20} />
                    </a>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
