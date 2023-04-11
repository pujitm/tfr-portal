import { type NextPage } from "next";
import dynamic from "next/dynamic";

import { api } from "~/utils/api";
import BasePage from "~/ui/BasePage";
import DefaultHeader from "~/ui/DefaultHeader";

const RosterMaker = dynamic(() => import("../ui/RosterMaker"), { ssr: false });

const RosterPage: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <BasePage
      title="TFR Roster Builder"
      header={
        <DefaultHeader
          titleAffect={
            <>
              <span className="text-white dark:text-[hsl(280,100%,70%)]">
                Roster
              </span>
            </>
          }
        />
      }
    >
      <div className="w-full px-8 py-12 md:px-16 xl:px-24">
        <RosterMaker />
      </div>
    </BasePage>
  );
};

export default RosterPage;
