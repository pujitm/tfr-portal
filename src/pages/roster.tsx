import { type NextPage } from "next";
import dynamic from "next/dynamic";
import { Label } from "@radix-ui/react-dropdown-menu";

import { api } from "~/utils/api";
import BasePage from "~/ui/BasePage";
import DefaultHeader from "~/ui/DefaultHeader";
import { TabsDemo } from "~/ui/TabsDemo";
import { Button } from "~/ui/primitive/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/ui/primitive/card";
import { Input } from "~/ui/primitive/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/ui/primitive/tabs";

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
        {/* <TabsDemo /> */}
        <Tabs defaultValue="roster" className="">
          <TabsList className="grid grid-cols-2 w-[400px]">
            <TabsTrigger value="players">Players</TabsTrigger>
            <TabsTrigger value="roster">Roster</TabsTrigger>
          </TabsList>
          <TabsContent value="players">
            <Card>
              <CardHeader>
                <CardTitle>Player List</CardTitle>
                <CardDescription>
                  List of all players with various sorting views
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">Hi</CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="roster">
            <RosterMaker />
          </TabsContent>
        </Tabs>
      </div>
    </BasePage>
  );
};

export default RosterPage;
