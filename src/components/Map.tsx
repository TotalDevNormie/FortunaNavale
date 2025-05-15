import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import WavyContainer from "./WavyConatiner";
import { useTranslation } from "react-i18next";

export default function Map() {
  const { t } = useTranslation();
  return (
    <WavyContainer end className="pb-32">
      <h2 className="font-bold font-mono uppercase text-3xl text-secondary text-center mb-8">
        {t("page.home.map.title")}
      </h2>
      <div className="relative mb-8">
        <img src="/europe-map.png" alt="Map of Europe" className="mx-auto" />
        <Popover>
          <PopoverTrigger asChild>
            <Button className="rounded-full text-xl cursor-pointer py-5 absolute top-1/2 left-[25%] hover:scale-125">
              <Plus size={32} strokeWidth={1.5} />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="bg-primary text-primary-foreground"
            side="top"
            align="end"
            sideOffset={5}
          >
            hey
          </PopoverContent>
        </Popover>
      </div>
    </WavyContainer>
  );
}
