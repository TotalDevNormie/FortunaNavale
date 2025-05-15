import { useTranslation } from "react-i18next";
import WavyContainer from "~/components/WavyConatiner";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import Heading from "../components/Heading";

// Define types (as shown above)
interface ServiceSection {
  title: string;
  content: string;
  list: string[];
}

interface Project {
  image: string;
  content: string;
}

export default function Home() {
  const { t } = useTranslation();

  const aboutUsContent = t("page.home.aboutUs.content", {
    returnObjects: true, // <- Important!
  });

  const serviceSections = t("page.home.services.sections", {
    returnObjects: true,
  }) as ServiceSection[];

  const projects = t("page.home.projects.sections", {
    returnObjects: true,
  }) as Project[];

  return (
    <div>
      <Heading image="https://drive.google.com/thumbnail?id=1izqiNhktvr4KjyZV6w4srve2DYaO7Na2&sz=w1500">
        <div className="flex flex-col items-center gap-4">
          <span className="text-[clamp(1.5rem,10vw,7rem)] leading-15 font-mono text-accent-100">
            {t("page.home.title.highlight")}
          </span>
          <span className="text-[clamp(1rem,5vw,4rem)] leading-30 font-bold font-sans text-background text-bold,">
            {t("page.home.title.middle")}
          </span>
          <span className="text-[clamp(1rem,3vw,3rem)] leading-15 font-semibold font-sans tracking-widest text-background">
            {t("page.home.title.lowlight")}
          </span>
        </div>
      </Heading>
      {/* --- About Us Section --- */}
      <WavyContainer className="grid grid-cols-[1fr_2fr] gap-8">
        <div className="flex items-center">
          <img
            src="https://drive.google.com/thumbnail?id=19LIm62cwvxbOleREuXLyp6S8QgdlMu_y&sz=w500"
            alt={t("page.home.aboutUs.title")}
            className="w-full h-64 object-cover"
          />
        </div>
        <div>
          <h2 className="font-bold uppercase font-mono text-3xl text-secondary text-center mb-4">
            {t("page.home.aboutUs.title")}
          </h2>
          {/* Iterate over the fetched array */}
          {Array.isArray(aboutUsContent) ? (
            aboutUsContent.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))
          ) : (
            <p>{t("page.home.aboutUs.content")}</p>
          )}
        </div>
      </WavyContainer>
      <WavyContainer secondary className="flex flex-col gap-8">
        <h2 className="font-bold uppercase font-mono text-3xl text-accent-100 text-center mb-8">
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
      <WavyContainer className="flex flex-col gap-8">
        <h2 className="uppercase font-bold font-mono text-3xl text-secondary text-center mb-8">
          {t("page.home.projects.title")}
        </h2>
        <div className="grid grid-cols-3 gap-8 h-[30rem]">
          {Array.isArray(projects) &&
            projects.map((project, index) => (
              <div className="relative">
                <img
                  src={project.image}
                  className={`w-full h-full object-cover block`}
                />
                <p className="absolute grid place-items-center inset-0 bg-black/60 text-white p-8 text-center opacity-0 hover:opacity-100 duration-300">
                  {project.content}
                </p>
              </div>
            ))}
        </div>
        <Button className="self-end">{t("buttons.more")}</Button>
      </WavyContainer>
      <WavyContainer secondary className="pb-32">
        <h2 className="font-bold font-mono uppercase text-3xl text-accent-100 text-center mb-32">
          {t("page.home.partners.title")}
        </h2>

        <div className="grid grid-cols-3 gap-8 h-[10rem]">
          <div className="bg-background"></div>

          <div className="bg-background"></div>

          <div className="bg-background"></div>
        </div>
      </WavyContainer>
      <WavyContainer end className="pb-32">
        <h2 className="font-bold font-mono uppercase text-3xl text-secondary text-center mb-8">
          {t("page.home.map.title")}
        </h2>
        <div className="relative mb-8">
          <img src="/europe-map.png" alt="Map of Europe" className="mx-auto" />
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
              hey
            </PopoverContent>
          </Popover>
        </div>
      </WavyContainer>
    </div>
  );
}

const ServiceCard = ({
  service,
  serviceNumber,
}: {
  service: ServiceSection;
  serviceNumber: number;
}) => {
  return (
    <div
      className="text-foreground increment-service relative isolate rounded-[1rem] p-4 before:absolute before:text-background before:text-2xl before:w-full before:h-full before:p-4 before:rounded-[1rem] before:-z-20 before:top-[-3rem] last:before:bg-accent-100 first:before:bg-accent-100 before:bg-primary before:left-[-2.5rem] before:content-['0'_counter(service)_'.'] after:content-[''] after:absolute after:bg-background after:rounded-[1rem] after:inset-0 after:-z-10"
      data-service-number={serviceNumber}
    >
      <h3 className="font-bold">{service.title}</h3>
      <p>{service.content}</p>

      <ul>
        {Array.isArray(service.list) &&
          service.list.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    </div>
  );
};
