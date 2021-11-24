import { CategoryType, getCategoryColor } from "../lib/category";

type ChipProps = {
  category: CategoryType;
};

const Chip = (props: ChipProps) => {
  const category_color = getCategoryColor(props.category);
  return (
    <div className="flex flex-row">
      <p
        className={`w-auto text-xs px-2 text-gray-100 text-center rounded-full ${category_color}`}
      >
        {props.category}
      </p>
    </div>
  );
};

export default Chip;
