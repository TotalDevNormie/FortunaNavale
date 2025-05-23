import { useTranslation } from "react-i18next";
import WavyContainer from "~/components/WavyConatiner";
import { Link } from "react-router-dom";
import Heading from "~/components/Heading";
import React, { useRef, useEffect, useState } from "react"; // Added React and hooks
import useIsMobile from "~/hooks/useIsMobile"; // Import the hook
import { cn } from "~/lib/utils";

// Interfaces
interface Reason {
  title: string;
  content: string;
  image: string;
}

interface OurMission {
  title: string;
  content: string;
}

// ReasonItemProps interface (if ReasonItem is in this file)
interface ReasonItemProps {
  reason: Reason;
  isMobile: boolean;
}

// ReasonItem component (can be here or imported)
const ReasonItem: React.FC<ReasonItemProps> = ({ reason, isMobile }) => {
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
        "relative group overflow-hidden",
        shouldForceHover && "force-mobile-hover"
      )}
    >
      <img
        src={reason.image}
        alt={reason.title}
        className="w-full h-full object-cover block group-hover:scale-105 group-[.force-mobile-hover]:scale-105 duration-300"
      />
      <div className="absolute grid place-items-center p-4 inset-0 bg-black/60 text-white text-center opacity-0 group-hover:opacity-100 group-[.force-mobile-hover]:opacity-100 duration-300">
        <div>
          <span className="mb-2 text-l font-mono text-center block">
            {reason.title}
          </span>
          <p>{reason.content}</p>
        </div>
      </div>
    </div>
  );
};

export default function AboutPage() {
  // Assuming this is an About page
  const { t, i18n } = useTranslation();
  const isMobile = useIsMobile(); // Use the hook

  const aboutUsContent = t("page.about.aboutUs.content", {
    returnObjects: true,
  });

  const ourMission = t("page.about.ourMission", {
    returnObjects: true,
  }) as OurMission[];

  const reasons = t("page.about.whyChooseUs.sections", {
    returnObjects: true,
  }) as Reason[];

  return (
    <div>
      <Heading image="https://drive.google.com/thumbnail?id=1hM4m1F2jY0ZSouWQYhYb1Ylpu6WJV-5A&sz=w1500">
        {t("page.about.title")}
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

      <WavyContainer secondary className="flex flex-col gap-8">
        <div className="flex flex-col gap-12">
          {Array.isArray(ourMission) &&
            ourMission.map((mission) => (
              <div key={mission.title}>
                <h2 className="text-accent-100 uppercase font-mono text-2xl mb-8">
                  {mission.title}
                </h2>
                <p className="ml-16">{mission.content}</p>
              </div>
            ))}
        </div>
      </WavyContainer>

      <WavyContainer end className="py-16 flex flex-col">
        <h2 className="text-3xl uppercase mb-8 text-secondary-100 font-mono">
          {t("page.about.whyChooseUs.title")}
        </h2>
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-8 min-h-[25rem]">
          {Array.isArray(reasons) &&
            reasons.map((reason) => (
              <ReasonItem
                key={reason.title}
                reason={reason}
                isMobile={isMobile}
              />
            ))}
        </div>

        <div className="grid my-16">
          <h2 className="uppercase text-2xl text-secondary-100 mb-8 font-mono">
            {t("page.about.whyChooseUs.joinUs")}
          </h2>
          <p className="mb-8">{t("page.about.whyChooseUs.content")}</p>
          <Link
            to={"/" + i18n.language + "/vacancies"}
            className="bg-primary text-white px-8 py-3 md:justify-self-end text-center rounded-md"
          >
            {t("page.about.whyChooseUs.cta")}
          </Link>
        </div>
      </WavyContainer>
    </div>
  );
}
