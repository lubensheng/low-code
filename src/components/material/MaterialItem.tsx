import { useDrag } from "react-dnd";

interface MaterialItemProps {
  name: string;
  desc: string;
}

function MaterialItem(props: MaterialItemProps) {
  const { name, desc } = props;

  const [_, drag] = useDrag({
    type: name,
    item: {
      type: name,
    },
  });

  console.log(_);

  return (
    <div
      ref={drag}
      className="
          border-[1px]
          border-[#000]
          px-[10px] 
          m-[10px]
          cursor-move
          inline-block
          bg-white
          hover:bg-[#ccc]"
    >
      {desc}
    </div>
  );
}

export default MaterialItem;
