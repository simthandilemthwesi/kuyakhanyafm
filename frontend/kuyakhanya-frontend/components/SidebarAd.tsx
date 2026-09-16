"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type SidebarAdProps = {
  image: string;
  title: string;
  link: string;
};

export default function SidebarAd({ image, title, link }: SidebarAdProps) {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      const m = window.innerWidth <= 640;
      setIsMobile(m);
      setExpanded(!m);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const stripClasses = cn(
    "fixed left-0 top-1/2 -translate-y-1/2 w-20 h-full bg-white/50 backdrop-blur rounded-r-lg shadow-2xl flex flex-col items-center pt-2 transition-transform duration-300",
    expanded ? "w-32" : "w-20"
  );

  return (
    <>
      <div className={stripClasses} aria-label="Octotel sidebar advert" onMouseEnter={() => setExpanded(true)} onMouseLeave={() => setExpanded(!isMobile)}>
        <Image src={image} alt={title} width={48} height={48} className="mb-2 rounded-xl object-cover hover:scale-110 transition-transform" />
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-[#1a0b2e] hover:text-[#6a0dad] transition-colors">{title}</a>
      </div>
      {isMobile && (
        <div className="fixed left-0 bottom-0 right-0 w-full bg-[#1a0b2e]/80 backdrop-blur border-t border-white/10 p-4 text-center animate-fade-in">
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#FFD700] transition">{title}</a>
          <p className="mt-1 text-xs opacity-70">Sponsored by Octotel</p>
        </div>
      )}
    </>
  );
}