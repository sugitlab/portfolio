import React from "react";
import type { NextPage, GetStaticProps } from "next";
import { useLocale } from "../hooks/locale";
import ArticleCard from "../components/article_card";
import { getPosts } from "../lib/posts";
import { Article } from "../lib/article";

const Articles = ({ posts }: { posts: Article[] }) => {
  const { t } = useLocale();
  return (
    <>
      <p className="py-2 text-center text-2xl font-bold text-indigo-700 dark:text-indigo-400">
        {t.ARTICLES}
      </p>
      <div className="divide-solid divide-gray-200 divide-y-2 dark:divide-gray-800 flex flex-col">
        {posts.map((data, index) => {
          return <ArticleCard key={index} {...data} />;
        })}
      </div>
    </>
  );
};

const Home = ({ allPosts }: { allPosts: Article[] }) => {
  return <Articles posts={allPosts} />;
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getPosts();
  return {
    props: {
      allPosts,
    },
  };
};
