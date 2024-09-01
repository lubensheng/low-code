import type { CSSProperties, PropsWithChildren } from "react";
import { useDrop } from "react-dnd";
import { useComponentsStore } from "../../editor/stores/components/components";
import { useComponentConfigStore } from "../../editor/stores/components/component-config";

interface PageViewProps extends PropsWithChildren {
  id: number;
  styles: CSSProperties
}

function Page({ children, id, styles = {} }: PageViewProps) {
  const { addComponent } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();
  const [{ canDrop }, drop] = useDrop(() => ({
    accept: ["Button", "Container"],
    drop: (item: { type: string }, monitor) => {
      if (monitor.didDrop()) {
        console.log(canDrop);
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
  
  return (
    <div ref={drop} style={{ ...styles }} data-component-id={id} className="p-[20px] h-[100%] box-border">
      {children}
    </div>
  );
}

export default Page;
