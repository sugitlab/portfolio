import React from "react";
import type { NextPage, GetStaticProps } from "next";
import { useLocale } from "../hooks/locale";
import Profile from "../components/profile_card";
import ArticleCard from "../components/article_card";
import { Article, getPosts } from "../lib/posts";

const Articles = ({ posts }: { posts: Article[] }) => {
  const { t } = useLocale();
  return (
    <div className="container w-4/5 md:w-1/2 mx-auto">
      <p className="py-2 text-center text-2xl font-bold text-indigo-700 dark:text-indigo-400">
        {t.ARTICLES}
      </p>
      <div className="divide-solid divide-gray-200 divide-y-2 dark:divide-gray-800 flex flex-col">
        {posts.map((data, index) => {
          return <ArticleCard key={index} {...data} />;
        })}
      </div>
    </div>
  );
};

const Home = ({ allPosts }: { allPosts: Article[] }) => {
  return (
    <div className="flex flex-col md:flex-row">
      <Articles posts={allPosts} />
      <div className="h-10" />
      <Profile />
    </div>
  );
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
