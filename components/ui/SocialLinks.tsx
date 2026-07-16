"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/content/site";
import { IconGitHub, IconLinkedIn, IconMail } from "@/components/ui/icons";

const items = [
  {
    href: site.links.github,
    label: "GitHub",
    Icon: IconGitHub,
    external: true,
  },
  {
    href: site.links.linkedin,
    label: "LinkedIn",
    Icon: IconLinkedIn,
    external: true,
  },
  {
    href: `mailto:${site.email}`,
    label: "E-mail",
    Icon: IconMail,
    external: false,
  },
] as const;

interface SocialLinksProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showLabels?: boolean;
}

const SIZE = {
  sm: "h-10 w-10",
  md: "h-12 w-12",
  lg: "h-14 w-14",
} as const;

const ICON = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
} as const;

export function SocialLinks({
  className = "",
  size = "md",
  showLabels = false,
}: SocialLinksProps) {
  const reduce = useReducedMotion();

  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className}`}>
      {items.map(({ href, label, Icon, external }, index) => (
        <li key={label}>
          <motion.a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            aria-label={label}
            initial={{ opacity: 0, y: reduce ? 0 : 12, scale: reduce ? 1 : 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            whileHover={reduce ? undefined : { y: -3, scale: 1.06 }}
            whileTap={reduce ? undefined : { scale: 0.92 }}
            transition={{
              type: "spring",
              stiffness: 420,
              damping: 24,
              delay: reduce ? 0 : index * 0.06,
            }}
            className={`group inline-flex ${SIZE[size]} items-center justify-center gap-2 rounded-2xl border border-moss-600/45 bg-soil-800/70 text-sage-300 shadow-[0_0_0_0_rgba(214,164,90,0)] transition-[border-color,color,box-shadow] duration-300 hover:border-amber-400/70 hover:text-amber-300 hover:shadow-[0_0_24px_-6px_rgba(214,164,90,0.55)] active:border-amber-400 ${
              showLabels ? "w-auto px-4" : ""
            }`}
          >
            <Icon className={ICON[size]} title={label} />
            {showLabels && <span className="text-sm font-medium">{label}</span>}
          </motion.a>
        </li>
      ))}
    </ul>
  );
}
