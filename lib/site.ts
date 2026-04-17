export const SITE_NAME = "StartupPath";
export const SITE_DESCRIPTION = "Global fellowships, accelerators, incubators, and grants for founders.";
export const DEFAULT_SITE_URL = "https://startuppath.vercel.app";
export const OG_IMAGE_PATH = "/og_image.png";
export const OG_IMAGE_ALT = "StartupPath startup programs directory";

export function getSiteUrl(): string {
  const candidate = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
  return candidate.endsWith("/") ? candidate.slice(0, -1) : candidate;
}

export function getSiteOrigin(): URL {
  try {
    return new URL(getSiteUrl());
  } catch {
    return new URL(DEFAULT_SITE_URL);
  }
}
