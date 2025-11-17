"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config"; // sanity.config.ts at project root

export default function StudioPage() {
  return <NextStudio config={config} />;
}
