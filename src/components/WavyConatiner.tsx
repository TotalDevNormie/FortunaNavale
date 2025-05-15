import type { ReactNode } from "react";
import { cn } from "~/lib/utils";

type Props = {
  children: ReactNode;
  secondary?: boolean;
  className?: string;
  end?: boolean;
};

export default function WavyContainer({
  children,
  secondary,
  end,
  className,
}: Props) {
  return (
    <div
      className={`relative mt-14 ${
        secondary
          ? "bg-secondary text-secondary-foreground py-28"
          : "bg-background text-foreground before:content-[''] before:bg-[url(/wave-1.svg)] before:w-full before:h-28 before:absolute before:z-10 before:top-0 before:-translate-y-full before:bg-no-repeat before:bg-size-[100%_100%]"
      } ${
        secondary || end
          ? ""
          : "after:content-[''] after:bg-[url(/wave-2.svg)] after:w-full after:h-28 after:absolute after:bottom-0 after:translate-y-full after:z-10 after:bg-no-repeat after:bg-size-[100%_100%]"
      }`}
    >
      <div className={cn("w-fit-container", className)}>{children}</div>
    </div>
  );
}
