import type { CSSProperties, PropsWithChildren } from "react";
import { useComponentsStore } from "../../editor/stores/components/components";
import { useComponentConfigStore } from "../../editor/stores/components/component-config";
import { useDrop } from "react-dnd";

interface ContainerProps extends PropsWithChildren {
  id: number;
  styles: CSSProperties
}

function Container({ children, id, styles }: ContainerProps) {
  const { addComponent } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  const [{ canDrop }, drop] = useDrop(() => ({
    accept: ["Button", "Container"],
    drop: (item: { type: string }, monitor) => {
      if (monitor.didDrop()) {
        return;
      }
      const config = componentConfig[item.type];
      const props = config.defaultProps;

      addComponent(
        {
          id: new Date().getTime(),
          name: item.type,
          desc: config.desc,
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
      data-component-id={id}
      style={styles}
    >
      {children}
    </div>
  );
}

export default Container;
