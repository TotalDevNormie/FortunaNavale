import { useTranslation } from "react-i18next";
import Heading from "../components/Heading";
import WavyContainer from "../components/WavyConatiner";
import { Input } from "../components/ui/input";
import { AutosizeTextarea } from "../components/ui/autosize-textarea";
import { Button } from "~/components/ui/button";
import Map from "~/components/Map";

export default function Contact() {
  const { t } = useTranslation();

  type Contact = {
    name: string;
    position: string;
    email: string;
    phone: string;
  };

  const contacts = t("contact.people", { returnObjects: true }) as
    | Contact[]
    | string;
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

        <form id="contact-form" action="https://formspree.io/f/xpwrlewp" method="POST" className="grid grid-cols-2 gap-8">
          <label className="grid gap-2">
            <span className="">
              {t("page.contact.form.name")}
              <span className="text-red-500">*</span>
            </span>
            <Input name="name" type="text" required />
          </label>
          <label className="grid gap-2">
            <span className="">
              {t("page.contact.form.email")}
              <span className="text-red-500">*</span>
            </span>
            <Input name="email" type="email" required />
          </label>
          <label className="grid gap-2">
            <span className="">
              {t("page.contact.form.phone")}
              <span className="text-red-500">*</span>
            </span>
            <Input type="phone" name="phone" required />
          </label>
          <label className="grid gap-2">
            <span className="">
              {t("page.contact.form.subject")}
              <span className="text-red-500">*</span>
            </span>
            <Input name="subject" type="text" required />
          </label>
          <label className="grid gap-2 col-span-2">
            <span className="">
              {t("page.contact.form.message")}
              <span className="text-red-500">*</span>
            </span>
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
      <WavyContainer secondary className="grid md:grid-cols-2 gap-8 py-16">
        <div>
          <img
            src="https://drive.google.com/thumbnail?id=1Q7NjvZ2FryAf37QwI5VQ38d5UTIGQ7NU&sz=w1000"
            alt=""
            className="bg-left w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-mono mb-16">
            {t("page.contact.title")}
          </h2>
          <div className="grid gap-8 w-fit">
            {Array.isArray(contacts) &&
              contacts?.map((contact, index) => (
                <div key={index} className="flex gap-4">
                  <h3 className="font-mono text-2xl m-0">{index + 1}</h3>

                  <div>
                    <p className="font-semibold">
                      {contact.name} - {contact.position}
                    </p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="block text-primary hover:text-orange-300 break-all"
                    >
                      {contact.email}
                    </a>
                    <a
                      href={`tel:${contact.phone.replace(/\s/g, "")}`}
                      className="block text-primary hover:text-orange-300"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </WavyContainer>
      <Map />
    </div>
  );
}
