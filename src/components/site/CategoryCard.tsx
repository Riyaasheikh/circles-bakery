import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export interface CategoryCardProps {
  n: string;
  title: string;
  desc: string;
  img: string;
  tags?: string[];
  category: string;
  className?: string;
}


export function CategoryCard({
  n,
  title,
  desc,
  img,
  tags = [],
  category,
  className = "",
}: CategoryCardProps) {
  return (
    <Link
      to="/menu"
      search={{ c: category }}
      aria-label={`View ${title} on the menu`}
      data-cursor
      className={`group relative block overflow-hidden rounded-2xl border border-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${className}`}
    >
      <img
        src={img}
        alt={title}
        loading="lazy"
        width={1024}
        height={1280}
        className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-scrim via-scrim/30 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-7">
        <div className="flex items-start justify-between">
          <span className="font-display text-2xl text-gold/80">{n}</span>
          <ArrowUpRight
            className="h-5 w-5 translate-y-1 text-gold opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
            aria-hidden="true"
          />
        </div>
        <div>
          <h3 className="font-display text-2xl text-cream sm:text-3xl md:text-4xl">{title}</h3>
          <p className="mt-2 max-w-xs font-body text-xs font-light text-cream/75 sm:text-sm">
            {desc}
          </p>
          <div className="mt-4 flex flex-wrap gap-2 overflow-hidden sm:mt-5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="translate-y-3 rounded-full border border-gold/30 px-3 py-1 font-body text-[10px] uppercase tracking-[0.18em] text-gold opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
