import Image from "next/image";
import Link from "next/link";
import { FcIdea } from "react-icons/fc";
import Chip from "./article_chip";
import { Article, ArticleType } from "../lib/article";

type CardHeaderProps = {
  height: number;
  width: number;
  type: ArticleType;
};

const CardHeader = (props: CardHeaderProps) => {
  let path: string | undefined = "/media";
  switch (props.type) {
    case "Zenn":
      path += "/zenn.svg";
      break;
    case "Qiita":
      path += "/qiita.png";
      break;
    case "Medium":
      path += "/Medium.svg";
      break;
    case "note":
      path += "/note.svg";
      break;
    default:
      path = undefined;
      break;
  }

  return path === undefined ? (
    <div className="flex justify-center items-center m-auto">
      <FcIdea size="36" />
    </div>
  ) : (
    <Image
      className="block m-auto"
      height={props.height}
      width={props.width}
      style={{ objectFit: "contain" }}
      src={path}
      alt="Icon"
    />
  );
};

const ArticleCard = (props: Article) => {
  const dateStr = props.published.slice(0, 10);

  return (
    <Link href={props.url} passHref>
      <div className="group flex flex-row items-center gap-4 p-4 rounded-sg-lg border border-sg-gray-200 bg-sg-color-bg-surface dark:bg-sg-dark-surface dark:border-sg-dark-muted hover:border-sg-blue-400/40 hover:shadow-sg-md transition-all duration-200 cursor-pointer">
        {/* Icon */}
        <div className="flex justify-center items-center w-12 h-12 rounded-sg-md bg-sg-gray-100 dark:bg-sg-dark-subtle flex-shrink-0">
          <CardHeader height={32} width={32} type={props.type} />
        </div>
        {/* Content */}
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <p className="font-body font-bold text-sg-base text-sg-gray-950 dark:text-sg-gray-100 line-clamp-2 leading-snug group-hover:text-sg-blue-400 transition-colors duration-200">
            {props.title}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-display text-sg-xs text-sg-gray-500 tracking-wide">
              {dateStr}
            </span>
            <Chip category={props.category} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
