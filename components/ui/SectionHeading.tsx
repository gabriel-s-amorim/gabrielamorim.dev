import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <Reveal className={`mb-14 max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <span className="text-xs uppercase tracking-wide2 text-amber-400">{eyebrow}</span>
      <h2 className="mt-3 font-serif text-3xl text-linen-100 sm:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 text-balance text-base text-sage-400 sm:text-lg">{description}</p>
      )}
    </Reveal>
  );
}
