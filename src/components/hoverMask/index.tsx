import { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import {
  getComponentById,
  useComponentsStore,
} from "../../editor/stores/components/components";
import { useComponentConfigStore } from "../../editor/stores/components/component-config";

interface HoverMaskProps {
  componentId: number;
  wrapperClassName: string;
  containerClassName: string;
}

export interface Position {
  left: number;
  top: number;
  width: number;
  height: number;
  labelLeft: number;
  labelTop: number;
}

function HoverMask(props: HoverMaskProps) {
  const { wrapperClassName, componentId, containerClassName } = props;
  const [position, setPosition] = useState<Position>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    labelLeft: 0,
    labelTop: 0,
  });
  const { componentConfig } = useComponentConfigStore();
  const { components } = useComponentsStore();
  const name = useMemo(() => {
    return getComponentById(componentId, components);
  }, [componentId]);
  const updatePosition = () => {
    const container = document.querySelector("." + containerClassName);
    if (!container) {
      return;
    }
    const currentDom = container.querySelector(
      `[data-component-id="${componentId}"]`
    );
    if (!currentDom) {
      return;
    }
    const { width, height, top, left } = currentDom.getBoundingClientRect();
    const { left: containerLeft, top: containerTop } =
      container.getBoundingClientRect();
    setPosition({
      width: width,
      height: height,
      top: top - containerTop + container.scrollTop,
      left: left - containerLeft + container.scrollLeft,
      labelLeft: left - containerLeft + width,
      labelTop: top - containerTop + container.scrollTop,
    });
  };

  useEffect(() => {
    const resizeHandler = () => {
      updatePosition();
    };
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  useEffect(() => {
    updatePosition();
  }, [componentId, components]);

  return ReactDOM.createPortal(
    <div
      style={{
        position: "absolute",
        left: position.left,
        top: position.top,
        backgroundColor: "rgba(0, 0, 255, 0.05)",
        border: "1px dashed blue",
        pointerEvents: "none",
        width: position.width,
        height: position.height,
        zIndex: 12,
        borderRadius: 4,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: position.labelLeft,
          top: position.labelTop <= 0 ? position.labelTop + 20 : 0,
          fontSize: "14px",
          zIndex: 13,
          display: !position.width || position.width < 10 ? "none" : "inline",
          transform: "translate(-100%, -100%)",
        }}
      >
        <div
          style={{
            padding: "0 8px",
            backgroundColor: "blue",
            borderRadius: 4,
            color: "#fff",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {name?.name ? componentConfig[name.name].desc : null}
        </div>
      </div>
    </div>,
    document.querySelector("." + wrapperClassName)!
  );
}

export default HoverMask;
