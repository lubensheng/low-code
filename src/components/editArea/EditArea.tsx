import React, { useEffect } from "react";
import type { ReactNode } from "react";
import {
  Component,
  useComponentsStore,
} from "../../editor/stores/components/components";
import { useComponentConfigStore } from "../../editor/stores/components/component-config";

function EditArea() {
  const { components } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();
  useEffect(() => {}, []);

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

  return (
    <div className="h-[100%]">
      {/* <pre>{JSON.stringify(components, null, 2)}</pre> */}
      {renderComponents(components)}
    </div>
  );
}

export default EditArea;
