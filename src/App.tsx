import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Routes,
  Route,
  Navigate,
  useParams,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "~/app.css";
import Home from "./pages/home";
import About from "./pages/about";
import Projects from "./pages/projects";
import Contact from "./pages/contact";

const NotFoundPage = () => {
  return (
    <div>
      <h1>404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

function App() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { lang } = useParams<{ lang: string }>(); // Get language parameter from URL

  // Effect to change i18n language when URL parameter changes
  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  const currentLang = location.pathname.split("/")[1] || i18n.language;

  return (
    <>
      <Header />
      <main>
        <Routes>
          {/* Redirect from root to default language */}
          <Route
            path="/"
            element={<Navigate to={`/${i18n.language}/`} replace />}
          />
          {/* Routes with language parameter */}
          <Route path="/:lang/" element={<Home />} />
          <Route path="/:lang/about" element={<About />} />
          <Route path="/:lang/projects" element={<Projects />} />
          <Route path="/:lang/contact" element={<Contact />} />

          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
