import { useTranslation } from "react-i18next";
import WavyContainer from "~/components/WavyConatiner";
import Ship from "./ship.jpg";
import Project1 from "./projects-1.jpg";
import Project2 from "./projects-2.jpg";
import Project3 from "./projects-3.jpg";
import Europe from "./europe-map.png";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

// Define types (as shown above)
interface ServiceSection {
  title: string;
  content: string;
  list: string[];
}

interface ContactPerson {
  name: string;
  position: string;
}

export default function Home() {
  const { t } = useTranslation();

  // --- Correctly fetch arrays from i18n ---

  // Fetch About Us content array
  const aboutUsContent = t("page.home.aboutUs.content", {
    returnObjects: true, // <-- Important!
  });

  // Fetch Services sections array
  const serviceSections = t("page.home.services.sections", {
    returnObjects: true, // <-- Important!
  }) as ServiceSection[]; // Type assertion (ensure data matches)

  // Fetch Contact people array
  const contactPeople = t("page.home.contact.people", {
    returnObjects: true, // <-- Important!
  }) as ContactPerson[]; // Type assertion (ensure data matches)

  // --- Render Logic ---

  return (
    <div>
      {/* --- Hero Section --- */}
      <div className="min-h-[70vh] grid place-items-center bg-[url(/background.png)] bg-cover bg-no-repeat">
        <h1 className="flex flex-col items-center gap-4">
          <span className="text-[clamp(1.5rem,10vw,7rem)] leading-15 font-mono text-accent-100">
            {t("page.home.title.highlight")}
          </span>
          <span className="text-[clamp(1rem,5vw,4rem)] leading-30 font-bold text-background text-bold,">
            {t("page.home.title.middle")}
          </span>
          <span className="text-[clamp(1rem,3vw,3rem)] leading-15 font-semibold tracking-widest text-background">
            {t("page.home.title.lowlight")}
          </span>
        </h1>
      </div>

      {/* --- About Us Section --- */}
      <WavyContainer className="grid grid-cols-[1fr_2fr] gap-8">
        <div className="flex items-center">
          <img
            src={Ship}
            alt={t("page.home.aboutUs.title")}
            className="w-full"
          />
        </div>
        <div>
          <h2 className="font-mono text-3xl text-secondary text-center mb-4">
            {t("page.home.aboutUs.title")}
          </h2>
          {/* Iterate over the fetched array */}
          {Array.isArray(aboutUsContent) ? (
            aboutUsContent.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))
          ) : (
            // Fallback if it's not an array (e.g., translation missing)
            <p>{t("page.home.aboutUs.content")}</p>
          )}
        </div>
      </WavyContainer>

      {/* --- Services Section --- */}
      <WavyContainer secondary className="flex flex-col gap-8">
        <h2 className="font-mono text-3xl text-accent-100 text-center mb-8">
          {t("page.home.services.title")}
        </h2>
        <div className="grid grid-cols-2 gap-16 mt-[2rem] count-service">
          {/* Iterate over the fetched serviceSections array */}
          {Array.isArray(serviceSections) &&
            serviceSections.map((section, index) => (
              <ServiceCard
                // Use a unique identifier from the data if possible, otherwise index
                key={section.title || index}
                service={section} // Pass the whole section object
                serviceNumber={index + 1}
              />
            ))}
        </div>
        <Button className="self-end">{t("buttons.orderService")}</Button>
      </WavyContainer>

      {/* --- Projects Section --- */}
      <WavyContainer className="flex flex-col gap-8">
        <h2 className="font-mono text-3xl text-secondary text-center mb-8">
          {t("page.home.projects.title")}
        </h2>
        <div className="grid grid-cols-3 gap-8 h-[30rem]">
          {/* Alt text could potentially come from i18n array if needed */}
          <img
            src={Project1}
            className="object-cover h-full w-full block"
            alt={t("page.home.projects.title") + " 1"}
          />
          <img
            src={Project2}
            className="object-cover h-full w-full block"
            alt={t("page.home.projects.title") + " 2"}
          />
          <img
            src={Project3}
            className="object-cover h-full w-full block"
            alt={t("page.home.projects.title") + " 3"}
          />
        </div>
        <Button className="self-end">{t("buttons.more")}</Button>
      </WavyContainer>

      <WavyContainer secondary className="pb-32">
        <h2 className="font-mono text-3xl text-accent-100 text-center mb-32">
          {t("page.home.partners.title")}
        </h2>

        <div className="grid grid-cols-3 gap-8 h-[10rem]">
          <div className="bg-background"></div>

          <div className="bg-background"></div>

          <div className="bg-background"></div>
        </div>
      </WavyContainer>

      {/* --- Contact Section (Map - simplified rendering for people) --- */}
      {/* Note: Dynamically placing popovers on the map based on the array
                 requires more complex positioning logic beyond simple i18n.
                 This example shows fetching the data and rendering it below.
                 You might need a different strategy for the map popovers. */}
      <WavyContainer end className="pb-32">
        <h2 className="font-mono text-3xl text-secondary text-center mb-8">
          {t("page.home.contact.title")}
        </h2>
        <div className="relative mb-8">
          {/* Your existing map image */}
          <img src={Europe} alt="Map of Europe" className="mx-auto" />
          {/* Example: Render first two people as popovers (adjust positioning as needed) */}
          {Array.isArray(contactPeople) && contactPeople.length > 0 && (
            <Popover>
              <PopoverTrigger asChild>
                <Button className="rounded-full text-xl cursor-pointer py-5 absolute top-1/2 left-[25%] hover:scale-125">
                  <Plus size={32} strokeWidth={1.5} />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="bg-primary text-primary-foreground"
                side="top"
                align="end"
                sideOffset={5}
              >
                {contactPeople[0].name} - {contactPeople[0].position}
              </PopoverContent>
            </Popover>
          )}
        </div>
      </WavyContainer>
    </div>
  );
}

// --- Refactor ServiceCard ---
// No longer needs useTranslation if all data is passed via props
const ServiceCard = ({
  service,
  serviceNumber,
}: {
  service: ServiceSection; // Use the defined type
  serviceNumber: number;
}) => {
  return (
    <div
      className="text-foreground increment-service relative isolate rounded-[1rem] p-4 before:absolute before:text-background before:text-2xl before:w-full before:h-full before:p-4 before:rounded-[1rem] before:-z-20 before:top-[-3rem] last:before:bg-accent-100 first:before:bg-accent-100 before:bg-primary before:left-[-2.5rem] before:content-['0'_counter(service)_'.'] after:content-[''] after:absolute after:bg-background after:rounded-[1rem] after:inset-0 after:-z-10"
      data-service-number={serviceNumber}
    >
      {/* Access data directly from the service prop */}
      <h3 className="font-bold">{service.title}</h3>
      {/* Map over the content array within the service object */}
      <p>{service.content}</p>

      <ul>
        {Array.isArray(service.list) &&
          service.list.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    </div>
  );
};
