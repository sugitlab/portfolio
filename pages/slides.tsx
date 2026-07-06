import React from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { slideDecks, SlideDeck } from "../lib/slides";

const SlideCard = (props: SlideDeck) => {
  return (
    <a
      href={props.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-sg-lg border border-white/80 bg-white/80 shadow-sg-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-sg-green-300/70 hover:shadow-sg-md dark:border-white/10 dark:bg-sg-dark-surface/80"
    >
      <div className="aspect-video overflow-hidden bg-sg-green-100 dark:bg-sg-dark-subtle">
        <img
          src={props.image}
          alt={props.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-display text-sg-lg font-bold leading-snug text-sg-gray-950 transition-colors duration-200 group-hover:text-sg-green-600 dark:text-sg-gray-100 dark:group-hover:text-sg-green-300">
            {props.title}
          </h2>
          <ArrowTopRightOnSquareIcon className="mt-1 h-5 w-5 flex-shrink-0 text-sg-gray-400 transition-colors duration-200 group-hover:text-sg-green-600 dark:text-sg-gray-300 dark:group-hover:text-sg-green-300" />
        </div>
        <p className="font-mono text-sg-xs tracking-wide text-sg-gray-500 dark:text-sg-gray-300">
          Open slide deck
        </p>
      </div>
    </a>
  );
};

const Slides = () => {
  return (
    <>
      <Seo pageTitle="Slides" pageDescription="Slide decks by sugit." />
      <div className="mb-8">
        <p className="mb-1 font-display text-sg-xs font-bold uppercase tracking-widest text-sg-green-600 dark:text-sg-green-300">
          Slides
        </p>
        <h1 className="font-display text-sg-2xl font-bold tracking-tight text-sg-gray-950 dark:text-sg-gray-100">
          スライド
        </h1>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {slideDecks.map((deck) => (
          <SlideCard key={deck.url} {...deck} />
        ))}
      </div>
    </>
  );
};

export default Slides;

Slides.getLayout = function getlayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
