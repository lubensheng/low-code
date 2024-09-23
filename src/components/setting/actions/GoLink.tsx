import { Input } from "antd";
import { useComponentsStore } from "../../../editor/stores/components/components";
import { useEffect, useState } from "react";

export interface GoToLinkConfig {
  type: "goToLink";
  url: string;
}

interface ViewProps {
  defaultValue?: string;
  onChange?: (data: GoToLinkConfig) => void;
}

function GoToLink(props: ViewProps) {
  const { curComponentId } = useComponentsStore();

  const { defaultValue, onChange } = props;
  const [value, setValue] = useState<string | undefined>(defaultValue);
  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue]);
  const urlChange = (value: string) => {
    if (!curComponentId) {
      return;
    }
    setValue(value);
    onChange?.({
      type: "goToLink",
      url: value,
    });
  };
  return (
    <div className="mt-[10px]">
      <div className="flex items-center">
        <div>链接：</div>
        <div>
          <Input.TextArea
            onChange={(e) => {
              urlChange(e.target.value);
            }}
            style={{ height: 200, width: 500, border: "1px solid #000" }}
            placeholder="请输入跳转链接"
            value={value}
          />
        </div>
      </div>
    </div>
  );
}

export default GoToLink;
