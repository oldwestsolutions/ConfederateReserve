export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  serif = true,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  serif?: boolean;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <p
          className={`mb-4 inline-flex items-center gap-2 eyebrow ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <span className="h-px w-6 bg-brand-gold/60" aria-hidden />
          {eyebrow}
          <span className="h-px w-6 bg-brand-gold/60" aria-hidden />
        </p>
      ) : null}
      <h2
        className={`${
          serif ? "font-display" : "font-body"
        } text-[34px] font-medium leading-[1.08] tracking-tight text-fg md:text-[44px]`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-base leading-relaxed text-muted md:text-[17px] ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
