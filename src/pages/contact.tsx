import { useTranslation } from "react-i18next";
import Heading from "../components/Heading";
import WavyContainer from "../components/WavyConatiner";
import { Input } from "../components/ui/input";
import { AutosizeTextarea } from "../components/ui/autosize-textarea";
import { Button } from "~/components/ui/button";
import Map from "~/components/Map";

export default function Contact() {
  const { t } = useTranslation();
  return (
    <div>
      <Heading image="https://drive.google.com/thumbnail?id=1RPo66WqxHqwzuAKbjbpmn7VedmmaifIB&sz=w1500">
        {t("page.contact.title")}
      </Heading>
      <WavyContainer>
        <h2 className="text-center font-mono text-3xl text-secondary-100 mb-8">
          {t("page.contact.subtitle")}
        </h2>
        <p className="text-center text-secondary-100 mb-16">
          {t("page.contact.content")}
        </p>

        <form id="contact-form" className="grid grid-cols-2 gap-8">
          <label className="grid gap-2">
            <span className="">{t("page.contact.form.name")}<span className="text-red-500">*</span></span>
            <Input name="name" type="text" required />
          </label>
          <label className="grid gap-2">
            <span className="">{t("page.contact.form.email")}<span className="text-red-500">*</span></span>
            <Input name="email" type="email" required />
          </label>
          <label className="grid gap-2">
            <span className="">{t("page.contact.form.phone")}<span className="text-red-500">*</span></span>
            <Input type="phone" name="phone" required />
          </label>
          <label className="grid gap-2">
            <span className="">{t("page.contact.form.subject")}<span className="text-red-500">*</span></span>
            <Input name="subject" type="text" required />
          </label>
          <label className="grid gap-2 col-span-2">
            <span className="">{t("page.contact.form.message")}<span className="text-red-500">*</span></span>
            <AutosizeTextarea name="message" required />
          </label>
        </form>
        <Button
          form="contact-form"
          type="submit"
          className="cursor-pointer mt-8 px-8 py-4"
        >
          {t("page.contact.form.send")}
        </Button>
      </WavyContainer>
      <WavyContainer secondary>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga, iusto.
      </WavyContainer>
      <Map />
    </div>
  );
}
