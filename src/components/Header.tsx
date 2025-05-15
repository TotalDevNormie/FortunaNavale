import { Link, useLocation, useNavigate, useParams } from "react-router"; // Use react-router-dom
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react"; // Using Globe icon for language
import { supportedLngs } from "~/i18n";
import LogoFull from "~/assets/logo-full.svg";
import Shape from "~/assets/header-shape.svg";
import { Button } from "./ui/button"; // Keep if needed for other buttons
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"; // shadcn Select components
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { use } from "react";

// Define your supported languages (centralize this in a config file ideally)

export const pages = ["home", "about", "services", "projects", "vacancies"];

export default function Header() {
  const { i18n, t } = useTranslation(); // Add t if you need to translate menu items etc.
  const navigate = useNavigate();
  const location = useLocation(); // Get location object
  const params = useParams<{ lang?: string; "*"?: string }>(); // Get current lang and wildcard route

  // Determine the current language from the URL or fallback
  // Ensure fallbackLng is correctly configured in your i18next setup
  const currentLangCode =
    params.lang || (i18n.resolvedLanguage as string) || "en"; // More robust fallback

  const currentLanguage = supportedLngs.find(
    (lang) => lang === currentLangCode
  );

  const currentPage = location.pathname.split('/').pop() || "home";

  const handleLanguageChange = (newLangCode: string) => {
    if (newLangCode !== currentLangCode) {
      // Construct the new path preserving the rest of the URL
      const currentPathWithoutLang = params["*"] || "";
      // Ensure leading slash for the rest of the path if it exists
      const restOfPath = currentPathWithoutLang
        ? `/${currentPathWithoutLang}`
        : "";
      const newPath = `/${newLangCode}${restOfPath}`;

      // Change i18next language first
      i18n.changeLanguage(newLangCode).then(() => {
        // Then navigate. Use replace to avoid adding multiple language changes to history
        navigate(newPath, { replace: true });
      });
    }
  };


  return (
    <header className="fixed w-full pt-2 backdrop-blur-sm bg-secondary/30 isolate z-50">
      <div className="absolute top-0 left-0 isolate py-2 pl-4 pr-[10rem]">
        <img
          src={Shape}
          alt=""
          className="absolute top-[-2rem] left-0 w-[200%] h-[240%] object-fill -z-10"
        />
        <Link to={`/${currentLangCode}`}>
          {/* Link logo to current language home */}
          <img src={LogoFull} alt="Fortuna Navale Logo" className="h-14" />{" "}
          {/* Added specific alt text */}
        </Link>
      </div>
      {/* Adjusted container for spacing */}
      <div className="w-fit-container mx-auto flex items-center gap-4 py-4 justify-between">
        <NavigationMenu>
          <NavigationMenuList>
            {pages.map((page, index) => (
              <NavigationMenuItem key={index}>
                <Link to={`/${currentLangCode}/${page === "home" ? "" : page}`}>
                  <NavigationMenuLink className={currentPage === page ? "font-bold text-primary" : ""}>{t(`menu.${page}`)}</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex gap-2 items-center">
          <Select value={currentLangCode} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[5rem] text-background gap-2 uppercase">
              <SelectValue
                placeholder={t("menu.language") || "Language"}
                className="uppercase text-background"
              >
                {currentLanguage}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="w-[5rem]">
              {supportedLngs.map((lang) => (
                <SelectItem key={lang} value={lang} className="uppercase">
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button>
            <Link to={`/${currentLangCode}/contact`}>{t("menu.contact")}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
