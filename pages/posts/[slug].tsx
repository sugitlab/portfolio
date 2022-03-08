import Link from 'next/link'
import Seo from '../../components/seo'
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { TiArrowBack } from 'react-icons/ti'
import { getAllPostSlugs, getPostData, PostDataType } from '../../lib/posts'
import { getIcon } from '../../components/icon'
import BlogLayout from '../../components/blog_layout'
import 'zenn-content-css'

const BackTo = () => {
  return (
    <>
      <div className="z-50 flex flex-rows py-4 px-4">
        <Link href={'/blog'} locale="" passHref>
          <a className="flex font-bold text-xl dark:text-gray-100">
            <TiArrowBack size={30} />
            <p className="px-2">Back</p>
          </a>
        </Link>
      </div>
    </>
  )
}

const Post = (props: PostDataType) => {
  return (
    <>
      <Seo pageTitle={props.title} pageDescription="Blog posts by sugit." />
      <BackTo />
      <article className="text-gray-900 dark:text-gray-100 znc">
        <div className="flex flex-row justify-center items-center">
          <div className="w-20">{getIcon(props.icon, 80)}</div>
          <div className="flex-row">
            <p className="text-4xl px-4">{props.title}</p>
          </div>
        </div>
        <div className="flex justify-center p-4 text-md">{props.date}</div>
        <div dangerouslySetInnerHTML={{ __html: props.contentHtml }} />
      </article>
      <BackTo />
    </>
  )
}

export default Post

export const getStaticPaths: GetStaticPaths = () => {
  const paths = getAllPostSlugs()

  return {
    paths,
    fallback: false,
  }
}

interface Query extends ParsedUrlQuery {
  slug: string
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { slug } = context.params as Query // Uhm....
  const postData: PostDataType = await getPostData(slug)
  return {
    props: {
      ...postData,
    },
  }
}

Post.getLayout = function getlayout(page: React.ReactElement) {
  return <BlogLayout>{page}</BlogLayout>
}
