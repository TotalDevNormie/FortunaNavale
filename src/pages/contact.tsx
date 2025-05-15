import { useTranslation } from "react-i18next";
import Heading from "../components/Heading";
import WavyContainer from "../components/WavyConatiner";
import { Input } from "../components/ui/input";
import { AutosizeTextarea } from "../components/ui/autosize-textarea";

export default function Contact() {
  const { t } = useTranslation();
  return (
    <div>
      <Heading image="https://drive.google.com/thumbnail?id=1RPo66WqxHqwzuAKbjbpmn7VedmmaifIB&sz=w1500">
        {t("page.contact.title")}
      </Heading>
      <WavyContainer>
        <h2>{t("page.contact.subtitle")}</h2>
        <p>{t("page.contact.content")}</p>

        <form className="grid grid-cols-2 gap-4">
          <label className="grid gap-2">
            <span className="">{t("page.contact.form.name")}</span>
            <Input />
          </label>
          <label className="grid gap-2">
            <span className="">{t("page.contact.form.email")}</span>
            <Input />
          </label>
          <label className="grid gap-2">
            <span className="">{t("page.contact.form.phone")}</span>
            <Input />
          </label>
          <label className="grid gap-2">
            <span className="">{t("page.contact.form.subject")}</span>
            <Input />
          </label>
          <label className="grid gap-2 col-span-2">
            <span className="">{t("page.contact.form.name")}</span>
            <AutosizeTextarea className="" />
          </label>
        </form>
      </WavyContainer>
    </div>
  );
}
