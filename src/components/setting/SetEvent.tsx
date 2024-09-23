import { Button, Collapse, CollapseProps } from "antd";
import {
  ComponentEvent,
  useComponentConfigStore,
} from "../../editor/stores/components/component-config";
import { useComponentsStore } from "../../editor/stores/components/components";
import { useState } from "react";
import EventDialog from "./actions/EventDialog";
import { GoToLinkConfig } from "./actions/GoLink";
import { MessageTypeMap, ShowMessageConfig } from "./actions/ShowMessage";
import { DeleteOutlined } from "@ant-design/icons";
import { CustomJSConfig } from "./actions/CustomJS";

function SetEvent() {
  const { componentConfig } = useComponentConfigStore();
  const { curComponent, updateComponentProps } = useComponentsStore();

  // const handleActionChange = (eventName: string, value: string) => {
  //   if (!curComponentId) {
  //     return;
  //   }
  //   updateComponentProps(curComponentId, { [eventName]: { type: value } });
  // };

  const [showBindEvent, setShowBindEvent] = useState<boolean>(false);
  const [eventConfig, setEventConfig] = useState<ComponentEvent | null>();

  const handleShowAddEvent = (eventConfig: ComponentEvent) => {
    setEventConfig(eventConfig);
    setShowBindEvent(true);
  };

  const deleteAction = (name: string, eventName: string) => {
    if (curComponent && eventName) {
      let actions = [...(curComponent.props[eventName]?.actions || [])];
      actions = actions.filter((a) => a.type !== name);
      updateComponentProps(curComponent.id, {
        [eventName]: {
          actions: [...actions],
        },
      });
    }
  };

  const buildItems = (items: ComponentEvent[]): CollapseProps["items"] => {
    return items.map((item) => {
      return {
        key: item.name,
        label: (
          <div className="flex justify-between">
            <div>{item.label}</div>
            <div>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleShowAddEvent(item);
                }}
                type="primary"
              >
                添加事件
              </Button>
            </div>
          </div>
        ),
        children: (
          <div>
            {curComponent?.props?.[item.name]?.actions?.length ? (
              curComponent?.props?.[item.name]?.actions.map(
                (event: GoToLinkConfig | ShowMessageConfig) => {
                  return event.type === "goToLink" ? (
                    <div className="border border-[#aaa] m-[10px] p-[10px] relative">
                      <div className="text-[blue]">链接跳转</div>
                      <div>{event.url}</div>
                      <div
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          cursor: "pointer",
                        }}
                        onClick={() => deleteAction(event.type, item.name)}
                      >
                        <DeleteOutlined />
                      </div>
                    </div>
                  ) : event.type === "showMessage" ? (
                    <div className="border border-[#aaa] m-[10px] p-[10px] relative">
                      <div className="text-[blue]">消息跳转</div>
                      <div>消息类型：{MessageTypeMap[event.config.type]}</div>
                      <div>消息提示：{event.config.text}</div>
                      <div
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          cursor: "pointer",
                        }}
                        onClick={() => deleteAction(event.type, item.name)}
                      >
                        <DeleteOutlined />
                      </div>
                    </div>
                  ) : (
                    <div className="border border-[#aaa] m-[10px] p-[10px] relative">
                      <div className="text-[blue]">自定义js</div>
                      <div
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          deleteAction(
                            (event as CustomJSConfig).type,
                            item.name
                          )
                        }
                      >
                        <DeleteOutlined />
                      </div>
                    </div>
                  );
                }
              )
            ) : (
              <div>暂无数据</div>
            )}
          </div>
        ),
      };
    });
  };

  const items = curComponent?.name
    ? buildItems(componentConfig[curComponent.name].events || [])
    : [];

  return (
    <div className="px-[16px] mt-[10px]">
      <Collapse className="mb-[10px]" items={items}></Collapse>
      <EventDialog
        open={showBindEvent}
        handleOk={(item) => {
          if (
            (item.goLinkConfig ||
              item.showMessageConfig ||
              item.customJsConfig) &&
            curComponent &&
            eventConfig
          ) {
            const actions = [
              ...(curComponent.props[eventConfig.name]?.actions || []),
            ];
            if (item.goLinkConfig) {
              const hasCurrentAction = actions.find(
                (a) => a.type === item.goLinkConfig?.type
              );
              if (hasCurrentAction) {
                hasCurrentAction.url = item.goLinkConfig.url;
              } else {
                actions.push({
                  ...item.goLinkConfig,
                });
              }
            }
            if (item.showMessageConfig) {
              const hasCurrentAction = actions.find(
                (a) => a.type === item.showMessageConfig?.type
              );
              if (hasCurrentAction) {
                hasCurrentAction.config = item.showMessageConfig.config;
              } else {
                actions.push({
                  ...item.showMessageConfig,
                });
              }
            }

            if (item.customJsConfig) {
              const hasCurrentAction = actions.find(
                (a) => a.type === item.customJsConfig?.type
              );
              if (hasCurrentAction) {
                hasCurrentAction.code = item.customJsConfig.code;
              } else {
                actions.push({
                  ...item.customJsConfig,
                });
              }
            }
            updateComponentProps(curComponent.id, {
              [eventConfig.name]: {
                actions: [...actions],
              },
            });
          }
          setShowBindEvent(false);
          setEventConfig(null);
        }}
        eventConfig={eventConfig as ComponentEvent}
        curComponent={curComponent}
        onClose={() => {
          setShowBindEvent(false);
          setEventConfig(null);
        }}
      />
    </div>
  );
}

export default SetEvent;
