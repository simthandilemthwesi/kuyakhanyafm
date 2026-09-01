"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

export type RevealType = "card" | "text" | "profile";

/**
 * ScrollRevealWrapper — reusable skeleton + scroll-reveal animation wrapper.
 *
 * While `isLoading` is true it renders a shimmering skeleton matching `type`.
 * Once `isLoading` flips false, wrapped `children` animate in from
 * `{ opacity: 0, y: 30 } -> { opacity: 1, y: 0 }` when 15% of the element
 * enters the viewport (fires once, no repeat).
 *
 * Skeleton + content are swapped inside AnimatePresence with `mode="wait"`
 * so layout metrics don't jump.
 */
export default function ScrollRevealWrapper({
  isLoading,
  type,
  children,
  className,
}: {
  isLoading: boolean;
  type: RevealType;
  children: ReactNode;
  className?: string;
}) {
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="skeleton"
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={className}
        >
          <Skeleton type={type} />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ amount: 0.15, once: true }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Skeleton({ type }: { type: RevealType }) {
  const block = "rounded-lg bg-white/10 animate-pulse";
  const brand = {
    base: "border-white/10 bg-[#150c26]",
    gold: "#b0d136",
    purple: "#58217d",
    white: "#f9f9f9",
  };

  if (type === "profile") {
    return (
      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-white/10 bg-[#150c26]" aria-hidden>
        <div className={`${block} h-24 w-24 rounded-full`} style={{ background: `${brand.purple}55` }} />
        <div className={`h-4 w-40 rounded-md ${block}`} />
        <div className={`h-3 w-28 rounded-md ${block}`} />
        <div className={block} style={{ height: "10px", width: "80%" }} />
      </div>
    );
  }

  if (type === "text") {
    return (
      <div className="flex flex-col gap-3 p-6 rounded-2xl border border-white/10 bg-[#150c26]" aria-hidden>
        <div className={`h-4 w-48 rounded-md ${block}`} />
        <div className={block} style={{ height: "12px", width: "100%" }} />
        <div className={block} style={{ height: "12px", width: "92%" }} />
        <div className={block} style={{ height: "12px", width: "78%" }} />
        <div className={block} style={{ height: "12px", width: "86%" }} />
      </div>
    );
  }

  // card
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#150c26]">
      <div className="h-40 w-full animate-pulse" style={{ background: `${brand.purple}66` }} />
      <div className="flex flex-col gap-3 p-5">
        <div className={`h-4 w-3/4 rounded-md ${block}`} />
        <div className={block} style={{ height: "12px", width: "95%" }} />
        <div className={block} style={{ height: "12px", width: "70%" }} />
        <div className="mt-2 flex gap-2">
          <div className="h-8 w-24 rounded-full bg-[#b0d136]/30 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
