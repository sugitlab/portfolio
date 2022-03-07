import Head from "next/head";
import { useLocale } from "../hooks/locale";
import Layout from "../components/layout";
import { getAllPostsInfo, PostDataType } from "../lib/posts";
import BlogPostCard from "../components/blogpost_card";

type BlogProps = {
  allPostsData: PostDataType[];
};

const Blog = (props: BlogProps) => {
  const { t } = useLocale();
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <div className="divide-solid divide-gray-200 divide-y-2 dark:divide-gray-800 flex flex-col">
        {props.allPostsData.map((data, index) => {
          return <BlogPostCard key={index} {...data} />;
        })}
      </div>
    </>
  );
};

export default Blog;

export async function getStaticProps() {
  const allPostsData: PostDataType[] = getAllPostsInfo();

  return {
    props: {
      allPostsData,
    },
  };
}

Blog.getLayout = function getlayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
