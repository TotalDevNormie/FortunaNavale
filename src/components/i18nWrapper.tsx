import React, { useEffect } from "react";
import { useParams, Outlet, useNavigate } from "react-router-dom";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";

interface I18nWrapperProps {
  children: React.ReactNode;
}

const I18nWrapper: React.FC<I18nWrapperProps> = ({ children }) => {
  const { lang } = useParams<{ lang?: string }>();
  const navigate = useNavigate();
  const { i18n: i18nInstance } = useTranslation();

  useEffect(() => {
    const setLanguage = async () => {
      let language = lang || i18nInstance.language || i18n.options.fallbackLng;

      if (!i18n.options.supportedLngs?.includes(language)) {
        language = i18n.options.fallbackLng as string;
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
