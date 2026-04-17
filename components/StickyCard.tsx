import Link from "next/link";

import type { Program } from "@/lib/programs";

type StickyCardProps = {
  program: Program;
  rotation: string;
  large?: boolean;
};

const statusStyles: Record<Program["status"], string> = {
  Open: "bg-green-100 text-green-800",
  "Closing Soon": "bg-red-100 text-red-700",
  Closed: "bg-gray-100 text-gray-600",
  Rolling: "bg-blue-100 text-blue-700",
};

export default function StickyCard({ program, rotation, large = false }: StickyCardProps) {
  return (
    <article
      className={`sticky-shadow relative overflow-hidden bg-[var(--sticky)] transition-transform duration-200 hover:rotate-0 ${rotation} ${
        large ? "p-8" : "p-6"
      }`}
      style={{
        // CSS var keeps color and gradient overlay composable in utility-first markup.
        ["--sticky" as string]: program.stickyColor,
        backgroundImage:
          "linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(255,255,255,0)), var(--sticky)",
      }}
    >
      <div className="absolute -top-3 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full bg-primary" />

      <div className="mb-3 mt-4 flex items-start gap-2">
        <span className="material-symbols-outlined text-primary" aria-hidden>
          {program.icon}
        </span>
        <div>
          <h3 className="font-handwritten text-2xl font-bold leading-tight">{program.name}</h3>
          <p className="text-sm text-on-surface-variant">{program.org}</p>
        </div>
      </div>

      <p className="mb-4 truncate text-sm text-on-surface-variant">{program.description}</p>

      <div className="mb-5 flex flex-wrap gap-2 text-xs font-semibold">
        <span className="bg-secondary-container px-2 py-1 text-on-secondary-container">{program.type}</span>
        <span className="bg-secondary-container px-2 py-1 text-on-secondary-container">{program.region}</span>
        <span className={`px-2 py-1 ${statusStyles[program.status]}`}>{program.status}</span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-on-surface-variant">{program.deadline}</span>
        <Link href={`/programs/${program.id}`} className="font-semibold text-primary hover:-translate-y-0.5">
          More Info
        </Link>
      </div>

      <div
        className="absolute bottom-0 right-0 h-10 w-10 bg-white/40"
        style={{ clipPath: "polygon(100% 0, 0 100%, 100% 100%)" }}
        aria-hidden
      />
    </article>
  );
}
