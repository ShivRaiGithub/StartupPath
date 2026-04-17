"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { createPortal } from "react-dom";

const navItems = [
  { href: "/programs", label: "Programs" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isContributionModalOpen, setIsContributionModalOpen] = useState(false);

  const contributionModal =
    isContributionModalOpen && typeof document !== "undefined"
      ? createPortal(
          <div
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/45 px-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contribution-modal-title"
          >
            <div className="w-full max-w-md border border-primary/20 bg-[#fef9f1] p-6 shadow-2xl">
              <h2 id="contribution-modal-title" className="font-headline text-xl font-bold text-on-surface">
                Please open a PR on github for contribution
              </h2>
              <a
                href="https://github.com/ShivRaiGithub/StartupPath"
                target="_blank"
                rel="noreferrer"
                className="mt-3 block break-all text-sm font-semibold text-primary underline"
              >
                https://github.com/ShivRaiGithub/StartupPath
              </a>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  className="bg-primary px-4 py-2 font-headline font-bold text-on-primary transition-transform hover:-translate-y-0.5"
                  onClick={() => setIsContributionModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-primary/10 bg-[#fef9f1]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/startpathLogo.png" alt="StartPath logo" width={36} height={36} className="h-9 w-9 object-contain" />
            <span className="-rotate-1 font-handwritten text-3xl font-bold text-primary">StartPath</span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className="font-headline font-semibold text-on-surface-variant">
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              className="bg-primary px-4 py-2 font-headline font-bold text-on-primary transition-transform hover:-translate-y-0.5"
              onClick={() => setIsContributionModalOpen(true)}
            >
              List Program
            </button>
          </div>
        </div>

        {isOpen ? (
          <div className="bg-background px-6 pb-4 md:hidden">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="font-headline font-semibold text-on-surface-variant"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <button
                type="button"
                className="bg-primary px-4 py-2 font-headline font-bold text-on-primary transition-transform hover:-translate-y-0.5"
                onClick={() => {
                  setIsContributionModalOpen(true);
                  setIsOpen(false);
                }}
              >
                List Program
              </button>
            </div>
          </div>
        ) : null}
      </header>

      {contributionModal}
    </>
  );
}
