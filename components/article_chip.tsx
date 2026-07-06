import { CategoryType } from "../lib/article";

type ChipProps = {
  category: CategoryType;
};

const categoryStyles: Record<string, { bg: string; text: string }> = {
  Tech:      { bg: "bg-sg-blue-100 dark:bg-sg-blue-900/40",    text: "text-sg-blue-700 dark:text-sg-blue-200" },
  PM:        { bg: "bg-sg-lime-100 dark:bg-sg-lime-300/20",    text: "text-sg-gray-700 dark:text-sg-lime-100" },
  LifeHack:  { bg: "bg-sg-green-100 dark:bg-sg-green-600/25",  text: "text-sg-green-600 dark:text-sg-green-200" },
  Other:     { bg: "bg-sg-gray-100 dark:bg-sg-dark-subtle",    text: "text-sg-gray-600 dark:text-sg-gray-300" },
};

const Chip = (props: ChipProps) => {
  const style = categoryStyles[props.category] ?? {
    bg: "bg-sg-gray-100 dark:bg-sg-dark-muted",
    text: "text-sg-gray-600 dark:text-sg-gray-300",
  };

  return (
    <span
      className={`inline-block font-display font-bold text-sg-xs tracking-wider uppercase px-2.5 py-1 rounded-full ${style.bg} ${style.text}`}
    >
      {props.category}
    </span>
  );
};

export default Chip;
