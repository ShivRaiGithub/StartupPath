import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import StickyCard from "@/components/StickyCard";
import TornDivider from "@/components/TornDivider";
import { programs } from "@/lib/programs";
import { SITE_NAME } from "@/lib/site";

type ProgramDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.id }));
}

export async function generateMetadata({ params }: ProgramDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = programs.find((entry) => entry.id === slug);

  if (!program) {
    return {
      title: "Program Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${program.name} by ${program.org}`;
  const description = `${program.type} in ${program.region}. ${program.description}`;
  const canonical = `/programs/${program.id}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${program.name} on StartPath`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/twitter-image"],
    },
  };
}

export default async function ProgramDetailPage({ params }: ProgramDetailPageProps) {
  const { slug } = await params;
  const program = programs.find((entry) => entry.id === slug);

  if (!program) {
    notFound();
  }

  const similar = programs
    .filter((entry) => entry.id !== program.id && (entry.type === program.type || entry.region === program.region))
    .slice(0, 3);

  return (
    <main className="mx-auto mt-28 max-w-7xl px-6">
      <div className="mb-4 text-sm text-on-surface-variant">
        <Link href="/programs" className="font-semibold text-primary">
          Programs
        </Link>{" "}
        / {program.name}
      </div>

      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="flex-1 rotate-[-0.5deg]">
          <div className="sticky-shadow ruled-lines relative overflow-hidden border-l-[40px] border-primary/5 bg-surface-container-lowest p-12">
            <div className="absolute left-1 top-0 h-full w-[2px] bg-red-200" />
            <h1 className="-rotate-1 font-handwritten text-6xl font-bold text-on-surface">{program.name}</h1>
            <p className="mt-2 text-on-surface-variant">by {program.org}</p>

            <section className="mt-10">
              <h2 className="mb-3 flex items-center gap-2 font-headline text-2xl font-extrabold text-primary">
                <span className="material-symbols-outlined">description</span>
                Overview
              </h2>
              <p className="leading-8 text-on-surface-variant">{program.description}</p>
            </section>

            <section className="mt-10">
              <h2 className="mb-3 flex items-center gap-2 font-headline text-2xl font-extrabold text-primary">
                <span className="material-symbols-outlined">verified</span>
                Eligibility
              </h2>
              <ol className="space-y-2 text-on-surface-variant">
                {program.eligibility.map((item, index) => (
                  <li key={item} className="flex gap-3">
                    <span className="font-semibold text-primary">{String(index + 1).padStart(2, "0")}.</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="mt-10">
              <h2 className="mb-3 flex items-center gap-2 font-headline text-2xl font-extrabold text-primary">
                <span className="material-symbols-outlined">star</span>
                Perks
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {program.perks.map((perk) => (
                  <div key={perk.title} className="bg-secondary-container/30 p-4">
                    <h3 className="font-headline text-base font-bold text-on-surface">{perk.title}</h3>
                    <p className="text-sm text-on-surface-variant">{perk.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-10 pb-10">
              <h2 className="mb-3 flex items-center gap-2 font-headline text-2xl font-extrabold text-primary">
                <span className="material-symbols-outlined">history_edu</span>
                Selection Process
              </h2>
              <p className="text-on-surface-variant">
                Applications are reviewed in rolling batches, followed by interviews with the program team and mentors.
                Shortlisted teams complete a final panel review focused on traction, execution, and mission alignment.
              </p>
            </section>

            <div
              className="absolute bottom-0 right-0 h-12 w-12 bg-surface-container-high"
              style={{ clipPath: "polygon(100% 0, 0 100%, 100% 100%)" }}
              aria-hidden
            />
          </div>
        </div>

        <aside className="w-full rotate-[1.5deg] lg:sticky lg:top-32 lg:w-80">
          <div
            className="sticky-shadow relative p-8"
            style={{
              ["--sticky" as string]: "#e9e5b0",
              backgroundImage:
                "linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(255,255,255,0)), var(--sticky)",
            }}
          >
            <div className="absolute -top-3 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full bg-primary" />
            <h3 className="mb-5 mt-4 font-handwritten text-4xl font-bold">Quick Facts</h3>
            <div className="space-y-4 text-sm">
              <p>
                <span className="block text-on-surface-variant">Deadline</span>
                <span className={program.status === "Closing Soon" ? "font-bold text-error" : "font-bold"}>
                  {program.deadline}
                </span>
              </p>
              <p>
                <span className="block text-on-surface-variant">Location</span>
                <span className="font-bold">{program.location}</span>
              </p>
              <p>
                <span className="block text-on-surface-variant">Equity</span>
                <span className="font-bold">{program.equity}</span>
              </p>
              <p>
                <span className="block text-on-surface-variant">Duration</span>
                <span className="font-bold">{program.duration}</span>
              </p>
            </div>
          </div>

        </aside>
      </div>

      <section className="mt-20">
        <TornDivider label="Similar Opportunities" />
      </section>

      <section className="mx-auto mt-10 grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
        {similar.map((item, index) => (
          <StickyCard
            key={item.id}
            program={item}
            rotation={["rotate-[1deg]", "rotate-[-1.5deg]", "rotate-[0.5deg]"][index]}
          />
        ))}
      </section>
    </main>
  );
}
