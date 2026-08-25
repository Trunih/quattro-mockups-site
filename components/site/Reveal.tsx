"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-reveal wrapper. Honors prefers-reduced-motion by rendering visible
 * immediately and never observing.
 */
export function Reveal({
  children,
  className = "",
  as: Tag = "div",
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section";
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || !("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            setShown(true);
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Comp = Tag as React.ElementType;
  return (
    <Comp
      ref={ref as React.Ref<HTMLDivElement>}
      className={`reveal${shown ? " in" : ""}${className ? " " + className : ""}`}
      {...rest}
    >
      {children}
    </Comp>
  );
}
