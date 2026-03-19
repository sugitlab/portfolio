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
      {/* Section header */}
      <div className="mb-6">
        <p className="font-display text-sg-xs text-sg-blue-400 tracking-widest uppercase mb-1">
          Blog
        </p>
        <h1 className="font-display font-bold text-sg-2xl text-sg-gray-950 dark:text-sg-gray-100 tracking-tight">
          {t.BLOG}
        </h1>
      </div>
      <div className="flex flex-col gap-3">
        {props.allPostsData.length > 0 ? (
          props.allPostsData.map((data, index) => {
            return <BlogPostCard key={index} {...data} />
          })
        ) : (
          <div className="flex justify-center items-center h-64 font-display text-sg-base text-sg-gray-500">
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

  const serializablePostsData = allPostsData.map(post => ({
    ...post,
    date: post.date instanceof Date ? post.date.toISOString() : post.date
  }))

  return {
    props: {
      allPostsData: serializablePostsData,
    },
  }
}

Blog.getLayout = function getlayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
