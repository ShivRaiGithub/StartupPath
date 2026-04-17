"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";

import FilterBar from "@/components/FilterBar";
import StickyCard from "@/components/StickyCard";
import TornDivider from "@/components/TornDivider";
import { programs } from "@/lib/programs";

const rotations = [
  "rotate-[1.5deg]",
  "rotate-[-1deg]",
  "rotate-[0.5deg]",
  "rotate-[-1.5deg]",
  "rotate-[1deg]",
] as const;

const regionChips: Record<string, string> = {
  Global: "🌍",
  "North America": "🌎",
  Europe: "🇪🇺",
  Asia: "🌏",
  Africa: "🌍",
  LATAM: "🌎",
};

export default function HomePageClient() {
  const [activeType, setActiveType] = useState<"All" | "Fellowship" | "Accelerator" | "Incubator" | "Grant">(
    "All",
  );
  const [activeRegion, setActiveRegion] = useState("All Regions");
  const [activeStatus, setActiveStatus] = useState<"Open Now" | "Rolling" | "All">("All");
  const [query, setQuery] = useState("");
  const gridAnchorRef = useRef<HTMLDivElement>(null);

  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      const matchesType = activeType === "All" || program.type === activeType;
      const matchesRegion = activeRegion === "All Regions" || program.region === activeRegion;
      const matchesStatus =
        activeStatus === "All" ||
        (activeStatus === "Open Now" && (program.status === "Open" || program.status === "Closing Soon")) ||
        (activeStatus === "Rolling" && program.status === "Rolling");
      const searchValue = query.trim().toLowerCase();
      const matchesQuery =
        searchValue.length === 0 ||
        [program.name, program.org, program.focus, program.region].join(" ").toLowerCase().includes(searchValue);

      return matchesType && matchesRegion && matchesStatus && matchesQuery;
    });
  }, [activeType, activeRegion, activeStatus, query]);

  const featuredPrograms = useMemo(() => programs.filter((program) => program.featured), []);

  const categoryCounts = useMemo(() => {
    const categories = ["Fellowship", "Accelerator", "Incubator", "Grant"] as const;
    return categories.map((type) => ({
      type,
      icon:
        type === "Fellowship"
          ? "school"
          : type === "Accelerator"
            ? "rocket_launch"
            : type === "Incubator"
              ? "groups"
              : "payments",
      count: programs.filter((program) => program.type === type).length,
    }));
  }, []);

  const regionCounts = useMemo(() => {
    return Object.keys(regionChips).map((region) => ({
      region,
      count: programs.filter((program) => program.region === region).length,
    }));
  }, []);

  return (
    <>
      <section className="px-6 pb-20 pt-32">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <h1 className="-rotate-1 pt-6 font-handwritten text-6xl font-bold text-primary">Find your Startup Path</h1>
          <p className="mt-4 text-xl text-on-surface-variant">
            Fellowships, accelerators & incubators worldwide - all in one place.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/programs"
              className="bg-primary px-6 py-3 font-headline font-bold text-on-primary transition-transform hover:-translate-y-0.5"
            >
              Explore Programs
            </Link>
          </div>
          <p className="mt-6 text-sm text-on-surface-variant">30+ Programs</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6" ref={gridAnchorRef} id="program-grid">
        <FilterBar
          activeType={activeType}
          activeRegion={activeRegion}
          activeStatus={activeStatus}
          query={query}
          onTypeChange={setActiveType}
          onRegionChange={setActiveRegion}
          onStatusChange={setActiveStatus}
          onQueryChange={setQuery}
        />
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPrograms.map((program, index) => (
            <StickyCard key={program.id} program={program} rotation={rotations[index % rotations.length]} />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <TornDivider label="Featured on the Board" />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-6">
        <h2 className="mb-8 font-handwritten text-4xl font-bold text-on-surface">Pinned to the Board ✦</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredPrograms.map((program, index) => (
            <StickyCard
              key={program.id}
              program={program}
              rotation={rotations[index % rotations.length]}
              large
            />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { number: "$2B+", label: "raised by alumni", color: "#FEF9C3", rotation: "rotate-[1deg]" },
            { number: "120+", label: "countries", color: "#DBEAFE", rotation: "rotate-[-1deg]" },
            { number: "50,000+", label: "founders", color: "#FCE7F3", rotation: "rotate-[1.5deg]" },
          ].map((item) => (
            <div
              key={item.number}
              className={`sticky-shadow relative p-8 text-center ${item.rotation}`}
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(255,255,255,0)), var(--sticky)",
                ["--sticky" as string]: item.color,
              }}
            >
              <div className="absolute -top-3 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full bg-primary" />
              <p className="pt-5 font-handwritten text-5xl font-bold text-primary">{item.number}</p>
              <p className="text-sm text-on-surface-variant">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-6">
        <h2 className="mb-8 font-handwritten text-4xl font-bold text-on-surface">What are you looking for?</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categoryCounts.map((category, index) => (
            <button
              key={category.type}
              className={`sticky-shadow bg-surface-container-lowest p-6 text-left transition-transform hover:-translate-y-0.5 hover:rotate-0 ${
                rotations[index % rotations.length]
              }`}
              onClick={() => {
                setActiveType(category.type);
                gridAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              <span className="material-symbols-outlined text-primary" aria-hidden>
                {category.icon}
              </span>
              <p className="mt-2 font-headline text-lg font-bold">{category.type}</p>
              <p className="text-sm text-on-surface-variant">{category.count} programs</p>
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-6">
        <h2 className="mb-6 font-handwritten text-4xl font-bold text-on-surface">Browse by region</h2>
        <div className="flex flex-wrap gap-3">
          {regionCounts.map((item) => (
            <button
              key={item.region}
              className="bg-surface-container px-4 py-2 text-sm font-semibold text-on-surface-variant transition-transform hover:-translate-y-0.5"
              onClick={() => {
                setActiveRegion(item.region);
                gridAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              {regionChips[item.region]} {item.region} · {item.count}
            </button>
          ))}
        </div>
      </section>

    
    </>
  );
}
