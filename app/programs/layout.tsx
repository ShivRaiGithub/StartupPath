import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Browse fellowships, accelerators, incubators, and grants by region, focus, and funding model.",
  alternates: {
    canonical: "/programs",
  },
};

export default function ProgramsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
