import { useTranslation } from "react-i18next";
import WavyContainer from "~/components/WavyConatiner";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Link } from "react-router";
import Heading from "~/components/Heading";

interface ServiceSection {
  title: string;
  content: string;
  list: string[];
}

interface ContactPerson {
  name: string;
  position: string;
}

interface Reason {
  title: string;
  content: string;
  image: string;
}

interface OurMission {
  title: string;
  content: string;
}

export default function Home() {
  const { t } = useTranslation();

  const aboutUsContent = t("page.about.aboutUs.content", {
    returnObjects: true,
  });

  const ourMission = t("page.about.ourMission", {
    returnObjects: true,
  }) as OurMission[];

  const reasons = t("page.about.whyChooseUs.sections", {
    returnObjects: true,
  }) as Reason[];

  https: return (
    <div className="">
      <Heading image="https://drive.google.com/thumbnail?id=1hM4m1F2jY0ZSouWQYhYb1Ylpu6WJV-5A&sz=w1500">
        {t("page.about.title")}
      </Heading>

      <WavyContainer className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 py-16">
        <div className="flex items-center justify-center lg:justify-start">
          <img
            src="https://drive.google.com/thumbnail?id=19LIm62cwvxbOleREuXLyp6S8QgdlMu_y&sz=w500"
            className="w-full h-64 object-cover"
          />
        </div>
        <div>
          <h2 className="font-bold text-2xl uppercase text-center text-secondary-100 font-mono mb-4">
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
            ourMission.map((mission, index) => (
              <>
                <h2 className="font-bold text-accent-100 uppercase font-mono text-2xl">
                  {mission.title}
                </h2>
                <p className="ml-8">{mission.content}</p>
              </>
            ))}
        </div>
      </WavyContainer>

      <WavyContainer end className="py-16 flex flex-col">
        <h2 className="font-bold text-3xl uppercase mb-8 text-secondary-100 font-mono">
          {t("page.about.whyChooseUs.title")}
        </h2>
        <div className="grid grid-cols-4 gap-8 min-h-[25rem]">
          {Array.isArray(reasons) &&
            reasons.map((reason) => (
              <div className="relative">
                <img
                  src={reason.image}
                  className={`w-full h-full object-cover block`}
                />
                <div className="absolute grid place-items-center inset-0 bg-black/60 text-white text-center opacity-0 hover:opacity-100 duration-300">
                  <div>
                    <span className="font-bold mb-2 text-l font-mono text-center block">
                      {reason.title}
                    </span>
                    <p>{reason.content}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="grid my-16">
          <h2 className="font-bold uppercase text-2xl text-secondary-100 mb-8 font-mono">
            {t("page.about.whyChooseUs.joinUs")}
          </h2>
          <p className="mb-8">{t("page.about.whyChooseUs.content")}</p>
          <Link
            to="/vacancies"
            className="bg-primary uppercase text-white px-8 py-3 justify-self-end rounded-md text-lg"
          >
            {t("page.about.whyChooseUs.cta")}
          </Link>
        </div>
      </WavyContainer>
    </div>
  );
}
