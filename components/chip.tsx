type ChipProps = {
  title: string;
  tw_color: string;
};

const Chip = (props: ChipProps) => {
  return (
    <div className="flex flex-row">
      <p
        className={`w-auto text-xs px-2 text-gray-100 text-center rounded-full ${props.tw_color}`}
      >
        {props.title}
      </p>
    </div>
  );
};

export default Chip;
