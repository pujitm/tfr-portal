import Head from "next/head";
import type { PropsWithChildren, ReactNode } from "react";
import BaseMeta from "./BaseMeta";
import { Avatar, AvatarFallback, AvatarImage } from "./primitive/Avatar";
import DefaultHeader from "./DefaultHeader";

type BasePageProps = PropsWithChildren<{
  /**
   * Meta tags (title, description, links, SEO)
   *
   * Will go inside a <Head> element. Overrides `title` and `description`
   */
  meta?: ReactNode;
  /** Content of the <title> meta tag. Ignored if `meta` is defined. */
  title?: string;
  /** Content of the description meta tag. Ignored if `meta` is defined. */
  description?: string;
  /** The header at the top of the page. Uses default if not defined. */
  header?: ReactNode;
}>;
export default function BasePage(props: BasePageProps) {
  const Meta = props.meta ?? (
    <BaseMeta title={props.title} description={props.description} />
  );
  const Header = props.header ?? <DefaultHeader />;
  return (
    <>
      <Head>{Meta}</Head>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-800/40 transition-all animate-in fade-in duration-1000 ease-in-out dark:bg-gray-800">
        {/* <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-orange-100 py-16"> */}
        {Header}
        {props.children}
      </div>
    </>
  );
}
