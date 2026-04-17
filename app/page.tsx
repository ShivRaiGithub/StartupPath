import type { Metadata } from "next";

import HomePageClient from "@/components/HomePageClient";

import { SITE_DESCRIPTION } from "@/lib/site";

export const metadata: Metadata = {
  title: "Discover Global Startup Programs",
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <HomePageClient />;
}
