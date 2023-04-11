import { type NextPage } from "next";
import dynamic from "next/dynamic";
import { api } from "~/utils/api";
import BasePage from "~/ui/BasePage";
import DefaultMeta from "~/ui/DefaultMeta";
import DefaultHeader from "~/ui/DefaultHeader";
import PushForm from "~/ui/forms/Push";

const RosterMaker = dynamic(() => import("../ui/RosterMaker"), { ssr: false });

const PushCreditPage: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <BasePage
      title="TFR Push Credit"
      header={
        <DefaultHeader
          titleAffect={
            <>
              <span className="text-white dark:text-[hsl(280,100%,70%)]">
                Credit
              </span>
            </>
          }
        />
      }
    >
      <div className="container w-full px-8 py-12 md:px-16 xl:px-24">
        <div className="space-y-12">
          <PushForm initiallyOpen />
          <PushForm />
          <PushForm />
        </div>
      </div>
    </BasePage>
  );
};

export default PushCreditPage;
