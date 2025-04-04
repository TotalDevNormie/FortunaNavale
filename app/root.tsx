import React, { useEffect } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useParams,
  useNavigate,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import Header from "./components/Header";
import i18n from "../i18n"; // Import your i18n configuration
import { useTranslation } from "react-i18next"; // Import useTranslation

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { i18n: i18nInstance } = useTranslation(); // Get i18n instance

  const { lang } = useParams<{ lang?: string }>();
  const navigate = useNavigate();

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

  useEffect(() => {
    // Update lang attribute on html tag
    console.log(i18nInstance.language);

    document.documentElement.lang = i18nInstance.language;
  }, [i18nInstance.language]);

  return (
    <html lang={i18nInstance.language}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <main>{children}</main>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
