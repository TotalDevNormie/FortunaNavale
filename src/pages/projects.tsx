import { useTranslation } from "react-i18next";
import WavyContainer from "~/components/WavyConatiner";
import projectImages from "~/images/projects.json";
import Heading from "../components/Heading";

export default function Projects() {
  const { t } = useTranslation();

  const projects = t("page.projects.content", {
    returnObjects: true,
  }) as string[];

  return (
    <div>
      <Heading image="https://drive.google.com/thumbnail?id=1EbQXKlS39nCHepXeM2FwQO6okOUbzJLy&sz=w1500">
        {t("page.projects.title")}
      </Heading>

      <WavyContainer end className="grid grid-cols-2 gap-8 pb-16">
        {projects.map((project, index) => (
          <div
            key={index}
            className="min-h-[30rem] flex items-end bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(${projectImages[index]})` }}
          >
            <p className="text-background p-4 pt-8 bg-gradient-to-t from-black/70 to-transparent from-70%">
              {project}
            </p>
          </div>
        ))}
      </WavyContainer>
    </div>
  );
}
