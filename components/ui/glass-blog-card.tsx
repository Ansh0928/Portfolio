"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { BookOpen, Clock } from "lucide-react";

type Author = {
  name: string;
  avatar: string;
};

type GlassBlogCardProps = {
  title?: string;
  excerpt?: string;
  image?: string;
  author?: Author;
  date?: string;
  readTime?: string;
  tags?: string[];
  className?: string;
  href?: string;
};

const defaultPost: Required<Omit<GlassBlogCardProps, "className" | "href">> = {
  title: "The Future of UI Design",
  excerpt:
    "Exploring the latest trends in glassmorphism, 3D elements, and micro-interactions.",
  image:
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
  author: {
    name: "Anshumaan Saraf",
    avatar: "https://github.com/shadcn.png",
  },
  date: "Dec 2, 2025",
  readTime: "5 min read",
  tags: ["Design", "UI/UX"],
};

export function GlassBlogCard({
  title = defaultPost.title,
  excerpt = defaultPost.excerpt,
  image = defaultPost.image,
  author = defaultPost.author,
  date = defaultPost.date,
  readTime = defaultPost.readTime,
  tags = defaultPost.tags,
  className,
  href = "#",
}: GlassBlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn("w-full max-w-[400px]", className)}
    >
      <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[#161b22]/60 backdrop-blur-md transition-all duration-300 hover:border-[#3fb950]/40 hover:shadow-xl hover:shadow-[#3fb950]/10">
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117]/80 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

          {/* Tags */}
          <div className="absolute bottom-3 left-3 flex gap-2">
            {tags?.map((tag, i) => (
              <span
                key={i}
                className="rounded-full bg-[#0d1117]/60 px-2.5 py-0.5 text-xs font-mono text-[#8b949e] backdrop-blur-sm border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Hover CTA */}
          <div className="absolute inset-0 flex items-center justify-center bg-[#0d1117]/20 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <motion.a
              href={href}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-full bg-[#3fb950] px-6 py-2.5 text-sm font-mono font-medium text-[#0d1117] shadow-lg shadow-[#3fb950]/25"
            >
              <BookOpen className="h-4 w-4" />
              Read More
            </motion.a>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 p-5">
          <div className="space-y-2">
            <h3 className="text-lg font-mono font-semibold leading-tight text-[#e6edf3] transition-colors group-hover:text-[#3fb950]">
              {title}
            </h3>
            <p className="line-clamp-2 text-sm font-mono text-[#8b949e]">
              {excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-white/5 pt-4">
            <div className="flex items-center gap-2">
              {/* Avatar */}
              <div className="h-8 w-8 overflow-hidden rounded-full border border-white/10">
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col text-xs font-mono">
                <span className="text-[#e6edf3]">{author.name}</span>
                <span className="text-[#8b949e]">{date}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs font-mono text-[#8b949e]">
              <Clock className="h-3 w-3" />
              <span>{readTime}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
