"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

type CursorPosition = {
  left: number;
  width: number;
  opacity: number;
};

type Tab = {
  label: string;
  href: string;
};

type SlideTabsProps = {
  tabs: Tab[];
  activeIndex?: number;
};

type TabProps = {
  children: React.ReactNode;
  setPosition: (pos: CursorPosition) => void;
  onClick: () => void;
  href: string;
};

type CursorProps = {
  position: CursorPosition;
};

export function SlideTabs({ tabs, activeIndex = 0 }: SlideTabsProps) {
  const [position, setPosition] = useState<CursorPosition>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [selected, setSelected] = useState(activeIndex);
  const tabsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const selectedTab = tabsRef.current[selected];
    if (selectedTab) {
      const { width } = selectedTab.getBoundingClientRect();
      setPosition({ left: selectedTab.offsetLeft, width, opacity: 1 });
    }
  }, [selected]);

  return (
    <ul
      onMouseLeave={() => {
        const selectedTab = tabsRef.current[selected];
        if (selectedTab) {
          const { width } = selectedTab.getBoundingClientRect();
          setPosition({ left: selectedTab.offsetLeft, width, opacity: 1 });
        }
      }}
      className="relative flex w-fit rounded-full border border-white/20 bg-white/5 p-1 backdrop-blur-sm"
    >
      {tabs.map((tab, i) => (
        <Tab
          key={tab.label}
          ref={(el) => {
            tabsRef.current[i] = el;
          }}
          setPosition={setPosition}
          onClick={() => setSelected(i)}
          href={tab.href}
        >
          {tab.label}
        </Tab>
      ))}
      <Cursor position={position} />
    </ul>
  );
}

const Tab = React.forwardRef<HTMLLIElement, TabProps>(
  ({ children, setPosition, onClick, href }, ref) => {
    return (
      <li
        ref={ref}
        onClick={onClick}
        onMouseEnter={() => {
          const el = ref as React.RefObject<HTMLLIElement>;
          if (!el?.current) return;
          const { width } = el.current.getBoundingClientRect();
          setPosition({ left: el.current.offsetLeft, width, opacity: 1 });
        }}
        className="relative z-10 block cursor-pointer"
      >
        <a
          href={href}
          className="block px-4 py-1.5 text-xs font-mono tracking-widest uppercase text-[#e6edf3] mix-blend-difference select-none"
        >
          {children}
        </a>
      </li>
    );
  },
);
Tab.displayName = "Tab";

function Cursor({ position }: CursorProps) {
  return (
    <motion.li
      aria-hidden="true"
      animate={{ ...position }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="absolute z-0 top-1 h-[calc(100%-8px)] rounded-full bg-[#3fb950]/20 border border-[#3fb950]/40"
    />
  );
}
