import type { ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-moss-600/50 bg-soil-800/60 px-3 py-1 text-xs text-sage-300">
      {children}
    </span>
  );
}
