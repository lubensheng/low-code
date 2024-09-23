import { Input, Select } from "antd";
import { useComponentsStore } from "../../../editor/stores/components/components";
import { useEffect, useState } from "react";

export interface ShowMessageConfig {
  type: "showMessage";
  config: {
    type: "success" | "error";
    text: string;
  };
}

interface ViewProps {
  onChange?: (data: ShowMessageConfig) => void;
  defaultValue?: ShowMessageConfig["config"];
}

export const MessageTypeMap = {
  'success': '成功',
  'error': '失败'
}

function ShowMessage({ defaultValue, onChange }: ViewProps) {
  const { curComponentId } = useComponentsStore();

  const [config, setConfig] = useState<ShowMessageConfig["config"]>(
    defaultValue || {
      text: "",
      type: "success",
    }
  );

  useEffect(() => {
    setConfig(defaultValue || { text: "", type: "success" });
  }, [defaultValue]);

  const textChange = (value: string) => {
    if (!curComponentId) {
      return;
    }
    setConfig((pre) => ({ ...pre, text: value }));
    onChange?.({
      type: "showMessage",
      config: {
        ...(config || {}),
        text: value,
      },
    });
  };

  const typeChange = (value: "success" | "error") => {
    if (!curComponentId) {
      return;
    }
    setConfig((pre) => ({ ...pre, type: value }));
    onChange?.({
      type: "showMessage",
      config: {
        ...(config || {}),
        type: value,
      },
    });
  };

  return (
    <div className="mt-[10px]">
      <div className="flex items-center">
        <div>类型：</div>
        <div>
          <Select
            onChange={(value) => {
              typeChange(value);
            }}
            style={{ width: 500, height: 50 }}
            placeholder="请输入消息类型"
            value={config?.type}
            allowClear={false}
            options={[
              { label: "成功", value: "success" },
              { label: "失败", value: "error" },
            ]}
          />
        </div>
      </div>
      <div className="flex items-center mt-[10px]">
        <div>文本：</div>
        <div>
          <Input
            onChange={(e) => {
              textChange(e.target.value);
            }}
            style={{ width: 500, height: 50 }}
            placeholder="请输入文本"
            value={config?.text}
          />
        </div>
      </div>
    </div>
  );
}

export default ShowMessage;
