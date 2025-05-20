import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router";

export default function NotFound() {
  const { i18n, t } = useTranslation();
  const params = useParams<{ lang?: string; "*"?: string }>();

  const currentLangCode =
    params.lang || (i18n.resolvedLanguage as string) || "en";
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url(https://drive.google.com/thumbnail?id=16JUWRH-IrOx59RZi3hL3NcL_ulMqLwLy&sz=w2000)",
      }}
    >
      <h1 className="text-[20vw]/[1.5ch] text-center flex gap-20 tracking-[-0.05em]  text-accent font-mono relative">
        <span>4</span>
        <span>0</span>
        <span>4</span>
        <img
          src="/logo.png"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-1 w-[18vw] object-contain"
        />
      </h1>
      <h2 className="text-[5vw] font-bold text-center text-background font-mono">
        {t("notFound.title")}
      </h2>
      <h3 className="text-center text-background text-[1.5vw] font-mono">
        {t("notFound.subtitle")}
        <Link to={`/${currentLangCode}`} className="text-accent">
          {t("notFound.page")}
        </Link>
      </h3>
    </div>
  );
}
