"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cubicBezier } from "framer-motion";
import { useHeaderContext } from "@/components/shared/header/HeaderContext";
import { cn } from "@/utils/cn";

export default function HeaderBrandKit() {
  const [open, setOpen] = useState(false);
  const { dropdownContent, clearDropdown } = useHeaderContext();

  useEffect(() => {
    const close = () => setOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  useEffect(() => {
    if (dropdownContent) setOpen(false);
  }, [dropdownContent]);

  return (
    <div className="relative">
      <Link
        href="/"
        className="flex items-center gap-2 relative brand-kit-menu"
        onContextMenu={(e) => {
          e.preventDefault();
          setOpen((v) => !v);
          if (!open) clearDropdown(true);
        }}
      >
        {/* Swap in your asset in /public */}
        <Image
          src="/localhowl-logo.svg"
          alt="Localhowl"
          width={132}
          height={28}
          priority
          className="h-auto w-[132px]"
        />
        <span className="sr-only">Localhowl</span>
      </Link>

      <AnimatePresence initial={false} mode="popLayout">
        {open && <Menu setOpen={setOpen} />}
      </AnimatePresence>
    </div>
  );
}

const Menu = ({ setOpen }: { setOpen: (v: boolean) => void }) => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  const onMouseEnter = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    const target = (e.target as HTMLElement).closest("button") as HTMLButtonElement;

    if (backgroundRef.current && target) {
      backgroundRef.current.animate({ transform: "scale(0.98)", opacity: 1 }, { duration: 120 });
      backgroundRef.current.animate(
        { transform: "translateY(" + (target.offsetTop - 4) + "px)" },
        { duration: 200, easing: "cubic-bezier(0.1, 0.1, 0.25, 1)" }
      );
    }
  }, []);

  const onMouseLeave = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      if (backgroundRef.current) {
        backgroundRef.current.animate({ transform: "scale(1)", opacity: 0 }, { duration: 120 });
      }
    }, 100);
  }, []);

  const logoPath = "/localhowl-logo.svg";

  const copyLogoUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin + logoPath);
    } catch {
      // ignore
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -6, filter: "blur(1px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: 8, scale: 0.98, filter: "blur(1px)" }}
      transition={{ ease: cubicBezier(0.1, 0.1, 0.25, 1), duration: 0.2 }}
      className="absolute left-0 top-[calc(100%+8px)] z-[2000] w-220 whitespace-nowrap rounded-16 border border-border-faint bg-white p-4 shadow-[0_12px_24px_rgba(0,0,0,0.08),_0_4px_8px_rgba(0,0,0,0.04)]"
    >
      <div
        ref={backgroundRef}
        className="pointer-events-none absolute inset-x-4 top-4 h-32 rounded-8 bg-black-alpha-4 opacity-0"
      />

      <MenuButton
        onClick={() => {
          window.open("/", "_blank");
          setOpen(false);
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
          <path
            d="M12 4.5V12.5C12 13.0523 11.5523 13.5 11 13.5H4C3.44772 13.5 3 13.0523 3 12.5V4.5C3 3.94772 3.44772 3.5 4 3.5H7.5M10.5 2.5H13.5M13.5 2.5V5.5M13.5 2.5L8.5 7.5"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Open in new tab
      </MenuButton>

      <Divider />

      <MenuButton
        onClick={async () => {
          await copyLogoUrl();
          setOpen(false);
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4 4a2 2 0 012-2h5v2H6v8H4V4zm4 4a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H10a2 2 0 01-2-2V8zm2 0v8h6V8h-6z" />
        </svg>
        Copy logo URL
      </MenuButton>

      <MenuButton
        onClick={() => {
          const a = document.createElement("a");
          a.href = logoPath;
          a.download = "localhowl-logo.svg";
          document.body.appendChild(a);
          a.click();
          a.remove();
          setOpen(false);
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M3 14a1 1 0 011-1h3v2H5v2h10v-2h-2v-2h3a1 1 0 011 1v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3zm7-1a1 1 0 001-1V5.414l1.293 1.293 1.414-1.414L10 1.586 6.293 5.293l1.414 1.414L9 5.414V12a1 1 0 001 1z" />
          </svg>
        Download logo
      </MenuButton>

      <Divider />

      <MenuButton
        onClick={() => setOpen(false)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5 4h10v2H5zM5 9h10v2H5zM5 14h10v2H5z" />
        </svg>
        Brand guidelines (coming soon)
      </MenuButton>
    </motion.div>
  );
};

const Divider = () => (
  <div className="px-8 py-4">
    <div className="h-1 w-full bg-black-alpha-5" />
  </div>
);

const MenuButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={cn(
        "group flex w-full items-center gap-8 p-6 text-label-small text-accent-black",
        props.className
      )}
    >
      {props.children}
    </button>
  );
};
