import * as monaco from "monaco-editor";
import { saveFile } from "../Util";
import { makeResizeObserver } from "@solid-primitives/resize-observer";
import { JSXElement, createSignal, onMount } from "solid-js";
import PageHeader from "./PageHeader";

export interface EditorProps {
  title: string;
  language: string;
  fileName: string;
  fileExtension: string;
  text?: string;
  theme?: string;
  readOnly: boolean;
  children?: JSXElement;
}

export function Editor(props: EditorProps): JSXElement {
  const handleObserverCallback = (entries: ResizeObserverEntry[]): void => {
    if (editor() !== null) {
      editor()?.layout();
    }
  }

  const { observe, unobserve } = makeResizeObserver(handleObserverCallback, {
    box: "content-box",
  });

  const [editor, setEditor] =
    createSignal<monaco.editor.IStandaloneCodeEditor | null>(null);


  const save = (): void => {
    const fileName = props.fileName.replaceAll(":", "-");
    saveFile(fileName, props.fileExtension, editor()?.getValue()!);
  }

  onMount(() => {
    const element = document.getElementById("editor");

    if (element) {
      setEditor(
        monaco.editor.create(element, {
          value: props.text,
          readOnly: props.readOnly,
          scrollBeyondLastLine: false,
          language: props.language,
          colorDecorators: true,
          defaultColorDecorators: true,
          theme: props.theme ?? "WasmAnalyzerTheme",
        })
      );

      observe(element);
    }
  });

  return (
    <div class="w-full max-w-280">
      <div class="flex justify-items-center place-content-between py-6 px-8 place-items-center w-full">
        <div class="flex place-items-center justify-items-center gap-4 w-full">
          <PageHeader
            heading={props.title}
            headingContainerClass="flex flex-grow-0 lg:pr-4 pt-3 lg:pt-0"
            headingControls={
              <div class="w-full flex flex-grow">
                <div class="w-full flex-grow">
                  {props.readOnly && (
                  <div class="rounded-full self-center mt-1 bg-[#3C3C47] px-2 py-1 text-xs w-fit font-semibold text-neutral">
                    Read only
                  </div>
                  )}
                </div>
                <button
                  class="bg-primary py-1 px-4 rounded-lg text-neutral hover:bg-primary-250 relative"
                  onClick={save}
                >
                  Download
                </button>
              </div>
            }
            class="w-full max-w-280"
          >
            {props.children}
          </PageHeader>

        </div>
      </div>
      <div class="h-screen w-full flex pl-8">
        <div
          id="editor"
          class="w-full h-full flex rounded-tl-xl overflow-clip border-t border-l border-neutral-30"
        ></div>
      </div>
    </div>
  );
}
