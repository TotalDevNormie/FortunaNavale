import type { ReactNode } from "react";

const Heading = ({
  children,
  image,
}: {
  children: ReactNode;
  image: string;
}) => (
  <div className="min-h-[80vh] grid place-items-center relative isolate">
    <div
      className="absolute -z-10 inset-0 bg-cover bg-no-repeat brightness-60"
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: "center bottom 20%",
      }}
    ></div>
    <h1 className="text-[clamp(1.5rem,10vw,7rem)] uppercase leading-15 font-mono text-accent-100">
      {children}
    </h1>
  </div>
);

export default Heading;
