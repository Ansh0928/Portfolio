"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

type Props = {
  children: ReactNode;
  id?: string;
  className?: string;
};

export function MotionSection({ children, id, className }: Props) {
  return (
    <motion.section
      id={id}
      whileInView="visible"
      initial="hidden"
      viewport={{ once: true, amount: 0.15 }}
      variants={sectionVariants}
      className={className}
    >
      {children}
    </motion.section>
  );
}
