import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="min-h-screen grid place-items-center bg-[url(/background.png)] bg-cover bg-no-repeat">
        <h1 className="flex flex-col items-center gap-4">
          <span className="text-6xl font-mono text-accent-foreground">
            {t("page.home.title.highlight")}
          </span>
          <span className="text-4xl text-background text-bold">
            {t("page.home.title.middle")}
          </span>
          <span className="text-2xl text-background">
            {t("page.home.title.lowlight")}
          </span>
        </h1>
      </div>
    </div>
  );
}
