import prettier from "prettier";
import parser from "prettier/parser-babel";
import Editor from "@monaco-editor/react";
import React, { useRef } from "react";
import "./code-editor.css";

interface CodeEditorProps {
  initialValue: string;

  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>();

  function handleEditorChange(value: any, event: any) {
    onChange(value);
  }

  function handleOnMount(editor: any) {
    editorRef.current = editor;
  }

  const onFormatClick = () => {
    const unFormatted = editorRef.current.getModel().getValue();
    const formatted = prettier.format(unFormatted, {
      parser: "babel",
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true
    }).replace(/\n$/, "");
    editorRef.current.setValue(formatted);
  };
  return (
    <div className="editor-wrapper">
      <button
        onClick={onFormatClick}
        className="button button_format is-primary is-small"
      >Format
      </button>
      <Editor
        onMount={handleOnMount}
        onChange={handleEditorChange}
        value={initialValue}
        height="100%"
        language="javascript"
        theme="vs-dark"
        options={
          {
            wordWrap: "on",
            minimap: { enabled: false },
            showUnused: false,
            folding: false,
            lineNumbersMinChars: 3,
            fontSize: 16,
            scrollBeyondLastLine: false,
            automaticLayout: true
          }
        }
      />
    </div>
  );
};

export default CodeEditor;