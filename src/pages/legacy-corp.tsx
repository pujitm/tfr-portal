import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";

const RosterMaker = dynamic(() => import("../ui/RosterMaker"), { ssr: false });

// import RosterMaker from "~/ui/RosterMaker";

import { api } from "~/utils/api";
import BasePage from "~/ui/BasePage";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <BasePage title="TFR Portal">
      <main className="flex min-h-screen w-full flex-col space-y-8 bg-gradient-to-b from-[#2e026d] to-[#15162c] px-8 py-12 text-white md:px-16 xl:px-24">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          The TFR <span className="text-[hsl(280,100%,70%)]">Portal</span>
        </h1>
        <p className="ml-2 text-3xl">Welcome, draskal jr.</p>
        <div className="grid grid-cols-2 gap-8">
          <div className="mt-4 min-h-[250px] min-w-[33%] rounded-md border border-neutral-300 p-4">
            Builds
          </div>
          <div className="mt-4 min-h-[250px] min-w-[33%] rounded-md border border-neutral-300 p-4">
            War Records, Announcements, Knowledge base, Group finder
          </div>
          <div className="col-span-2 min-h-[250px] rounded-md border border-neutral-300 p-4">
            Something else, like war roster or something
          </div>
        </div>
        <div className="flex flex-col items-center justify-start gap-12 px-4 py-16 ">
          <p className="text-2xl text-white">
            {hello.data ? hello.data.greeting : "Loading tRPC query..."}
          </p>
        </div>
        <div className="w-full ">
          <RosterMaker />
        </div>
      </main>
    </BasePage>
  );
};

export default Home;
