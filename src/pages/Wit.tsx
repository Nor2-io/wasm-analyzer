import { currentComponent } from "../State";
import { Editor } from "../components/Editor";
import PageHeader from "../components/PageHeader";
//import {
//  GraphViewIcon,
//  ListViewIcon,
//  TextViewIcon,
//} from "../components/icons/Icons";
//import { ButtonGroup } from "../components/ButtonGroup";

export function WitPage() {
  return (
    <>
      <Editor
        title="WebAssembly Interface Types (WIT)"
        readOnly={true}
        language="wit"
        fileName={currentComponent()?.getModuleInformation().name ?? ""}
        fileExtension="wit"
        text={currentComponent()?.getWit()}
      >
        <p class="text-neutral pb-6">
          {
            "View and edit the WebAssembly Interface representation of your selected file, below. Read more about WIT, "
          }
          <a
            href="https://docs.wa2.dev/wasm/concepts-and-features/5-wit/"
            class="text-primary-350 hover:text-primary-300 underline underline-offset-2"
          >
            here
          </a>
          {"."}
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
      {/* TODO: Re-add once we have the other views
      <ButtonGroup
        items={[
          { icon: <ListViewIcon class="w-5 h-5" />, onClick: () => {} },
          { icon: <TextViewIcon class="w-5 h-5" />, onClick: () => {} },
          { icon: <GraphViewIcon class="w-5 h-5" />, onClick: () => {} },
        ]}
      />*/}
    </>
  );
}
