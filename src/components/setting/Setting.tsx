import { Segmented } from "antd";
import { useComponentsStore } from "../../editor/stores/components/components";
import { useState } from "react";
import SetAttr from "./SetAttr";
import SetCss from "./SetCss";
import SetEvent from "./SetEvent";

function Setting() {
  const { curComponent } = useComponentsStore();
  const [key, setKey] = useState<string>("属性");
  if (!curComponent) {
    return null;
  }

  const handleSegmentedChange = (value: string) => {
    setKey(value);
  };

  return (
    <div>
      {/* <pre>{JSON.stringify(components, null, 2)}</pre> */}
      <Segmented
        value={key}
        onChange={handleSegmentedChange}
        block
        options={["属性", "样式", "事件"]}
      />
      {key === "属性" && <SetAttr />}
      {key === "样式" && <SetCss />}
      {key === "事件" && <SetEvent />}
    </div>
  );
}

export default Setting;
