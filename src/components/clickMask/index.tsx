import { useEffect, useMemo, useState } from "react";
import { Position } from "../hoverMask";
import ReactDOM from "react-dom";
import {
  getComponentById,
  useComponentsStore,
} from "../../editor/stores/components/components";
import { Dropdown, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useComponentConfigStore } from "../../editor/stores/components/component-config";

interface ClickMaskProps {
  componentId: number;
  wrapperClassName: string;
  containerClassName: string;
}

function ClickMask(props: ClickMaskProps) {
  const { componentId, wrapperClassName, containerClassName } = props;

  const { components, curComponent, setCurComponentId, deleteComponent } =
    useComponentsStore();
  const { componentConfig } = useComponentConfigStore();
  const [position, setPosition] = useState<Position>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    labelLeft: 0,
    labelTop: 0,
  });

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

    const { width, height, left, top } = currentDom.getBoundingClientRect();
    const { left: containerLeft, top: containerTop } =
      container.getBoundingClientRect();

    const scrollTop = container.scrollTop;
    const scrollLeft = container.scrollLeft;
    const labelTop = top - containerTop + container.scrollTop;
    const labelLeft = left - containerLeft + width;
    setPosition({
      left: left - containerLeft + scrollLeft,
      top: top - containerTop + scrollTop,
      width,
      height,
      labelTop,
      labelLeft,
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
    setTimeout(() => {
      updatePosition();
    }, 200);
  }, [componentId, components]);

  const handleDelete = () => {
    deleteComponent(componentId);
    setCurComponentId(undefined);
  };

  const parentComponents = useMemo(() => {
    const parentComponents = [];
    let component = curComponent;
    while (component?.parentId) {
      component = getComponentById(component.parentId, components)!;
      parentComponents.push(component);
    }
    return parentComponents;
  }, [curComponent, components]);
  return document.querySelector("." + wrapperClassName)
    ? ReactDOM.createPortal(
        <div
          style={{
            position: "absolute",
            left: position.left,
            top: position.top,
            backgroundColor: "rgba(0, 0, 255, 0.1)",
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
              display:
                !position.width || position.width < 10 ? "none" : "inline",
              transform: "translate(-100%, -100%)",
            }}
          >
            <div className="flex border-r-4">
              <Dropdown
                menu={{
                  items: parentComponents.map((item) => ({
                    key: item.id,
                    label: item.name,
                  })),
                  onClick: ({ key }) => {
                    setCurComponentId(+key);
                  },
                }}
                disabled={parentComponents.length === 0}
              >
                <div
                  style={{
                    padding: "0 8px",
                    backgroundColor: "blue",
                    color: "#fff",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    pointerEvents: "auto",
                  }}
                  onClick={(e) => {
                    console.log(e, "click");
                  }}
                >
                  {curComponent?.name
                    ? componentConfig[curComponent.name].desc
                    : null}
                </div>
              </Dropdown>

              {componentId !== 1 && (
                <div
                  style={{
                    padding: "0 8px",
                    backgroundColor: "blue",
                    pointerEvents: "auto",
                  }}
                >
                  <Popconfirm
                    title="确认删除？"
                    okText={"确认"}
                    cancelText={"取消"}
                    onConfirm={handleDelete}
                  >
                    <DeleteOutlined style={{ color: "#fff" }} />
                  </Popconfirm>
                </div>
              )}
            </div>
          </div>
        </div>,
        document.querySelector("." + wrapperClassName)!
      )
    : null;
}

export default ClickMask;
