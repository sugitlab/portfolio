import { CategoryType } from "../lib/article";

type ChipProps = {
  category: CategoryType;
};

const categoryStyles: Record<string, { bg: string; text: string }> = {
  Tech:      { bg: "bg-sg-blue-100 dark:bg-sg-blue-900/50",  text: "text-sg-blue-700 dark:text-sg-blue-300" },
  PM:        { bg: "bg-amber-100 dark:bg-amber-900/30",       text: "text-amber-700 dark:text-amber-300" },
  LifeHack:  { bg: "bg-sg-green-100 dark:bg-sg-green-600/20", text: "text-sg-green-600 dark:text-sg-green-300" },
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
