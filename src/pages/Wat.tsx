import { currentComponent } from "../State";
import { Editor } from "../components/Editor";

export function WatPage() {
  return (
    <Editor
      title="WebAssembly Text (WAT)"
      readOnly={true}
      language="wat"
      fileName={currentComponent()?.getModuleInformation().name ?? ""}
      fileExtension="wat"
      text={currentComponent()?.getWat()}
    >
      <p class="text-neutral">
        {
          "View and edit  the WebAssembly Text representation of your selected file, below."
        }
        <br />
        <br />
        {
          "If you need additional information about the WASM Analyzer's capabilities, have a look at our "
        }
        <a
          href="https://docs.wa2.dev/"
          class="text-primary-350 hover:text-primary-300 underline underline-offset-2"
        >
          documentation
        </a>
        {"."}
      </p>
    </Editor>
  );
}
