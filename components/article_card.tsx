import Image from "next/image";
import Link from "next/link";
import Chip from "./chip";
import { Article, ArticleType } from "../lib/posts";

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
  return (
    <div>
      <Link href={props.url} passHref>
        <a>
          <div className="flex flex-row items-center container h-28 rounded-xl p-2">
            <div className="flex justify-center box-content w-20 h-20 bg-gray-200 dark:bg-white rounded-2xl">
              <CardHeader height={50} width={50} type={props.type} />
            </div>
            <div className="flex flex-1 flex-col px-4">
              <p className="flex-1 line-clamp-2 text-lg font-bold dark:text-gray-200">
                {props.title}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {props.published}
              </p>
              <Chip title="Flutter" tw_color="bg-blue-500" />
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ArticleCard;
