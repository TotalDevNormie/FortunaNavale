import { LiaFacebookF, LiaLinkedin, LiaTelegram } from "react-icons/lia";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  type Contact = {
    name: string;
    position: string;
    email: string;
    phone: string;
  };

  const contacts = t("contact.people", { returnObjects: true }) as
    | Contact[]
    | string;

  const menuItems = [
    { key: "home", label: t("menu.home") },
    { key: "aboutUs", label: t("menu.about") },
    { key: "services", label: t("menu.services") },
    { key: "projects", label: t("menu.projects") },
    { key: "vacancies", label: t("menu.vacancies") },
    { key: "contact", label: t("menu.contact") },
  ];

  const socialLinks = {
    facebook: "#",
    linkedin: "#",
    telegram: "#",
  };

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="mx-8">
        <div className="w-fit-container mx-auto">
          <div className="flex flex-col md:flex-row justify-between py-16 gap-12 md:gap-8">
            <div className="flex gap-16 items-start justify-between">
              <img
                src="/logo.png"
                className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 object-contain" // Adjusted size and added shrink
                alt="Fortuna Navale Logo"
              />
            </div>

            <nav>
              <ul className="flex flex-col gap-2 w-max ">
                {menuItems.map((item) => (
                  <li key={item.key}>
                    <a
                      href={`#${item.key}`}
                      className="text-sm font-semibold hover:text-primary uppercase" // Added styling
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 text-sm">
              {Array.isArray(contacts) &&
                contacts?.map((contact, index) => (
                  <div key={index}>
                    <p className="font-semibold">
                      {contact.name} - {contact.position}
                    </p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="block text-primary hover:text-orange-300 break-all"
                    >
                      {contact.email}
                    </a>
                    <a
                      href={`tel:${contact.phone.replace(/\s/g, "")}`} // Remove spaces for tel link
                      className="block text-primary hover:text-orange-300"
                    >
                      {contact.phone}
                    </a>
                  </div>
                ))}
            </div>

          </div>
          <div className="flex justify-between pb-8">
            <p className="text-sm text-secondary-foreground/80">
              &copy; 2025 Fortuna Navale, website made by <a className="underline" target="_blank" href="https://www.firsof.com">Firsof</a>
            </p>
            <div className="flex flex-row gap-4 items-center justify-center md:pt-0">
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-primary hover:text-orange-300"
              >
                <LiaFacebookF size={20} />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-primary hover:text-orange-300"
              >
                <LiaLinkedin size={24} />
              </a>
              <a
                href={socialLinks.telegram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="text-primary hover:text-orange-300"
              >
                <LiaTelegram size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
