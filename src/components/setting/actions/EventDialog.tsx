/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Segmented } from "antd";
import type { ComponentEvent } from "../../../editor/stores/components/component-config";
import { useEffect, useState } from "react";
import GoToLink, { type GoToLinkConfig } from "./GoLink";
import ShowMessage, { type ShowMessageConfig } from "./ShowMessage";
import { Component } from "../../../editor/stores/components/components";
import CustomJS, { CustomJSConfig } from "./CustomJS";

interface ViewProps {
  open: boolean;
  eventConfig: ComponentEvent;
  onClose: () => void;
  handleOk: (config: {
    goLinkConfig: GoToLinkConfig | null;
    showMessageConfig: ShowMessageConfig | null;
    customJsConfig: CustomJSConfig | null;
  }) => void;
  curComponent?: Component;
}

function EventDialog(props: ViewProps) {
  const { open, onClose, handleOk, curComponent, eventConfig } = props;
  const [key, setKey] = useState<string>("访问链接");

  const [curConfig, setCurConfig] = useState<{
    goLinkConfig: GoToLinkConfig | null;
    showMessageConfig: ShowMessageConfig | null;
    customJsConfig: CustomJSConfig | null;
  }>({
    goLinkConfig: null,
    showMessageConfig: null,
    customJsConfig: null,
  });

  useEffect(() => {
    if (curComponent && open && eventConfig) {
      const currentActions =
        curComponent.props?.[eventConfig.name]?.actions || [];
      const goLinkConfig = currentActions.find(
        (c: any) => c.type === "goToLink"
      );
      const showMessageConfig = currentActions.find(
        (c: any) => c.type === "showMessage"
      );
      const customJsConfig = currentActions.find(
        (c: any) => c.type === "customJS"
      );
      setCurConfig({
        goLinkConfig: goLinkConfig || null,
        showMessageConfig: showMessageConfig || null,
        customJsConfig: customJsConfig || null,
      });
    }
  }, [curComponent, open, eventConfig]);

  return (
    <Modal
      okText="添加"
      cancelText="取消"
      open={open}
      onCancel={onClose}
      title="事件动作配置"
      width="800"
      onOk={() => {
        handleOk(curConfig);
      }}
    >
      <div className="h-[500px]">
        <Segmented
          value={key}
          onChange={setKey}
          block
          options={["访问链接", "消息提示", "自定义 JS"]}
        />
        {key === "访问链接" && (
          <GoToLink
            onChange={(item) => {
              setCurConfig((pre) => {
                return {
                  ...pre,
                  goLinkConfig: { ...item },
                };
              });
            }}
            defaultValue={curConfig.goLinkConfig?.url}
          />
        )}
        {key === "消息提示" && (
          <ShowMessage
            onChange={(item) => {
              setCurConfig((pre) => {
                return {
                  ...pre,
                  showMessageConfig: { ...item },
                };
              });
            }}
            defaultValue={curConfig.showMessageConfig?.config}
          />
        )}
        {key === "自定义 JS" && (
          <CustomJS
            onChange={(item) => {
              setCurConfig((pre) => {
                return {
                  ...pre,
                  customJsConfig: { ...item },
                };
              });
            }}
            defaultValue={curConfig.customJsConfig?.code}
          />
        )}
      </div>
    </Modal>
  );
}

export default EventDialog;
