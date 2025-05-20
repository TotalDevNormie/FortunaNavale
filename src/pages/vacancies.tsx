import { BriefcaseBusiness, MapPin, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import Heading from "~/components/Heading";
import { Input } from "~/components/ui/input";
import FileInput from "~/components/ui/FileInput";
import { Separator } from "~/components/ui/separator";
import WavyContainer from "~/components/WavyConatiner";
import vacancies from "~/jobs.json";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";

export type JobTranslation = {
  title: string;
  excerpt: string;
  jobFormat: string;
  experience: string;
  responsibilities: string[];
  requirements: string[];
  advantages: string[];
  weOffer: string[];
};

export default function Vacancies() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const countries = t("page.vacancies.countries", { returnObjects: true }) as {
    [key: string]: string;
  };
  const employmentTypes = t("page.vacancies.employmentType", {
    returnObjects: true,
  }) as { [key: string]: string };

  const filteredJobs = vacancies.filter((job) => {
    const translatedJob = t(`page.vacancies.postings.${job.id}`, {
      returnObjects: true,
    }) as JobTranslation;

    const matchesSearch = search
      ? translatedJob.title.toLowerCase().includes(search.toLowerCase()) ||
        translatedJob.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        translatedJob.jobFormat.toLowerCase().includes(search.toLowerCase()) ||
        job.city.toLowerCase().includes(search.toLowerCase()) || // Keep searching in original job data for city/country
        job.country.toLowerCase().includes(search.toLowerCase()) // Keep searching in original job data for city/country
      : true; // If no search term, all jobs match the search filter

    const matchesLocation = location ? job.country === location : true; // If no location selected, all jobs match the location filter

    const matchesEmploymentType = employmentType
      ? job.employmentType === employmentType
      : true; // If no employment type selected, all jobs match the employment type filter

    return matchesSearch && matchesLocation && matchesEmploymentType;
  });

  return (
    <div>
      <Heading image="https://drive.google.com/thumbnail?id=18VVeyPmAFaxnwq32UXJqEXPpPY53XYOP&sz=w1500">
        {t("page.vacancies.title")}
      </Heading>
      <WavyContainer end>
        <div className="grid md:grid-cols-[1fr_2fr] gap-16">
          <div className="flex flex-col gap-4">
            <div className="flex p-2 rounded-md border-primary/50 border-2 items-center focus-within:border-primary transition-colors">
              <Input
                placeholder={t("page.vacancies.search")}
                className="w-full border-none p-0 placeholder:text-foreground/70 h-auto focus-visible:ring-0"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search />
            </div>

            <div className="flex md:flex-col">
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="gap-2 w-full p-2 border-none">
                  <SelectValue
                    placeholder={
                      <>
                        <MapPin className="stroke-foreground" />
                        {location
                          ? t(`page.vacancies.countries.${location}`)
                          : t("page.vacancies.filters.location")}
                      </>
                    }
                    className="text-foreground"
                  >
                    <MapPin className="stroke-foreground" />
                    {countries[location]}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="w-full">
                  {Object.keys(countries).map((country) => (
                    <SelectItem key={country} value={country}>
                      {countries[country]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={employmentType} onValueChange={setEmploymentType}>
                <SelectTrigger className="gap-2 w-full p-2 border-none">
                  <SelectValue
                    placeholder={
                      <>
                        <BriefcaseBusiness className="stroke-foreground" />
                        {employmentType
                          ? t(`page.vacancies.employmentType.${employmentType}`)
                          : t("page.vacancies.filters.employmentType")}
                      </>
                    }
                    className="text-foreground"
                  >
                    <BriefcaseBusiness className="stroke-foreground" />
                    {employmentTypes[employmentType]}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="w-full">
                  {Object.keys(employmentTypes).map((employmentType) => (
                    <SelectItem key={employmentType} value={employmentType}>
                      {employmentTypes[employmentType]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => {
                setEmploymentType("");
                setLocation("");
              }}
            >
              {t("page.vacancies.filters.removeSelection")}
            </Button>
          </div>
          <div className="grid">
            {filteredJobs.map((job) => (
              <Link
                to={`./${job.id}`}
                key={job.id}
                className="grid gap-2 rounded-md p-4 hover:bg-accent/10 duration-300"
              >
                <h2 className="text-2xl font-bold">
                  {t(`page.vacancies.postings.${job.id}.title`)}
                </h2>
                <p className="text-sm">
                  {t(`page.vacancies.postings.${job.id}.excerpt`)}
                </p>
                <div className="flex gap-4 font-bold flex-wrap">
                  <span className="flex gap-2">
                    {t(`page.vacancies.countries.${job.country}`)},{" "}
                    {t(`page.vacancies.cities.${job.city}`)}
                    <Separator orientation="vertical" />
                  </span>
                  <span className="flex gap-2">
                    {t(`page.vacancies.employmentType.${job.employmentType}`)}
                    <Separator className="inline" orientation="vertical" />
                  </span>
                  <span className="flex gap-2">{job.datePosted}</span>
                </div>
              </Link>
            ))}
            {filteredJobs.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-4 p-4">
                <h3> {t("page.vacancies.vacancieNotFound.title")}</h3>
                <p className="text-center text-secondary-100">
                  {t("page.vacancies.vacancieNotFound.content")}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="my-32">
          <h2 className="text-xl font-bold">
            {t("page.vacancies.didntFind.title")}
          </h2>
          <p>{t("page.vacancies.didntFind.content")}</p>
          <form
            action=""
            id="vacancies"
            className="flex flex-col md:flex-row gap-4 items-stretch items-end mt-16"
          >
            <label>
              {t("page.vacancies.form.name")}
              <span className="text-red-500">*</span>
              <Input
                type="text"
                name="name"
                required
              />
            </label>
            <label>
              {t("page.vacancies.form.email")}
              <span className="text-red-500">*</span>
              <Input
                type="email"
                name="email"
                required
              />
            </label>
            <FileInput name="cv" placeholder={t("page.vacancies.form.cv")} />
          </form>
          <Button form="vacancies" className="mt-12">
            {t("buttons.sendForm")}
          </Button>
        </div>
      </WavyContainer>
    </div>
  );
}
