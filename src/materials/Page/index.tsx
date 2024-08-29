import { message } from "antd";
import { type PropsWithChildren } from "react";
import { useDrop } from "react-dnd";
import { useComponentsStore } from "../../editor/stores/components/components";
import { useComponentConfigStore } from "../../editor/stores/components/component-config";

interface PageViewProps extends PropsWithChildren {
  id: number;
}

function Page({ children, id }: PageViewProps) {
  const { addComponent } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();
  const [{ canDrop }, drop] = useDrop(() => ({
    accept: ["Button", "Container"],
    drop: (item: { type: string }, monitor) => {
      message.success(item.type);
      if (monitor.didDrop()) {
        return;
      }
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
    <div ref={drop} data-component-id={id} className="p-[20] h-[100%] box-border">
      {children}
    </div>
  );
}

export default Page;
