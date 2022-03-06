import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import { getAllPostsInfo, PostDataType } from "../lib/posts";

type BlogProps = {
  allPostsData: PostDataType[];
};

const Blog = (props: BlogProps) => {
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <div className="text-gray-900 dark:text-gray-100">
        <ul>
          {props.allPostsData.map((post) => (
            <li key={post.slug}>
              <Link href={`/posts/${post.slug}`} passHref>
                <a>{post.title}</a>
              </Link>
              <br />
              <small>
                <p>{post.date}</p>
              </small>
            </li>
          ))}
        </ul>
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
