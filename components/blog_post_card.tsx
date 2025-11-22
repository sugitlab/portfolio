import Image from "next/image";
import Link from "next/link";
import { getIcon } from "./icon";
import { PostDataType } from "../lib/posts";

type BlogPostCardHeaderProps = {
  iconType?: string;
};

const BlogPostCardHeader = (props: BlogPostCardHeaderProps) => {
  return (
    <div className="flex justify-center items-center m-auto">
      {getIcon(props.iconType, 40)}
    </div>
  );
};

// Extend PostDataType but make date accept string as well
type BlogPostCardProps = Omit<PostDataType, 'date'> & {
  date: Date | string;
};

const BlogPostCard = (props: BlogPostCardProps) => {
  // Format the date - works with both Date objects and ISO strings
  const dateObj = typeof props.date === 'string' ? new Date(props.date) : props.date;
  const formattedDate = dateObj.toISOString().slice(0, 10); // YYYY-MM-DD format

  return (
    <div>
      <Link href={`/posts/${props.slug}`} locale="" passHref>
          <div className="flex flex-row items-center container h-28 rounded-xl p-2">
            <div className="flex justify-center flex-shrink-0 w-16 h-16 bg-gray-200 dark:bg-white rounded-2xl">
              <BlogPostCardHeader iconType={props.icon} />
            </div>
            <div className="flex flex-col px-4 gap-1">
              <p className="flex-1 line-clamp-2 leading-tight text-md font-bold dark:text-gray-200">
                {props.title}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {formattedDate}
              </p>
            </div>
          </div>
      </Link>
    </div>
  );
};

export default BlogPostCard;
