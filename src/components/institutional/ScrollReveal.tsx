"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
} & Omit<HTMLMotionProps<"div">, "children">;

export function ScrollReveal({ children, className = "", delay = 0, ...rest }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.22, 0.6, 0.35, 1],
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
