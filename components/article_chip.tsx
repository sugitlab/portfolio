import { CategoryType, getCategoryColor } from "../lib/article";

type ChipProps = {
  category: CategoryType;
};

const Chip = (props: ChipProps) => {
  if (props.category == "Tech") {
    return (
      <div className="flex flex-row">
        <p className="w-auto text-xs px-2 text-gray-100 text-center rounded-full bg-blue-600">
          {props.category}
        </p>
      </div>
    );
  } else if (props.category == "LifeHack") {
    return (
      <div className="flex flex-row">
        <p className="w-auto text-xs px-2 text-gray-100 text-center rounded-full bg-green-700">
          {props.category}
        </p>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row">
        <p className="w-auto text-xs px-2 text-gray-100 text-center rounded-full bg-gray-600">
          {props.category}
        </p>
      </div>
    );
  }
};

export default Chip;
