import { type NextPage } from "next";
import dynamic from "next/dynamic";
import { api } from "~/utils/api";
import BasePage from "~/ui/BasePage";
import BaseMeta from "~/ui/BaseMeta";

const RosterMaker = dynamic(() => import("../ui/RosterMaker"), { ssr: false });

const RosterPage: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <BasePage title="TFR Roster Builder">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 pb-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          TFR <span className="text-[hsl(280,100%,70%)]">Roster</span> Builder
        </h1>

        <p className="text-2xl text-white">
          {hello.data ? hello.data.greeting : "Loading tRPC query..."}
        </p>
      </div>
      <div className="w-full px-8 md:px-16 xl:px-24">
        <RosterMaker />
      </div>
    </BasePage>
  );
};

export default RosterPage;
