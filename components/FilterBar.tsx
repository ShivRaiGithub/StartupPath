"use client";

type FilterBarProps = {
  activeType: "All" | "Fellowship" | "Accelerator" | "Incubator" | "Grant";
  activeRegion: string;
  activeStatus: "Open Now" | "Rolling" | "All";
  query: string;
  onTypeChange: (type: "All" | "Fellowship" | "Accelerator" | "Incubator" | "Grant") => void;
  onRegionChange: (region: string) => void;
  onStatusChange: (status: "Open Now" | "Rolling" | "All") => void;
  onQueryChange: (query: string) => void;
};

const types: Array<FilterBarProps["activeType"]> = ["All", "Fellowship", "Accelerator", "Incubator", "Grant"];
const statuses: Array<FilterBarProps["activeStatus"]> = ["Open Now", "Rolling", "All"];

const regions = ["All Regions", "Global", "North America", "Europe", "Asia", "Africa", "LATAM"];

export default function FilterBar({
  activeType,
  activeRegion,
  activeStatus,
  query,
  onTypeChange,
  onRegionChange,
  onStatusChange,
  onQueryChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-4 bg-surface-container-low p-4 md:flex-row md:items-end md:justify-between">
      <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => onTypeChange(type)}
            className={`whitespace-nowrap px-3 py-2 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
              activeType === type
                ? "bg-primary text-on-primary"
                : "bg-surface-container text-on-surface-variant"
            }`}
          >
            {type}
          </button>
        ))}

        {regions.map((region) => (
          <button
            key={region}
            onClick={() => onRegionChange(region)}
            className={`whitespace-nowrap px-3 py-2 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
              activeRegion === region
                ? "bg-primary text-on-primary"
                : "bg-surface-container text-on-surface-variant"
            }`}
          >
            {region}
          </button>
        ))}

        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => onStatusChange(status)}
            className={`whitespace-nowrap px-3 py-2 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
              activeStatus === status
                ? "bg-primary text-on-primary"
                : "bg-surface-container text-on-surface-variant"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <input
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search programs"
        className="w-full border-0 border-b-2 border-surface-container-high bg-transparent px-2 py-2 text-sm outline-none focus:border-primary md:w-64"
      />
    </div>
  );
}
