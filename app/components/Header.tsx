import { Link, useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { ChevronsUpDown, Check } from "lucide-react"; // Icons for the button

import LogoFull from "~/assets/logo-full.svg";
import Shape from "~/assets/header-shape.svg";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"; // Import shadcn components
import { cn } from "~/lib/utils"; // Assuming you have a `lib/utils.ts` from shadcn setup
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";

// Define your supported languages (you might want to centralize this)
const supportedLanguages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  // Add other supported languages here
];

export default function Header() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const params = useParams<{ lang?: string; "*"?: string }>(); // Get current lang and wildcard route

  // Determine the current language from the URL or fallback
  const currentLangCode = params.lang || (i18n.options.fallbackLng as string);
  const currentLanguage = supportedLanguages.find(
    (lang) => lang.code === currentLangCode
  );

  const handleLanguageChange = (newLangCode: string) => {
    if (newLangCode !== currentLangCode) {
      // Construct the new path preserving the rest of the URL
      const currentPathWithoutLang = params["*"] || "";
      const newPath = `/${newLangCode}/${currentPathWithoutLang}`;
      // Use replace to avoid adding multiple language changes to history
      navigate(newPath.replace(/\/$/, ""), { replace: true }); // Remove trailing slash if exists
    }
  };

  return (
    <header className="fixed w-full pt-2 backdrop-blur-sm isolate z-50">
      <div className="absolute top-0 left-0 isolate py-2 pl-4 pr-[10rem]">
        <img
          src={Shape}
          alt=""
          className="absolute top-[-2rem] left-0 w-[200%] h-[240%] object-fill -z-10"
        />
        <Link to={`/${currentLangCode}`}>
          {/* Link logo to current language home */}
          <img src={LogoFull} alt="Logo" className="h-14" />
        </Link>
      </div>
      {/* Adjusted container for spacing */}
      <div className="w-fit-container flex items-center gap-2 p-4 justify-between">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="#">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Documentation
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {/* Language Seletor Dropdown */}
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          {/* Example Button - adjust as needed */}
          <Button>Alijdfo sjoiao p</Button>
        </div>
      </div>
    </header>
  );
}
