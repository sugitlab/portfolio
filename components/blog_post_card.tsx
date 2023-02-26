import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";
import { getIcon } from "./icon";
import { PostDataType } from "../lib/posts";

type BlogPostCardHeaderProps = {
  iconType?: string;
};

const BlogPostCardHeader = (props: BlogPostCardHeaderProps) => {
  return (
    <Box
      sx={{
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {getIcon(props.iconType, 40)}
    </Box>
  );
};

const BlogPostCard = (props: PostDataType) => {
  return (
    <div>
      <Link href={`/posts/${props.slug}`} locale="" passHref>
          <div className="flex flex-row items-center container h-28 rounded-xl p-2">
            <div className="flex justify-center min-w-mw w-16 h-16 bg-gray-200 dark:bg-white rounded-2xl">
              <BlogPostCardHeader iconType={props.icon} />
            </div>
            <div className="flex flex-col px-4 gap-1">
              <p className="flex-1 line-clamp-2 leading-tight text-md font-bold dark:text-gray-200">
                {props.title}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {props.date.toString()}
              </p>
            </div>
          </div>
      </Link>
    </div>
  );
};

export default BlogPostCard;
