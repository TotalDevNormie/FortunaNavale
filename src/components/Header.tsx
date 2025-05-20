import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supportedLngs } from "~/i18n";
import LogoFull from "~/assets/logo-full.svg";
import Shape from "~/assets/header-shape.svg";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export const pages = ["home", "about", "services", "projects", "vacancies"];

export default function Header() {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ lang?: string }>(); // No need for '*' here
  const [isOpen, setIsOpen] = useState(false);

  const currentLangCode =
    params.lang || (i18n.resolvedLanguage as string) || "en";

  const currentLanguage = supportedLngs.find(
    (lang: string) => lang === currentLangCode
  );

  const currentPage = location.pathname.split("/").pop() || "home";

  const handleLanguageChange = (newLangCode: string) => {
    if (newLangCode !== currentLangCode) {
      // Get the current path, excluding the language prefix
      const currentPath = location.pathname;
      const pathSegments = currentPath
        .split("/")
        .filter((segment) => segment !== ""); // Split and remove empty strings
      const currentLangSegment = pathSegments[0]; // The first segment should be the language

      let restOfPath = "";
      if (pathSegments.length > 1) {
        restOfPath = "/" + pathSegments.slice(1).join("/"); // Join the rest of the segments
      } else if (currentPath === `/${currentLangCode}`) {
        restOfPath = ""; // Handle the case of being on the root language path (e.g., /en)
      } else if (currentPath === "/") {
        restOfPath = ""; // Handle the root path before redirect
      }

      const newPath = `/${newLangCode}${restOfPath}`;

      i18n.changeLanguage(newLangCode).then(() => {
        navigate(newPath, { replace: true });
        setIsOpen(false);
      });
    }
  };

  return (
    <header className="fixed w-full pt-2 backdrop-blur-sm bg-secondary/40 isolate z-50">
      <div className="absolute top-0 left-0 isolate py-2 pl-4 pr-[10rem]">
        <img
          src={Shape}
          alt=""
          className="absolute top-[-2rem] left-0 w-[200%] h-[240%] object-fill -z-10"
        />
        <Link to={`/${currentLangCode}`}>
          <img src={LogoFull} alt="Fortuna Navale Logo" className="h-14" />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="w-fit-container mx-auto hidden lg:flex items-center gap-4 py-4 justify-between">
        <NavigationMenu className="w-full max-w-auto justify-stretch *:w-full">
          <NavigationMenuList className="w-full justify-between gap-4 pr-16">
            {pages.map((page, index) => (
              <NavigationMenuItem key={index}>
                <Link to={`/${currentLangCode}/${page === "home" ? "" : page}`}>
                  <NavigationMenuLink
                    className={
                      currentPage === page ? "font-bold text-primary" : ""
                    }
                  >
                    {t(`menu.${page}`)}
                  </NavigationMenuLink>
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
              {supportedLngs.map((lang: string) => (
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

      {/* Mobile Navigation */}
      <div className="lg:hidden flex justify-end p-4">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-background cursor-pointer"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[80%] sm:w-[350px] bg-secondary/40 backdrop-blur-sm border-none"
          >
            <div className="flex flex-col h-full p-8">
              <div className="flex-1 py-6">
                <nav className="flex flex-col gap-4">
                  {pages.map((page) => (
                    <Link
                      key={page}
                      to={`/${currentLangCode}/${page === "home" ? "" : page}`}
                      className={`text-lg py-2 ${
                        currentPage === page
                          ? "font-bold text-primary"
                          : "text-background"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {t(`menu.${page}`)}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="py-4 flex flex-col gap-4">
                <div className="flex justify-center gap-4">
                  {supportedLngs.map((lang: string) => (
                    <Button
                      key={lang}
                      variant={lang === currentLangCode ? "default" : "outline"}
                      size="sm"
                      className="uppercase"
                      onClick={() => handleLanguageChange(lang)}
                    >
                      {lang}
                    </Button>
                  ))}
                </div>
                <Button className="w-full">
                  <Link
                    to={`/${currentLangCode}/contact`}
                    onClick={() => setIsOpen(false)}
                  >
                    {t("menu.contact")}
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
