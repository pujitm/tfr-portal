import Head from "next/head";
import type { PropsWithChildren, ReactNode } from "react";
import BaseMeta from "./BaseMeta";

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
}>;
export default function BasePage(props: BasePageProps) {
  const Meta = props.meta ?? (
    <BaseMeta title={props.title} description={props.description} />
  );
  return (
    <>
      <Head>{Meta}</Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] py-16">
        {/* <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-orange-100 py-16"> */}
        {props.children}
      </main>
    </>
  );
}
