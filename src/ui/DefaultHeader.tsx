import { type ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./primitive/Avatar";
import Link from "next/link";
import ThemeSelect from "./ThemeSelect";

type DefaultHeaderProps = {
  /** Appended after "TFR" in the header */
  titleAffect?: ReactNode;
};
export default function DefaultHeader(props: DefaultHeaderProps) {
  const TitleAffect = props.titleAffect ?? <></>;
  return (
    <header className="hidden w-full justify-between px-8 py-2 md:flex">
      <div className="flex items-center gap-4">
        {/* <Link href={"/"}>
          <Avatar>
            <AvatarImage src="https://cdn.discordapp.com/icons/892840561214627850/a_f6a5d83375b5b844408e18e04318d717.webp?size=240" />
            <AvatarFallback>TFR</AvatarFallback>
          </Avatar>
        </Link> */}
        <Link href={"/"}>
          <p className="text-4xl font-extrabold tracking-tight">
            TFR {TitleAffect}
          </p>
        </Link>
        <div className="mt-1">
          <ThemeSelect />
        </div>
      </div>
      <div className="-mt-1 flex flex-row items-center">
        <div className="mr-8 space-y-0 font-thin">
          <p>Settler</p>
          <h2>Cool Kid</h2>
        </div>
        <div className="mr-8">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
