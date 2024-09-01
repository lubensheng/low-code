import { Button, Space } from "antd";
import {
  State,
  useComponentsStore,
} from "../../editor/stores/components/components";

function Header() {
  const { mode, setMode } = useComponentsStore();

  const handleClick = (mode: State["mode"]) => {
    setMode(mode);
  };

  return (
    <div className="ml-[16px] flex justify-between w-[100%]">
      <div>代码可视化编辑器</div>
      <Space>
        {mode === "edit" ? (
          <>
            <Button onClick={() => handleClick("preview")} type="primary">
              预览
            </Button>
          </>
        ) : (
          <>
            <Button type="primary" onClick={() => handleClick("edit")}>
              退出预览
            </Button>
          </>
        )}
      </Space>
    </div>
  );
}

export default Header;
