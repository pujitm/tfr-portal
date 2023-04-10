import Head from "next/head";

type BaseMetaProps = {
  title?: string;
  description?: string;
};
/**
 * Minimum meta tags that should be present on every page
 */
export default function BaseMeta(props: BaseMetaProps) {
  const { title = "TFR Portal", description = "A New World Company portal." } =
    props;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
