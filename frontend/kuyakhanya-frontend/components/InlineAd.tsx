"use client";

import Image from "next/image";

type InlineAdProps = {
  image: string;
  title: string;
  link: string;
};

/**
 * InlineAd — inserts an Octotel advert after the first paragraph of an article.
 * Usage: <InlineAd image="/images/octotel_sidebar.png" title="Octotel" link="https://octotel.co.za" />
 * The component renders the ad block immediately; consumers using Markdown/MDX
 * can place it right after the opening <p> of their article body.
 */
export default function InlineAd({
  image,
  title,
  link,
}: InlineAdProps) {
  return (
    <div className="mt-6 border-t border-white/10 pt-6">
      <div className="flex items-center justify-between">
        <Image
          src={image}
          alt={title}
          width={48}
          height={48}
          className="rounded-xl object-cover mr-4"
        />
        <div>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[#6a0dad] hover:text-[#FFD700] transition-colors"
          >
            {title}
          </a>
          <p className="text-xs text-zinc-500">Sponsored by Octotel</p>
        </div>
      </div>
    </div>
  );
}