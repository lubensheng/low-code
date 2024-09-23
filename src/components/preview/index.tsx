/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from "react";
import {
  Component,
  useComponentsStore,
} from "../../editor/stores/components/components";
import { useComponentConfigStore } from "../../editor/stores/components/component-config";
import React from "react";
import { GoToLinkConfig } from "../setting/actions/GoLink";
import { ShowMessageConfig } from "../setting/actions/ShowMessage";
import { message } from "antd";
import { CustomJSConfig } from "../setting/actions/CustomJS";
// import { message } from "antd";

function Preview() {
  const { components } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  const handleEvent = (component: Component) => {
    const props: Record<string, any> = {};
    componentConfig[component.name].events?.forEach((event) => {
      const eventConfig = component.props[event.name];
      if (eventConfig) {
        // const { type } = eventConfig;
        props[event.name] = () => {
          eventConfig?.actions?.forEach(
            (action: GoToLinkConfig | ShowMessageConfig | CustomJSConfig) => {
              if (action.type === "goToLink") {
                window.location.href = action.url;
              } else if (action.type === "showMessage") {
                if (action.config.type === "success") {
                  message.success(action.config.text);
                } else if (action.config.type === "error") {
                  message.error(action.config.text);
                }
              } else if (action.type === "customJS") {
                const func = new Function("context", action.code);
                func({
                  name: component.name,
                  props: component.props,
                  showMessage(content: string) {
                    message.success(content);
                  },
                });
              }
            }
          );

          // if (type === "goToLink" && eventConfig.url) {
          //   window.location.href = eventConfig.url;
          // } else if (type === "showMessage" && eventConfig.config) {
          //   if (eventConfig.config.type === "success") {
          //     message.success(eventConfig.config.text);
          //   } else if (eventConfig.config.type === "error") {
          //     message.error(eventConfig.config.text);
          //   }
          // }
        };
      }
    });

    return props;
  };

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
          styles: c.styles,
          ...handleEvent(c),
        },
        renderComponents(c.children || [])
      );
    });
  };

  return <div className="h-[100%]">{renderComponents(components)}</div>;
}

export default Preview;
