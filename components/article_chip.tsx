import { CategoryType } from "../lib/article";

type ChipProps = {
  category: CategoryType;
};

const categoryStyles: Record<string, { bg: string; text: string }> = {
  Tech:      { bg: "bg-blue-100 dark:bg-blue-900/30",    text: "text-blue-700 dark:text-blue-300" },
  PM:        { bg: "bg-amber-100 dark:bg-amber-900/30",  text: "text-amber-700 dark:text-amber-300" },
  LifeHack:  { bg: "bg-green-100 dark:bg-green-900/30",  text: "text-green-700 dark:text-green-300" },
  Other:     { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-700 dark:text-purple-300" },
};

const Chip = (props: ChipProps) => {
  const style = categoryStyles[props.category] ?? {
    bg: "bg-sg-gray-200 dark:bg-sg-dark-muted",
    text: "text-sg-gray-600 dark:text-sg-gray-300",
  };

  return (
    <span
      className={`inline-block font-display text-sg-xs tracking-wider uppercase px-2 py-0.5 rounded-sg-sm ${style.bg} ${style.text}`}
    >
      {props.category}
    </span>
  );
};

export default Chip;
