import type { PropsWithChildren, ReactNode } from "react";

import cn from "~/utils/classnames";
import DefaultHeader from "./DefaultHeader";
import DefaultMeta from "./DefaultMeta";

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
  className?: string;
}>;
export default function BasePage(props: BasePageProps) {
  const Meta = props.meta ?? (
    <DefaultMeta title={props.title} description={props.description} />
  );
  const Header = props.header ?? <DefaultHeader />;
  return (
    <>
      {Meta}
      <div
        className={cn(
          "flex min-h-screen flex-col items-center bg-gradient-to-br from-indigo-800/40 transition-all animate-in fade-in duration-1000 ease-in-out dark:bg-gray-800",
          props.className
        )}
      >
        {/* <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-orange-100 py-16"> */}
        {Header}
        {props.children}
      </div>
    </>
  );
}
