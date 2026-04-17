"use client";

import { useState } from "react";

import StickyCard from "@/components/StickyCard";
import { programs } from "@/lib/programs";

const rotations = [
  "rotate-[1.5deg]",
  "rotate-[-1deg]",
  "rotate-[0.5deg]",
  "rotate-[-1.5deg]",
  "rotate-[1deg]",
] as const;

type SortValue = "Deadline" | "Name" | "Newest";

export default function ProgramsPage() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedFocus, setSelectedFocus] = useState<string[]>([]);
  const [selectedEquity, setSelectedEquity] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortValue>("Deadline");

  const allTypes = [...new Set(programs.map((program) => program.type))];
  const allRegions = [...new Set(programs.map((program) => program.region))];
  const allStatuses = [...new Set(programs.map((program) => program.status))];
  const allFocus = [...new Set(programs.map((program) => program.focus))];
  const allEquity = [...new Set(programs.map((program) => program.equity))];

  const toggleValue = (values: string[], value: string, setValues: (next: string[]) => void) => {
    setValues(values.includes(value) ? values.filter((entry) => entry !== value) : [...values, value]);
  };

  const withIndex = programs.map((program, index) => ({ program, index }));

  const filtered = withIndex
    .filter(({ program }) => {
      const typeOk = selectedTypes.length === 0 || selectedTypes.includes(program.type);
      const regionOk = selectedRegions.length === 0 || selectedRegions.includes(program.region);
      const statusOk = selectedStatuses.length === 0 || selectedStatuses.includes(program.status);
      const focusOk = selectedFocus.length === 0 || selectedFocus.includes(program.focus);
      const equityOk = selectedEquity.length === 0 || selectedEquity.includes(program.equity);
      return typeOk && regionOk && statusOk && focusOk && equityOk;
    })
    .sort((a, b) => {
      if (sortBy === "Name") {
        return a.program.name.localeCompare(b.program.name);
      }
      if (sortBy === "Newest") {
        return a.index - b.index;
      }

      const parseDeadline = (value: string) => {
        const dateValue = Date.parse(value);
        return Number.isNaN(dateValue) ? Number.MAX_SAFE_INTEGER : dateValue;
      };

      return parseDeadline(a.program.deadline) - parseDeadline(b.program.deadline);
    })
    .map((item) => item.program);

  const renderCheckboxGroup = (
    label: string,
    options: string[],
    selected: string[],
    setSelected: (next: string[]) => void,
  ) => (
    <div>
      <h3 className="mb-3 font-headline text-sm font-bold uppercase tracking-wide text-on-surface-variant">{label}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => toggleValue(selected, option, setSelected)}
              className="h-4 w-4 accent-primary"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <main className="mx-auto mt-24 max-w-7xl px-6">
      <div className="grid gap-10 lg:grid-cols-[16rem_1fr]">
        <aside className="sticky top-28 h-fit bg-surface-container-low p-6">
          <div className="space-y-8">
            {renderCheckboxGroup("Type", allTypes, selectedTypes, setSelectedTypes)}
            {renderCheckboxGroup("Region", allRegions, selectedRegions, setSelectedRegions)}
            {renderCheckboxGroup("Status", allStatuses, selectedStatuses, setSelectedStatuses)}
            {renderCheckboxGroup("Focus", allFocus, selectedFocus, setSelectedFocus)}
            {renderCheckboxGroup("Equity", allEquity, selectedEquity, setSelectedEquity)}
          </div>
        </aside>

        <section>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-on-surface-variant">Showing {filtered.length} programs</p>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortValue)}
              className="bg-surface-container px-3 py-2 text-sm"
            >
              <option value="Deadline">Deadline</option>
              <option value="Name">Name</option>
              <option value="Newest">Newest</option>
            </select>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((program, index) => (
              <StickyCard key={program.id} program={program} rotation={rotations[index % rotations.length]} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
