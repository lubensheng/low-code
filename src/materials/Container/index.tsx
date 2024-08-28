import type { PropsWithChildren } from "react";
import { useComponentsStore } from "../../editor/stores/components/components";
import { useComponentConfigStore } from "../../editor/stores/components/component-config";
import { useDrop } from "react-dnd";
import { message } from "antd";

interface ContainerProps extends PropsWithChildren {
  id: number;
}

function Container({ children, id }: ContainerProps) {
  const { addComponent } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  const [{ canDrop }, drop] = useDrop(() => ({
    accept: ["Button", "Container"],
    drop: (item: { type: string }, monitor) => {
      if (monitor.didDrop()) {
        return;
      }
      message.success(item.type);

      const config = componentConfig[item.type];
      const props = config.defaultProps;

      addComponent(
        {
          id: new Date().getTime(),
          name: item.type,
          props,
        },
        id
      );
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  }));
  console.log(canDrop);
  return (
    <div
      ref={drop}
      className="min-h-[100px] border-[#000] border-[1px] p-[10px]"
    >
      {children}
    </div>
  );
}

export default Container;
