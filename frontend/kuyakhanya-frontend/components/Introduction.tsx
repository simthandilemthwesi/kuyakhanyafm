import { siteData } from "@/lib/site-data";

export default function Introduction() {
  return (
    <section id="introduction" className="py-16 sm:py-24 bg-[#faf8ff]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold tracking-[0.25em] text-[#6a0dad] uppercase">Introduction</p>
          <h2 className="mt-3 text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-ink">
            More than radio — <span className="text-gradient-purple">a movement</span>
          </h2>
          <div className="mx-rule mt-5 rule" />
        </div>

        <div className="mx-auto mt-10 max-w-4xl rounded-[28px] grad-card border border-zinc-100 bg-white p-7 sm:p-10 shadow-soft">
          <p className="text-[15px] sm:text-lg leading-relaxed text-zinc-700">
            {siteData.introduction}
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {["Hope", "Unity", "Faith", "Community"].map((tag) => (
              <span key={tag} className="rounded-full bg-[#f7f4fc] border border-[#e6ddf5] px-4 py-2 text-xs font-semibold text-[#6a0dad]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
