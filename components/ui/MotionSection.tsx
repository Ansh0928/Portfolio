import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  id?: string;
  className?: string;
  "aria-label"?: string;
};

export function MotionSection({
  children,
  id,
  className,
  "aria-label": ariaLabel,
}: Props) {
  return (
    <section id={id} aria-label={ariaLabel} className={className}>
      {children}
    </section>
  );
}
