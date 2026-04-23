import { type HTMLAttributes } from "react";

export function GoldDivider({ className = "" }: HTMLAttributes<HTMLHRElement>) {
  return (
    <div
      className={`h-px w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent ${className}`}
      role="separator"
    />
  );
}
