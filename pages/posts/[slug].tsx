import Head from "next/head";
import Link from "next/link";
import BlogLayout from "../../components/blog_layout";
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "querystring";
import {
  getAllPostSlugs,
  getNeighbors,
  getPostData,
  PostDataType,
} from "../../lib/posts";

// Slugs
type BlogLinkProps = {
  prev?: string;
  next?: string;
};

const BlogLink = (props: BlogLinkProps) => {
  return (
    <>
      <div className="z-50 flex flex-rows py-4 px-4 sticky top-8">
        {props.prev === undefined ? (
          <></>
        ) : (
          <Link href={`/posts/${props.prev}`} locale="" passHref>
            <a className="flex font-bold text-xl dark:text-gray-100">
              {"< Prev"}
            </a>
          </Link>
        )}
        <div className="flex flex-1" />
        {props.next === undefined ? (
          <></>
        ) : (
          <Link href={`/posts/${props.next}`} locale="" passHref>
            <a className="flex font-bold text-xl dark:text-gray-100">
              {"Next >"}
            </a>
          </Link>
        )}
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
      <BlogLink prev={prev} next={next} />
      <article className="text-gray-900 dark:text-gray-100">
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
  const { prev, next } = await getNeighbors(slug);

  return {
    props: {
      ...postData,
    },
    prev: prev,
    next: next,
  };
};

Post.getLayout = function getlayout(page: React.ReactElement) {
  return <BlogLayout>{page}</BlogLayout>;
};
