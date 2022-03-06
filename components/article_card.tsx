import Image from "next/image";
import Link from "next/link";
import Chip from "./article_chip";
import { Article, ArticleType } from "../lib/article";

type CardHeaderProps = {
  height: number;
  width: number;
  type: ArticleType;
};

const CardHeader = (props: CardHeaderProps) => {
  let path: string = "/media";
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
      path = "/avatar.png";
      break;
  }

  return (
    <Image
      className="block m-auto"
      height={props.height}
      width={props.width}
      objectFit="contain"
      src={path}
      alt="Icon"
    />
  );
};

const ArticleCard = (props: Article) => {
  // 雑に YYYY-MM-DD で切り取る
  const dateStr = props.published.slice(0, 10);

  return (
    <div>
      <Link href={props.url} passHref>
        <a>
          <div className="flex flex-row items-center container h-28 rounded-xl p-2">
            <div className="flex justify-center min-w-mw w-16 h-16 bg-gray-200 dark:bg-white rounded-2xl">
              <CardHeader height={40} width={40} type={props.type} />
            </div>
            <div className="flex flex-col px-4 gap-1">
              <p className="flex-1 line-clamp-2 leading-tight text-md font-bold dark:text-gray-200">
                {props.title}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {dateStr}
              </p>
              <Chip category={props.category} />
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ArticleCard;
