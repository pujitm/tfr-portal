import { type NextPage } from "next";
import Link from "next/link";

import DefaultMeta from "~/ui/DefaultMeta";
import ThemeSelect from "~/ui/ThemeSelect";
import { Button } from "~/ui/primitive/Button";

const SplashPage: NextPage = () => {
  return (
    <>
      <DefaultMeta />
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
        <div className="space-y-8 pt-8">
          <div className="flex items-center justify-center gap-2">
            <p>Toggle Theme</p>
            <ThemeSelect />
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8">
            <Link href={"/roster"}>
              <Button className="w-full">Roster Builder</Button>
            </Link>
            <Link href={"/legacy-roster"}>
              <Button className="w-full">Old Roster Builder</Button>
            </Link>
            <Link href={"/builds"}>
              <Button className="w-full">Builds</Button>
            </Link>
            <Link href={"/vods"}>
              <Button className="w-full">Vods</Button>
            </Link>
            <Link href={"/kb"}>
              <Button className="w-full">Knowledge Base</Button>
            </Link>
            <Link href={"/credit"}>
              <Button className="w-full">Payout/push credit</Button>
            </Link>
            {/* Can be in discord */}
            <Link href={"/checkIn"}>
              <Button className="w-full">War check in confirmation</Button>
            </Link>
          </div>
          <div className="flex gap-4"></div>
        </div>
      </div>
    </>
  );
};

export default SplashPage;
