import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import SkillsPage from "./pages/Skills";
import Portfolio from "./pages/Portfolio";
import ContactPage from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { LanguageProvider } from "./contexts/LanguageContext";

function App() {
  const [showScrollBTN, setshowScrollBTN] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setshowScrollBTN(true);
      } else {
        setshowScrollBTN(false);
      }
    });
  }, []);

  return (
    <LanguageProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <div className="bg-primary bg-grid-pattern min-h-screen flex text-foreground transition-colors duration-300">
          <Sidebar />
          <main className="flex-grow md:ms-20 lg:ms-64 pb-20 md:pb-0 transition-all duration-300">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
            <Footer />

            <a
              href="#up"
              className={`fixed bottom-24 md:bottom-8 end-8 p-3 bg-accent text-primary rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-40 ${showScrollBTN ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
                }`}
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <ArrowUp size={24} />
            </a>
          </main>
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
