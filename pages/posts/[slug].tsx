import Link from "next/link";
import Seo from "../../components/seo";
import Head from "next/head";
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "querystring";
import { TiArrowBack } from "react-icons/ti";
import { getAllPostSlugs, getPostData, PostDataType } from "../../lib/posts";
import { getIcon } from "../../components/icon";
import BlogLayout from "../../components/blog_layout";
import "zenn-content-css";
import { SITE_URL } from "../../lib/constants";

const BackTo = () => {
  return (
    <div className="flex py-4">
      <Link href={"/blog"} locale="" passHref>
        <span className="flex items-center gap-2 font-display font-bold text-sg-sm text-sg-gray-500 dark:text-sg-gray-300 hover:text-sg-green-600 dark:hover:text-sg-green-300 transition-colors duration-200 cursor-pointer">
          <TiArrowBack size={20} />
          Back to Blog
        </span>
      </Link>
    </div>
  );
};

type PostProps = Omit<PostDataType, "date"> & {
  date: Date | string;
};

const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return dateObj.toLocaleDateString("en-US", options);
};

const Post = (props: PostProps) => {
  const formattedDate = formatDate(props.date);
  const ogImageUrl = `${SITE_URL}/api/og?title=${encodeURIComponent(props.title)}&icon=${encodeURIComponent(props.icon || "info")}`;

  return (
    <>
      <Head>
        <script src="https://embed.zenn.studio/js/listen-embed-event.js"></script>
      </Head>
      <Seo
        pageTitle={props.title}
        pageDescription="Blog posts by sugit."
        pageImg={ogImageUrl}
        pageImgWidth={1200}
        pageImgHeight={630}
      />
      <BackTo />
      <article className="text-sg-gray-950 dark:text-sg-gray-100 znc bg-white/70 dark:bg-sg-dark-surface/60 rounded-sg-lg border border-white/80 dark:border-white/10 px-5 py-6 md:px-8 md:py-8 shadow-sg-sm backdrop-blur-sm">
        {/* Post header */}
        <div className="flex flex-row items-center gap-4 mb-4">
          <div className="w-16 flex-shrink-0">{getIcon(props.icon, 64)}</div>
          <h1 className="font-display font-bold text-sg-2xl md:text-sg-3xl text-sg-gray-950 dark:text-sg-gray-100 tracking-tight leading-tight">
            {props.title}
          </h1>
        </div>
        <p className="font-mono text-sg-xs text-sg-gray-500 tracking-wide mb-8 border-b border-sg-green-100 dark:border-white/10 pb-4">
          {formattedDate}
        </p>
        <div dangerouslySetInnerHTML={{ __html: props.contentHtml }} />
      </article>
      <BackTo />
    </>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostSlugs();
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
  const { slug } = context.params as Query;
  const postData: PostDataType = await getPostData(slug);

  const serializablePostData = {
    ...postData,
    date:
      postData.date instanceof Date
        ? postData.date.toISOString()
        : postData.date,
  };

  return {
    props: {
      ...serializablePostData,
    },
  };
};

Post.getLayout = function getlayout(page: React.ReactElement) {
  return <BlogLayout>{page}</BlogLayout>;
};
