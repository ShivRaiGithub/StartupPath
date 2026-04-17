import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-background py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-6 px-6 md:flex-row">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center gap-2 md:justify-start">
            <Image src="/startuppathLogo.png" alt="StartupPath logo" width={30} height={30} className="h-[30px] w-[30px] object-contain" />
            <span className="font-handwritten text-2xl font-bold text-primary">StartupPath</span>
          </div>
          <p className="text-sm text-on-surface-variant">Built for the ambitious.</p>
        </div>
      </div>
    </footer>
  );
}
