// app/lyceum/page.tsx
import LyceumVideos from "./components/Lyceum-Videos";
import Hero from "./components/Lyceum-Hero";
import RecentComments from "./components/Lyceum-Recent-Comments";
import SafeRupeezAccountCTA from "./components/Lyceum-Account";

const Page = () => {
  return (
    <div>
      <Hero />
      <LyceumVideos />
      <RecentComments />
      <SafeRupeezAccountCTA />
    
    </div>
  );
};

export default Page;
