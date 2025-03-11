import * as monaco from "monaco-editor";

export function setupWasmAnalyzerTheme() {
    monaco.editor.defineTheme("WasmAnalyzerTheme", WasmAnalyzerTheme);
}

export const WasmAnalyzerTheme: monaco.editor.IStandaloneThemeData = {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "tag", foreground: "#DCDCAA" },
      { token: "keyword.control", foreground: "#C586C0" },
      { token: "entity.other.attribute-name", foreground: "#9CDCFE" },
    ],
    colors: {
      "editor.background": "#0C0D18",
      "editorGutter.background": "#1c1f2c",
      "editorLineNumber.foreground": "#B3BFD8",
      "editor.lineHighlightBackground": "#1f213e",
    },
};