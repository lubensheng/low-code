/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tree } from "antd";
import { useComponentsStore } from "../../editor/stores/components/components";

function Outline() {
  const { components, setCurComponentId } = useComponentsStore();

  return (
    <Tree
      fieldNames={{ title: "desc", key: "id" }}
      treeData={components as any}
      showLine
      defaultExpandAll
      onSelect={([selectedKey]) => {
        setCurComponentId(selectedKey as number);
      }}
    />
  );
}

export default Outline;
