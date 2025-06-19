import { useTranslation } from "react-i18next";
import { Navigate, useNavigate, useParams } from "react-router";
import Heading from "~/components/Heading";
import WavyContainer from "~/components/WavyConatiner";
import { JobTranslation } from "./vacancies";
import jobs from "~/jobs.json";
import { ArrowLeft } from "lucide-react";
import { Separator } from "~/components/ui/separator";
import { Input } from "~/components/ui/input";
import FileInput from "~/components/ui/FileInput";
import { Button } from "~/components/ui/button";

export default function Vacancie() {
  const { t } = useTranslation();
  const { jobId } = useParams();
  const navigate = useNavigate();
  const job = jobId
    ? (t(`page.vacancies.postings.${jobId}`, {
        returnObjects: true,
      }) as JobTranslation)
    : null;
  const jobInfo = jobId ? jobs.find((job) => job.id === jobId) : null;

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!job || !jobInfo) {
    return <Navigate to=".." replace />;
  }

  return (
    <div>
      <Heading image={jobInfo.image}>{job.title}</Heading>
      <WavyContainer end className="grid gap-4">
        <div className="flex items-center mb-8 gap-4">
          <Button
            variant="ghost"
            onClick={handleGoBack}
            className="cursor-pointer"
          >
            <ArrowLeft />
          </Button>
          <span className="text-gray-700">
            {t("page.vacancies.title-single")}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-orange-500 mb-6">{job.title}</h1>
        <Separator />
        <div className="grid xs:grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <h2 className="font-semibold">
              {t("page.vacancies.info.salary")}:
            </h2>
            <p>
              {jobInfo.salaryBruto} {jobInfo.salaryCurency}
            </p>
            <p>{t("page.vacancies.info.bruto")}</p>
          </div>
          <div>
            <h2 className="font-semibold">
              {t("page.vacancies.info.JobFormat")}:
            </h2>
            <p>{job.jobFormat}</p>
          </div>
          <div>
            <h2 className="font-semibold">
              {t("page.vacancies.info.jobType")}:
            </h2>
            <p>{job.jobType}</p>
          </div>
          <div>
            <h2 className="font-semibold">
              {t("page.vacancies.info.experience")}:
            </h2>
            <p>{job.experience}</p>
          </div>
        </div>
        <Separator />
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">
            {t("page.vacancies.info.responsibilities")}:
          </h2>
          <ul className="list-disc list-inside ml-8">
            {job.responsibilities.map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))}
          </ul>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">
            {t("page.vacancies.info.requirements")}:
          </h2>
          <ul className="list-disc list-inside ml-8">
            {job.requirements.map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">
            {t("page.vacancies.info.advantages")}:
          </h2>
          <ul className="list-disc list-inside ml-8">
            {job.advantages.map((advantage, index) => (
              <li key={index}>{advantage}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">
            {t("page.vacancies.info.weOffer")}:
          </h2>
          <ul className="list-disc list-inside ml-8">
            {job.weOffer.map((offer, index) => (
              <li key={index}>{offer}</li>
            ))}
          </ul>
        </div>
        <div className="my-32">
          <h2 className="text-xl font-bold">
            {t("page.vacancies.jobInterested")}
          </h2>
          <form
            action="https://formspree.io/f/meokzeqw"
            encType="multipart/form-data"
            id="vacancie"
            method="POST"
            className="flex flex-col md:flex-row gap-4 items-stretch items-end mt-16"
          >
            <input type="hidden" name="vacancie" value={jobInfo.title} />
            <label>
              {t("page.vacancies.form.name")}
              <span className="text-red-500">*</span>
              <Input type="text" name="name" required />
            </label>
            <label>
              {t("page.vacancies.form.email")}
              <span className="text-red-500">*</span>
              <Input type="email" name="email" required />
            </label>
            <FileInput name="cv" placeholder={t("page.vacancies.form.cv")} />
          </form>
          <Button form="vacancie" className="mt-12 w-full md:w-auto">
            {t("buttons.sendForm")}
          </Button>
        </div>
      </WavyContainer>
    </div>
  );
}
