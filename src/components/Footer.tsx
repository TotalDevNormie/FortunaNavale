import { useTranslation } from "react-i18next"; // Assuming react-i18next
import { FaFacebookF, FaLinkedinIn, FaTelegramPlane } from "react-icons/fa";

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
      <div className="w-fit-container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between py-16 gap-12 md:gap-8">
          <div className="flex gap-8 items-start">
            <img
              src="/logo.png" // Ensure path is correct
              className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0" // Adjusted size and added shrink
              alt="Fortuna Navale Logo"
            />
            <nav>
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.key}>
                    <a
                      href={`#${item.key}`} // Basic anchor link, adjust as needed
                      className="text-sm font-semibold hover:text-primary uppercase" // Added styling
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Center Section: Contacts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 text-sm">
            {Array.isArray(contacts) &&
              contacts?.map((contact, index) => (
                <div key={index}>
                  <p className="font-semibold">
                    {contact.name} - {contact.position}
                  </p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="block text-orange-400 hover:text-orange-300 break-all"
                  >
                    {contact.email}
                  </a>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`} // Remove spaces for tel link
                    className="block text-orange-400 hover:text-orange-300"
                  >
                    {contact.phone}
                  </a>
                </div>
              ))}
          </div>

          {/* Right Section: Social Icons */}
        </div>
        <div className="flex justify-between pb-8">
          <p className="text-sm text-secondary-foreground/80">
            &copy; 2025 Fortuna Navale
          </p>
          <div className="flex flex-row gap-4 items-center md:items-end pt-4 md:pt-0">
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-orange-400 hover:text-orange-300"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-orange-400 hover:text-orange-300"
            >
              <FaLinkedinIn size={24} />
            </a>
            <a
              href={socialLinks.telegram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="text-orange-400 hover:text-orange-300"
            >
              <FaTelegramPlane size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
