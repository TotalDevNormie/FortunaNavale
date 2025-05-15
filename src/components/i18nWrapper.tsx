import { useEffect } from "react"; // Remove default React import
import { useParams, Outlet, useNavigate } from "react-router-dom";
import i18n from "~/i18n";
import { useTranslation } from "react-i18next";

// No props needed since we're using Outlet
const I18nWrapper = () => {
  const { lang } = useParams<{ lang?: string }>();
  const navigate = useNavigate();
  const { i18n: i18nInstance } = useTranslation();

  useEffect(() => {
    const setLanguage = async () => {
      // Get supported languages array safely
      const supportedLngs = i18n.options.supportedLngs as string[] | undefined;
      let language = lang || i18nInstance.language;
      
      // Ensure language is a string and is supported
      if (!language || !supportedLngs?.includes(language)) {
        // Get fallback language as string
        language = (i18n.options.fallbackLng as string) || 'en';
        navigate(`/${language}`, { replace: true }); // Redirect to default lang
      }

      if (i18nInstance.language !== language) {
        await i18nInstance.changeLanguage(language);
      }
    };

    setLanguage();
  }, [lang, i18nInstance, navigate]);

  return <Outlet />;
};

export default I18nWrapper;
