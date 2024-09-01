import { Segmented } from "antd";
import { useState } from "react";
import Material from "./Material";
import Outline from "./Outline";
import Source from "./Source";

function MaterialWrapper() {
  const [key, setKey] = useState("物料");

  return (
    <div>
      <Segmented
        value={key}
        onChange={setKey}
        block
        options={["物料", "大纲", "源码"]}
      />
      {
        key === '物料' && <Material />
      }
      {
        key === '大纲' && <Outline />
      }
      {
        key === '源码' && <Source />
      }
    </div>
  );
}

export default MaterialWrapper;
