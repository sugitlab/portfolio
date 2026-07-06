import Link from "next/link";
import { getIcon } from "./icon";
import { PostDataType } from "../lib/posts";

type BlogPostCardHeaderProps = {
  iconType?: string;
};

const BlogPostCardHeader = (props: BlogPostCardHeaderProps) => {
  return (
    <div className="flex justify-center items-center m-auto">
      {getIcon(props.iconType, 32)}
    </div>
  );
};

type BlogPostCardProps = Omit<PostDataType, "date"> & {
  date: Date | string;
};

const BlogPostCard = (props: BlogPostCardProps) => {
  const dateObj =
    typeof props.date === "string" ? new Date(props.date) : props.date;
  const formattedDate = dateObj.toISOString().slice(0, 10);

  return (
    <Link href={`/posts/${props.slug}`} locale="" passHref>
      <div className="group flex flex-row items-center gap-4 p-4 rounded-sg-lg border border-white/80 bg-white/80 dark:bg-sg-dark-surface/80 dark:border-white/10 hover:border-sg-green-300/70 hover:shadow-sg-md transition-all duration-300 cursor-pointer backdrop-blur-sm">
        {/* Icon */}
        <div className="flex justify-center items-center w-12 h-12 rounded-2xl bg-sg-blue-100/80 dark:bg-sg-dark-subtle flex-shrink-0 ring-1 ring-sg-blue-200/70 dark:ring-white/10">
          <BlogPostCardHeader iconType={props.icon} />
        </div>
        {/* Content */}
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <p className="font-body font-bold text-sg-base text-sg-gray-950 dark:text-sg-gray-100 line-clamp-2 leading-snug group-hover:text-sg-green-600 dark:group-hover:text-sg-green-300 transition-colors duration-200">
            {props.title}
          </p>
          <span className="font-mono text-sg-xs text-sg-gray-500 tracking-wide">
            {formattedDate}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BlogPostCard;
