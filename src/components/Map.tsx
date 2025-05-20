import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import WavyContainer from "./WavyConatiner";
import { useTranslation } from "react-i18next";
import jobs from "~/jobs.json";
import locations from "~/locations.json";
import { Link } from "react-router";

export default function Map() {
  const { t, i18n } = useTranslation();
  const vacanciesPerCity = jobs.reduce(
    (acc: { [key: string]: number }, job) => {
      if (!acc[job.city]) {
        acc[job.city] = 0;
      }
      acc[job.city]++;
      return acc;
    },
    {} as { [key: string]: number }
  );
  console.log(locations);
  return (
    <WavyContainer end className="pb-32">
      <h2 className="font-bold font-mono uppercase text-3xl text-secondary text-center mb-8">
        {t("page.home.map.title")}
      </h2>
      <div className="relative mb-8">
        <img src="/europe-map.png" alt="Map of Europe" className="mx-auto" />

        {locations.map((location) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className={`rounded-full text-xl cursor-pointer py-5 absolute hover:scale-125`}
                style={{
                  top: `${location.position[0]}%`,
                  left: `${location.position[1]}%`,
                }}
              >
                <Plus size={32} strokeWidth={1.5} />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="bg-primary text-primary-foreground"
              side="top"
              align="end"
              sideOffset={5}
            >
              <h3 className="text-center text-xl font-bold">
                {t(`page.vacancies.countries.${location.country}`)}
              </h3>
              {location?.cities?.map((city) => (
                <div key={city.name} className="mt-4">
                  <h4 className="font-bold">
                    {t(`page.vacancies.cities.${city.name}`)}
                  </h4>
                  <p className="ml-4">{city.email}</p>
                  <p className="ml-4">{city.phone}</p>
                  {vacanciesPerCity[city.name] && (
                    <Link
                      to={"/" + i18n.language + "/vacancies"}
                      className="ml-4 underline"
                    >
                      {t("page.vacancies.title")}: {vacanciesPerCity[city.name]}{" "}
                      {t(
                        `page.vacancies.open${
                          vacanciesPerCity[city.name] === 1 ? "-single" : ""
                        }`
                      )}
                    </Link>
                  )}
                </div>
              ))}
            </PopoverContent>
          </Popover>
        ))}
      </div>
    </WavyContainer>
  );
}
