"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type RevealType = "card" | "text" | "profile";

/**
 * ScrollRevealWrapper — simple pulse spinner + scroll-reveal animation.
 *
 * While `isLoading` is true it renders a minimal pulse spinner.
 * Once `isLoading` flips false, wrapped `children` animate in from
 * `{ opacity: 0, y: 30 } -> { opacity: 1, y: 0 }` when 15% of the element
 * enters the viewport (fires once, no repeat).
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
          className={cn("animate-pulse h-8 w-8 rounded bg-[#ffd700]/20", className)}
        />
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