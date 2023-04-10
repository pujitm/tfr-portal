import { type NextPage } from "next";
import dynamic from "next/dynamic";
import { api } from "~/utils/api";
import BasePage from "~/ui/BasePage";
import BaseMeta from "~/ui/BaseMeta";
import DefaultHeader from "~/ui/DefaultHeader";
import { Avatar, AvatarFallback, AvatarImage } from "~/ui/primitive/Avatar";
import ThemeSelect from "~/ui/ThemeSelect";

const RosterMaker = dynamic(() => import("../ui/RosterMaker"), { ssr: false });

const SplashPage: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      {/* Based on https://webhookthing.com/ */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-800/40 transition-all animate-in fade-in duration-1000 ease-in-out dark:bg-gray-800 ">
        <div className="flex items-center">
          <h1 className="text-5xl font-extrabold leading-tight animate-in fade-in duration-500">
            TFR<span className="text-[hsl(270,100%,70%)]">Portal</span>
          </h1>
          {/* <div className="ml-8">
            <Avatar className="h-14 w-14">
              <AvatarImage src="https://cdn.discordapp.com/icons/892840561214627850/a_f6a5d83375b5b844408e18e04318d717.webp?size=240" />
              <AvatarFallback>TFR</AvatarFallback>
            </Avatar>
          </div> */}
        </div>
        <div className="pt-2">
          <ThemeSelect />
        </div>
      </div>
    </>
  );
};

export default SplashPage;