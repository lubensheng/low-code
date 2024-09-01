import { useComponentsStore } from "../../editor/stores/components/components";
import MonacoEditor, { OnMount } from "@monaco-editor/react";

function Source() {
  const { components } = useComponentsStore();

  const handleEditorMount: OnMount = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction("editor.action.formatDocument")?.run();
    });
  };

  return (
    <div style={{ height: 'calc(100vh - 100px)' }}>
      <MonacoEditor
        height={"100%"}
        path="components.json"
        language="json"
        onMount={handleEditorMount}
        value={JSON.stringify(components, null, 2)}
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

export default Source;
