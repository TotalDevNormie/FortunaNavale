import { useEffect, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "~/app.css";
import Home from "./pages/home";
import About from "./pages/about";
import Projects from "./pages/projects";
import Contact from "./pages/contact";
import NotFound from "./components/NotFound";
import Vacancies from "./pages/vacancies";
import Vacancie from "./pages/vacancie";
import ScrollToTop from "./components/ScrollTop";
import { supportedLngs } from "./i18n"; // Import supportedLngs from your i18n file

const LayoutWrapper = ({ children }: { children: ReactNode }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);

// Helper function to get the shortened language code
const getShortenedLangCode = (langCode: string): string => {
  return langCode.split('-')[0];
};

function App() {
  const { i18n } = useTranslation();
  const { lang } = useParams<{ lang: string }>(); // Get language parameter from URL

  // Effect to change i18n language when URL parameter changes
  useEffect(() => {
    if (lang) {
      const shortenedLang = getShortenedLangCode(lang);
      // Only change language if the shortened code is supported and different from current
      if (supportedLngs.includes(shortenedLang) && i18n.language !== shortenedLang) {
        i18n.changeLanguage(shortenedLang);
      } else if (!supportedLngs.includes(shortenedLang)) {
        // Optional: Handle unsupported language codes in the URL
        // You might want to redirect to the default language or a 404 page
        console.warn(`Unsupported language code in URL: ${lang}`);
        // Example: Redirect to default language
        // navigate(`/${i18n.language}/`, { replace: true }); // Requires useNavigate hook
      }
    }
  }, [lang, i18n, supportedLngs]); // Add supportedLngs to dependencies

  // Get the shortened language code for the default redirect
  const defaultShortenedLang = getShortenedLangCode(i18n.language);

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Redirect from root to default language (shortened) */}
        {/* Also handle cases where a full locale might be in the URL initially */}
         <Route
            path="/"
            element={<Navigate to={`/${defaultShortenedLang}/`} replace />}
          />
          {/* This route handles both shortened and potentially full language codes in the URL
              but we'll use the effect to set the i18n language to the shortened version */}
          <Route
            path="/:lang/*" // Use a catch-all to match any path after the lang parameter
            element={<LanguageRouteHandler />}
          />
      </Routes>
    </>
  );
}

// New component to handle rendering based on the language parameter
const LanguageRouteHandler = () => {
  const { lang } = useParams<{ lang: string }>();
  const shortenedLang = lang ? getShortenedLangCode(lang) : undefined;

  // If the shortened language code is not supported, you might want to redirect
  if (shortenedLang && !supportedLngs.includes(shortenedLang)) {
      // Redirect to a 404 or default language page if the URL has an unsupported lang code
      // You'll need to use useNavigate hook here
       const navigate = useNavigate(); // Import useNavigate
       useEffect(() => {
           navigate(`/${getShortenedLangCode(i18n.language)}/`, { replace: true }); // Redirect to default supported lang
       }, [navigate]);
      return null; // Don't render anything while redirecting
  }


  return (
    <LayoutWrapper>
      <Routes>
        {/* Nested Routes within the language context */}
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="vacancies" element={<Vacancies />} />
        <Route path="vacancies/:jobId" element={<Vacancie />} />
        <Route path="contact" element={<Contact />} />

        {/* Catch-all for routes within the language */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </LayoutWrapper>
  );
};


export default App;
