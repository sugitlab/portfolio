import React from 'react'
import type { GetStaticProps } from 'next'
import Layout from '../components/layout'
import Seo from '../components/seo'
import ArticleCard from '../components/article_card'
import { getArticles, Article } from '../lib/article'

const Articles = ({ articles }: { articles: Article[] }) => {
  return (
    <div className="flex flex-col gap-3">
      {articles.map((data, index) => {
        return <ArticleCard key={index} {...data} />
      })}
    </div>
  )
}

const Home = ({ allArticles }: { allArticles: Article[] }) => {
  return (
    <>
      <Seo
        pageTitle="Home"
        pageDescription="List of published articles on social medias."
      />
      {/* Section header */}
      <div className="mb-6">
        <p className="font-display text-sg-xs text-sg-blue-400 tracking-widest uppercase mb-1">
          Latest
        </p>
        <h1 className="font-display font-bold text-sg-2xl text-sg-gray-950 dark:text-sg-gray-100 tracking-tight">
          Articles
        </h1>
      </div>
      <Articles articles={allArticles} />
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const allArticles = getArticles()
  return {
    props: {
      allArticles,
    },
  }
}

Home.getLayout = function getlayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
