import { useTranslation } from "react-i18next";
import WavyContainer from "~/components/WavyConatiner";
import { Button } from "~/components/ui/button";
import Heading from "../components/Heading";
import Map from "~/components/Map";
import { Link } from "react-router";
import React, { useRef, useEffect, useState } from "react"; // Added React and hooks
import useIsMobile from "~/hooks/useIsMobile"; // Import the hook
import { cn } from "~/lib/utils";

// Define types
interface ServiceSection {
  title: string;
  content: string;
  list: string[];
}

interface Project {
  image: string;
  content: string;
}

// ProjectItemProps interface (if ProjectItem is in this file)
interface ProjectItemProps {
  project: Project;
  isMobile: boolean;
}

// ProjectItem component (can be here or imported)
const ProjectItem: React.FC<ProjectItemProps> = ({ project, isMobile }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const currentRef = itemRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.9 }
    );

    observer.observe(currentRef);
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const shouldForceHover = isMobile && isInView;

  return (
    <div
      ref={itemRef}
      className={cn(
        "relative group overflow-hidden flex min-h-[20rem]",
        shouldForceHover && "force-mobile-hover"
      )}
    >
      <img
        src={project.image}
        alt="Project"
        className="absolute inset-0 object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 group-[.force-mobile-hover]:scale-105"
      />
      <div className="relative z-10 bg-black/60 text-white p-8 text-center opacity-0 group-hover:opacity-100 group-[.force-mobile-hover]:opacity-100 duration-300 grid place-items-center">
        <p>{project.content}</p>
      </div>
    </div>
  );
};

export default function Home() {
  const { t, i18n } = useTranslation();
  const isMobile = useIsMobile(); // Use the hook

  const aboutUsContent = t("page.home.aboutUs.content", {
    returnObjects: true,
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
          <span className="text-[clamp(2rem,10vw,7rem)] leading-[clamp(2rem,10vw,7rem)] font-mono text-center text-accent-100">
            {t("page.home.title.highlight")}
          </span>
          <span className="text-[clamp(1.5rem,5vw,3rem)] leading-[clamp(2rem,5vw,4rem)] font-sans text-center  text-background text-bold,">
            {t("page.home.title.middle")}
          </span>
          <span className="text-[clamp(1.5rem,3vw,4rem)] leading-[clamp(2rem,5vw,4rem)] text-center font-semibold font-sans tracking-widest text-background">
            {t("page.home.title.lowlight")}
          </span>
        </div>
      </Heading>
      <WavyContainer className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 py-16">
        <div className="flex items-center justify-center lg:justify-start">
          <img
            src="https://drive.google.com/thumbnail?id=19LIm62cwvxbOleREuXLyp6S8QgdlMu_y&sz=w500"
            className="w-full h-64 object-cover"
            alt=""
          />
        </div>
        <div>
          <h2 className="text-2xl uppercase text-center text-secondary-100 font-mono mb-4">
            {t("page.about.aboutUs.title")}
          </h2>
          {Array.isArray(aboutUsContent) ? (
            aboutUsContent.map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))
          ) : (
            <p>{t("page.home.aboutUs.content")}</p>
          )}
        </div>
      </WavyContainer>
      <WavyContainer secondary className="flex flex-col gap-8 py-16">
        <h2 className="uppercase font-mono text-3xl text-accent-100 text-center mb-8">
          {t("page.home.services.title")}
        </h2>
        <div className="grid md:grid-cols-2 gap-16 mt-[2rem] count-service">
          {Array.isArray(serviceSections) &&
            serviceSections.map((section, index) => (
              <ServiceCard
                key={section.title || index}
                service={section}
                serviceNumber={index + 1}
              />
            ))}
        </div>
        <Button className="self-end">
          <Link to={`/${i18n.language}/contact`}>
            {t("buttons.orderService")}
          </Link>
        </Button>
      </WavyContainer>
      <WavyContainer className="flex flex-col gap-8">
        <h2 className="uppercase font-mono text-3xl text-secondary text-center mb-8">
          {t("page.home.projects.title")}
        </h2>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-8">
          {Array.isArray(projects) &&
            projects.map((project) => (
              <ProjectItem
                key={project.content}
                project={project}
                isMobile={isMobile}
              />
            ))}
        </div>
        <Button className="self-end cursor-pointer">
          <Link to={`/${i18n.language}/projects`}>{t("buttons.more")}</Link>
        </Button>
      </WavyContainer>
      <WavyContainer secondary className="pb-32">
        <h2 className="font-mono uppercase text-3xl text-accent-100 text-center mb-32">
          {t("page.home.partners.title")}
        </h2>
        <div className="flex justify-around flex-wrap gap-8 h-[5rem]">
          <img src="https://drive.google.com/thumbnail?id=1sM3fK7ylRzMfgw4-uHZyDJ0cqc_5ogCB&sz=w1000" alt="" />
          <img src="https://drive.google.com/thumbnail?id=14KGo1UxToVzLTIufyVSgeMF6Nb7yArmP&sz=w1000" alt="" />
        </div>
      </WavyContainer>
      <Map />
    </div>
  );
}

// ServiceCard component remains unchanged
const ServiceCard = ({
  service,
  serviceNumber,
}: {
  service: ServiceSection;
  serviceNumber: number;
}) => {
  return (
    <div
      className="text-foreground increment-service relative isolate rounded-[1rem] p-4 before:absolute before:text-background before:text-2xl before:w-full before:h-full before:p-4 before:rounded-[1rem] before:-z-20 before:top-[-3rem] last:before:bg-accent-100 first:before:bg-accent-100 before:bg-primary lg:before:left-[-2.5rem] before:left-[-1rem] before:content-['0'_counter(service)_'.'] after:content-[''] after:absolute after:bg-background after:rounded-[1rem] after:inset-0 after:-z-10"
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
