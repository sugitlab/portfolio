import React from "react";
import type { GetStaticProps } from "next";
import Head from "next/head";
import Layout from "../components/layout";
import { useLocale } from "../hooks/locale";
import ArticleCard from "../components/article_card";
import { getArticles, Article } from "../lib/article";

const Articles = ({ articles }: { articles: Article[] }) => {
  const { t } = useLocale();
  return (
    <>
      <div className="divide-solid divide-gray-200 divide-y-2 dark:divide-gray-800 flex flex-col">
        {articles.map((data, index) => {
          return <ArticleCard key={index} {...data} />;
        })}
      </div>
    </>
  );
};

const Home = ({ allArticles }: { allArticles: Article[] }) => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Articles articles={allArticles} />;
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const allArticles = getArticles();
  return {
    props: {
      allArticles,
    },
  };
};

Home.getLayout = function getlayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
