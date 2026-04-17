type TornDividerProps = {
  label?: string;
};

export default function TornDivider({ label }: TornDividerProps) {
  return (
    <div className="torn-edge-top h-10 bg-surface-container-lowest shadow-sm">
      {label ? (
        <div className="mx-auto flex h-full max-w-7xl items-center justify-center px-6">
          <span className="font-handwritten text-xl font-bold text-primary">{label}</span>
        </div>
      ) : null}
    </div>
  );
}
