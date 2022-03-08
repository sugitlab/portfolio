import { useLocale } from '../hooks/locale'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { getAllPostsInfo, PostDataType } from '../lib/posts'
import BlogPostCard from '../components/blog_post_card'

type BlogProps = {
  allPostsData: PostDataType[]
}

const Blog = (props: BlogProps) => {
  const { t } = useLocale()
  return (
    <>
      <Seo pageTitle="Blog" pageDescription="Blog posts by sugit." />
      <div className="divide-solid divide-gray-200 divide-y-2 dark:divide-gray-800 flex flex-col">
        {props.allPostsData.length > 0 ? (
          props.allPostsData.map((data, index) => {
            return <BlogPostCard key={index} {...data} />
          })
        ) : (
          <div className="flex justify-center items-center h-64 text-xl dark:text-gray-100">
            No Post
          </div>
        )}
      </div>
    </>
  )
}

export default Blog

export async function getStaticProps() {
  const allPostsData: PostDataType[] = getAllPostsInfo()

  return {
    props: {
      allPostsData,
    },
  }
}

Blog.getLayout = function getlayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
