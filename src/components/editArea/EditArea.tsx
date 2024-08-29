import React, { useState } from "react";
import type { MouseEventHandler, ReactNode } from "react";
import {
  Component,
  useComponentsStore,
} from "../../editor/stores/components/components";
import { useComponentConfigStore } from "../../editor/stores/components/component-config";
import HoverMask from "../hoverMask";

function EditArea() {
  const { components } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();
  const [hoverComponentId, setHoverComponentId] = useState<
    number | undefined
  >();

  const renderComponents = (components: Component[]): ReactNode => {
    return components.map((c) => {
      const config = componentConfig?.[c.name];
      if (!config) {
        return null;
      }
      return React.createElement(
        config.component,
        {
          key: c.id,
          id: c.id,
          name: c.name,
          ...config.defaultProps,
          ...c.props,
        },
        renderComponents(c.children || [])
      );
    });
  };

  const handleHover: MouseEventHandler = (e) => {
    const path = e.nativeEvent.composedPath();
    for (let i = 0; i < path.length; i++) {
      const node = path[i] as HTMLElement;
      const componentId = node.dataset?.componentId;
      if (componentId) {
        setHoverComponentId(+componentId);
        return;
      }
    }
  };

  return (
    <div
      className="h-[100%] edit-area"
      onMouseOver={handleHover}
      onMouseLeave={() => {
        setHoverComponentId(undefined);
      }}
    >
      {renderComponents(components)}
      {hoverComponentId && (
        <HoverMask
          containerClassName="edit-area"
          wrapperClassName="portal-wrapper"
          componentId={hoverComponentId}
        />
      )}
      <div className="portal-wrapper"></div>
    </div>
  );
}

export default EditArea;
