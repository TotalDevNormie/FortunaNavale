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

const LayoutWrapper = ({ children }: { children: ReactNode }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);

function App() {
  const { i18n } = useTranslation();
  const { lang } = useParams<{ lang: string }>(); // Get language parameter from URL

  // Effect to change i18n language when URL parameter changes
  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return (
    <Routes>
      {/* Redirect from root to default language */}
      <Route
        path="/"
        element={<Navigate to={`/${i18n.language}/`} replace />}
      />
      {/* Routes with language parameter */}
      <Route
        path="/:lang/"
        element={
          <LayoutWrapper>
            <Home />
          </LayoutWrapper>
        }
      />
      <Route
        path="/:lang/about"
        element={
          <LayoutWrapper>
            <About />
          </LayoutWrapper>
        }
      />
      <Route
        path="/:lang/projects"
        element={
          <LayoutWrapper>
            <Projects />
          </LayoutWrapper>
        }
      />
      <Route
        path="/:lang/vacancies"
        element={
          <LayoutWrapper>
            <Vacancies />
          </LayoutWrapper>
        }
      />
      <Route
        path="/:lang/vacancies/:jobId"
        element={
          <LayoutWrapper>
            <Vacancie />
          </LayoutWrapper>
        }
      />
      <Route
        path="/:lang/contact"
        element={
          <LayoutWrapper>
            <Contact />
          </LayoutWrapper>
        }
      />

      {/* Catch-all route for 404 */}
      <Route path="/:lang/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
