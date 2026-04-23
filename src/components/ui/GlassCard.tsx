import type { HTMLAttributes, ReactNode } from "react";

type Variant = "glass" | "solid" | "outline";

export function GlassCard({
  children,
  className = "",
  variant = "glass",
  as: Tag = "div",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  as?: keyof JSX.IntrinsicElements;
} & HTMLAttributes<HTMLDivElement>) {
  const base =
    variant === "glass"
      ? "glass"
      : variant === "outline"
      ? "card"
      : "card-elev";
  const Component = Tag as unknown as "div";
  return (
    <Component className={`${base} ${className}`} {...rest}>
      {children}
    </Component>
  );
}
