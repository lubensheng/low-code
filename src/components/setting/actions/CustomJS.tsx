import MonacoEditor, { OnMount } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { useComponentsStore } from "../../../editor/stores/components/components";

export interface CustomJSConfig {
  type: "customJS";
  code: string;
}

export interface ViewProps {
  defaultValue?: string;
  onChange?: (config: CustomJSConfig) => void;
}

function CustomJS(props: ViewProps) {
  const { curComponentId } = useComponentsStore();
  const { defaultValue, onChange } = props;

  const [value, setValue] = useState<string>("");
  useEffect(() => {
    setValue(defaultValue || "");
  }, [defaultValue]);

  const handleEditorMount: OnMount = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction("editor.action.formatDocument")?.run();
    });
  };

  const codeChange = (value?: string) => {
    if (!curComponentId) return;
    setValue(value || "");
    onChange?.({
      type: "customJS",
      code: value!,
    });
  };

  return (
    <div className="mt-[40px]">
      <div>自定义 JS</div>
      <MonacoEditor
        width={"600px"}
        height={"400px"}
        path="action.js"
        language="javascript"
        onMount={handleEditorMount}
        onChange={codeChange}
        value={value}
        options={{
          fontSize: 14,
          scrollBeyondLastLine: false,
          minimap: {
            enabled: false,
          },
          scrollbar: {
            verticalScrollbarSize: 6,
            horizontalScrollbarSize: 6,
          },
        }}
      />
    </div>
  );
}

export default CustomJS;
