import Head from "next/head";
import Layout from "../components/layout";

const Blog = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <div className="p-1">Blog</div>
    </>
  );
};

export default Blog;

Blog.getLayout = function getlayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
