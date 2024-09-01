import MonacoEditor, { type OnMount, EditorProps } from "@monaco-editor/react";
import { debounce } from "lodash-es";
import { editor } from "monaco-editor";

interface CssEditorViewProps {
  options?: editor.IStandaloneEditorConstructionOptions;
  value: string;
  onChange?: EditorProps['onChange']
}

function CssEditor(props: CssEditorViewProps) {
  const { options = {}, value, onChange } = props;
  const handleEditorMount: OnMount = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction("editor.action.formatDocument")?.run();
    });
  };
  return (
    <MonacoEditor
      height="100%"
      language="css"
      path="component.css"
      onMount={handleEditorMount}
      value={value}
      onChange={onChange && debounce(onChange, 500)}
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
        ...options,
      }}
    />
  );
}

export default CssEditor;
