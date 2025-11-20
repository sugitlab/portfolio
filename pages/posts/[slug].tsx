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
    <>
      <div className="z-50 flex flex-rows py-4 px-4">
        <Link href={"/blog"} locale="" passHref>
          <div className="flex font-bold text-xl dark:text-gray-100">
            <TiArrowBack size={30} />
            <p className="px-2">Back</p>
          </div>
        </Link>
      </div>
    </>
  );
};

// Modify Post component to accept string dates
type PostProps = Omit<PostDataType, 'date'> & {
  date: Date | string;
};

// Date formatting helper to ensure consistent output between server and client
const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Use explicit options for consistent output
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  return dateObj.toLocaleDateString('en-US', options);
};

const Post = (props: PostProps) => {
  // Use the consistent formatter instead of toString()
  const formattedDate = formatDate(props.date);

  // Generate dynamic OGP image URL
  const ogImageUrl = `${SITE_URL}/api/og?title=${encodeURIComponent(props.title)}&icon=${encodeURIComponent(props.icon || 'info')}`;

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
      <article className="text-gray-900 dark:text-gray-100 znc">
        <div className="flex flex-row justify-center items-center">
          <div className="w-20">{getIcon(props.icon, 80)}</div>
          <div className="flex-row">
            <p className="text-4xl px-4">{props.title}</p>
          </div>
        </div>
        <div className="flex justify-center p-4 text-md">
          {formattedDate}
        </div>
        <div dangerouslySetInnerHTML={{ __html: props.contentHtml }} />
      </article>
      <BackTo />
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
  const { slug } = context.params as Query;
  const postData: PostDataType = await getPostData(slug);
  
  // Convert Date object to ISO string for serialization
  const serializablePostData = {
    ...postData,
    date: postData.date instanceof Date ? postData.date.toISOString() : postData.date
  };
  
  return {
    props: {
      ...serializablePostData,
    },
  };
};

Post.getLayout = function getlayout(page: React.ReactElement) {
  return (
    <>
      <BlogLayout>{page}</BlogLayout>
    </>
  );
};
