import type { ReactNode } from "react";
import { Component, useComponentsStore } from "../../editor/stores/components/components";
import { useComponentConfigStore } from "../../editor/stores/components/component-config";
import React from "react";

function Preview() {

  const { components } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  const renderComponents = (components: Component[]): ReactNode => {
    return components.map((c) => {
      const config = componentConfig?.[c.name];
      if (!config) {
        return null;
      }
      return React.createElement(
        config.previewComponent,
        {
          key: c.id,
          id: c.id,
          name: c.name,
          ...config.defaultProps,
          ...c.props,
          styles: c.styles
        },
        renderComponents(c.children || [])
      );
    });
  };

  return <div className="h-[100%]">{renderComponents(components)}</div>;
}

export default Preview;
