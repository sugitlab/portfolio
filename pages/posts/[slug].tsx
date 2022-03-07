import Head from "next/head";
import Link from "next/link";
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "querystring";
import { getAllPostSlugs, getPostData, PostDataType } from "../../lib/posts";
import BlogLayout from "../../components/blog_layout";
import "zenn-content-css";

const BackTo = () => {
  return (
    <>
      <div className="z-50 flex flex-rows py-4 px-4 sticky top-8">
        <Link href={"/blog"} locale="" passHref>
          <a className="flex font-bold text-xl dark:text-gray-100">
            {"< Back"}
          </a>
        </Link>
      </div>
    </>
  );
};

const Post = (props: PostDataType, prev: string, next: string) => {
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <BackTo />
      <article className="text-gray-900 dark:text-gray-100 znc">
        <h1>{props.title}</h1>
        <h3>{props.date}</h3>
        <div dangerouslySetInnerHTML={{ __html: props.contentHtml }} />
      </article>
    </>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = () => {
  const paths = getAllPostSlugs();

  return {
    paths,
    fallback: false,
  };
};

interface Query extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { slug } = context.params as Query; // Uhm....
  const postData: PostDataType = await getPostData(slug);
  return {
    props: {
      ...postData,
    },
  };
};

Post.getLayout = function getlayout(page: React.ReactElement) {
  return <BlogLayout>{page}</BlogLayout>;
};
