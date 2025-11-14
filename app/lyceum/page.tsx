// app/lyceum/page.tsx
"use client";
import LyceumVideos from "./components/Lyceum-Videos";
import Hero from "../lyceum/components/Lyceum-Hero";
const page = () => {
  return (
    <div>
      <Hero/>
      <LyceumVideos />
    </div>
  );
};

export default page;
