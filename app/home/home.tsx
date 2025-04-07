import { useTranslation } from "react-i18next";
import WavyContainer from "~/components/WavyConatiner";

export default function Home() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="min-h-[70vh] saturate-50 grid place-items-center bg-[url(/background.png)] bg-cover bg-no-repeat">
        <h1 className="flex flex-col items-center gap-4">
          <span className="text-[clamp(1.5rem,10vw,7rem)] leading-15 font-mono text-accent-foreground">
            {t("page.home.title.highlight")}
          </span>
          <span className="text-[clamp(1rem,5vw,4rem)] leading-30 font-bold text-background text-bold,">
            {t("page.home.title.middle")}
          </span>
          <span className="text-[clamp(1rem,3vw,3rem)] leading-15 font-semibold tracking-widest text-background">
            {t("page.home.title.lowlight")}
          </span>
        </h1>
      </div>
      <WavyContainer>
        id foaid osadfj zodsfj eidffoiahsdfiuo hasidufh iusdciuh su osadfj
        zodsfj eidffoiahsdfiuo hasidufh iusdciuh su osadfj zodsfj
        eidffoiahsdfiuo hasidufh iusdciuh su osadfj zodsfj eidffoiahsdfiuo
        hasidufh iusdciuh su osadfj zodsfj eidffoiahsdfiuo hasidufh iusdciuh su
        osadfj zodsfj eidffoiahsdfiuo hasidufh iusdciuh su osadfj zodsfj
        eidffoiahsdfiuo hasidufh iusdciuh su osadfj zodsfj eidffoiahsdfiuo
        hasidufh iusdciuh su osadfj zodsfj eidffoiahsdfiuo hasidufh iusdciuh su
        osadfj zodsfj eidffoiahsdfiuo hasidufh iusdciuh su osadfj zodsfj
        eidffoiahsdfiuo hasidufh iusdciuh su osadfj zodsfj eidffoiahsdfiuo
        hasidufh iusdciuh su osadfj zodsfj eidffoiahsdfiuo hasidufh iusdciuh su
        osadfj zodsfj eidffoiahsdfiuo hasidufh iusdciuh su osadfj zodsfj
        eidffoiahsdfiuo hasidufh iusdciuh su osadfj zodsfj eidffoiahsdfiuo
        hasidufh iusdciuh su osadfj zodsfj eidffoiahsdfiuo hasidufh iusdciuh su
        osadfj zodsfj eidffoiahsdfiuo hasidufh iusdciuh su osadfj zodsfj
        eidffoiahsdfiuo hasidufh iusdciuh su osadfj zodsfj eidffoiahsdfiuo
        hasidufh iusdciuh su osadfj zodsfj eidffoiahsdfiuo hasidufh iusdciuh su
        osadfj zodsfj eidffoiahsdfiuo hasidufh iusdciuh su osadfj zodsfj
        eidffoiahsdfiuo hasidufh iusdciuh su osadfj zodsfj eidffoiahsdfiuo
        hasidufh iusdciuh su osadfj zodsfj eidffoiahsdfiuo hasidufh iusdciuh su
        osadfj zodsfj eidffoiahsdfiuo hasidufh iusdciuh su osadfj zodsfj
        eidffoiahsdfiuo hasidufh iusdciuh su osadfj zodsfj eidffoiahsdfiuo
        hasidufh iusdciuh su osadfj zodsfj eidffoiahsdfiuo hasidufh iusdciuh su
      </WavyContainer>

      <WavyContainer secondary>
        id foaid osadfj zodsfj eidffoiahsdfiuo hasidufh iusdciuh su osadfj
        zodsfj eidffoiahsdfiuo hasidufh iusdciuh su osadfj zodsfj
        eidffoiahsdfiuo hasidufh iusdciuh su osadfj zodsfj eidffoiahsdfiuo
        hasidufh iusdciuh su osadfj zodsfj eidffoiahsdfiuo hasidufh iusdciuh su
        osadfj zodsfj eidffoiahsdfiuo hasidufh iusdciuh su osadfj zodsfj
        eidffoiahsdfiuo hasidufh iusdciuh su osadfj zodsfj eidffoiahsdfiuo
        hasidufh iusdciuh su osadfj zodsfj eidffoiahsdfiuo hasidufh iusdciuh su
        osadfj zodsfj eidffoiahsdfiuo hasidufh iusdciuh su osadfj zodsfj
        eidffoiahsdfiuo hasidufh iusdciuh su osadfj zodsfj eidffoiahsdfiuo
        hasidufh iusdciuh su osadfj zodsfj eidffoiahsdfiuo hasidufh iusdciuh su
        osadfj zodsfj eidffoiahsdfiuo hasidufh iusdciuh su osadfj zodsfj
        eidffoiahsdfiuo hasidufh iusdciuh su osadfj zodsfj eidffoiahsdfiuo
        hasidufh iusdciuh su osadfj zodsfj eidffoiahsdfiuo hasidufh iusdciuh su
        osadfj zodsfj eidffoiahsdfiuo hasidufh iusdciuh su osadfj zodsfj
        eidffoiahsdfiuo hasidufh iusdciuh su osadfj zodsfj eidffoiahsdfiuo
        hasidufh iusdciuh su osadfj zodsfj eidffoiahsdfiuo hasidufh iusdciuh su
        osadfj zodsfj eidffoiahsdfiuo hasidufh iusdciuh su osadfj zodsfj
        eidffoiahsdfiuo hasidufh iusdciuh su osadfj zodsfj eidffoiahsdfiuo
        hasidufh iusdciuh su osadfj zodsfj eidffoiahsdfiuo hasidufh iusdciuh su
        osadfj zodsfj eidffoiahsdfiuo hasidufh iusdciuh su osadfj zodsfj
        eidffoiahsdfiuo hasidufh iusdciuh su osadfj zodsfj eidffoiahsdfiuo
        hasidufh iusdciuh su osadfj zodsfj eidffoiahsdfiuo hasidufh iusdciuh su
      </WavyContainer>
    </div>
  );
}
