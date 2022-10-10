import Head from "next/head";

const Seo = ({Seo}) => {
  // console.log(Seo);
  return (
    <Head>
      <meta charSet="utf-8" name="keywords" content="IMPC" />
      <title>{Seo.PageTitle}</title>
      <meta name="title" content={Seo?.MetaTitle} />
      <meta name="description" content={Seo.MetaDescription} />
      <meta name="keywords" content={Seo.MetaKeyWords} />

      {/* OG */}
      <meta property="og:title" content={Seo?.MetaTitle} />
      <meta property="og:url" content={process.env.BASE_URL} />
      <meta property="og:type" content="website" />

      <meta property="og:site_name" content="IMPC" />
      <meta property="og:description" content={Seo.MetaDescription} />
      <meta property="og:image:url" content={Seo?.MetaImage?.url} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="500" />
      <meta property="og:image:height" content="300" />
    </Head>
  );
};
export default Seo;
