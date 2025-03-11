import { Navigate } from "@solidjs/router";
import { WasmIcon } from "../components/icons/Icons";
import LogoLarge from "./../assets/WA2LargeWhite.svg";
import {
  UploadFile,
  createDropzone,
  createFileUploader,
} from "@solid-primitives/upload";
import { Accessor, For, createMemo, createSignal } from "solid-js";
import { openWasm } from "../Util";
import { current, startup } from "../State";

export interface StartupProps {}

export function StartupPage(props: StartupProps) {
  const { files: filesAsync, selectFiles: selectFilesAsync } =
    createFileUploader();

  const [selectedFile, setSelectedFile] = createSignal<UploadFile | undefined>(
    undefined
  );

  const thisFile: Accessor<UploadFile | null | undefined> = createMemo(() => {
    if (selectedFile()) {
      const bufferPromise = selectedFile()?.file.arrayBuffer();

      if (bufferPromise) {
        bufferPromise.then((buffer: any) => openWasm(new Uint8Array(buffer)));
      }
    }

    return selectedFile() ?? undefined;
  });

  const { setRef: dropzoneRef, files: droppedFiles } = createDropzone({
    onDrop: async (files: any) => {
      files.forEach((f: any) =>
        f.file.arrayBuffer().then((buffer: any) => {
          openWasm(new Uint8Array(buffer));
        })
      );
    },
    onDragOver: (files: any) => console.log("over", files.length),
  });

  return (
    <div class="flex flex-col items-center w-full h-full py-12 px-16">
      <div class="flex flex-col gap-8 border-b w-full border-neutral-30">
        <img class="w-60" src={LogoLarge} />
        <p class="text-neutral pb-6">
          {
            "The WASM Analyzer is an open source application made for displaying the contents of WebAssembly modules or components. Upload a .wasm file from this page to get detailed information about its contents, or click on the Open Package Registry button to view an interactive list of modules or components from a given repository. "
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
      </div>

      <div
        class="self-center flex flex-col justify-center min-w-96 w-11/12 h-2/3 text-gray-400 hover:text-gray-300 mt-20 rounded-lg border-2 border-dashed border-neutral-100 p-12 text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        ref={dropzoneRef}
      >
        {false ? (
          <>
            <svg
              class="mx-auto animate-spin h-12 w-12 text-neutral"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span class="mt-2 block text-sm font-semibold hover:text-gray-400 text-gray-400">
              Loading WASM File...
            </span>
          </>
        ) : (
          <div class="block">
            <WasmIcon class="mx-auto h-16 w-16 rounded-s rounded-e" />
            <span class="my-4 block text-md font-semibold hover:text-neutral text-neutral">
              Drag and drop Wasm file
              <br />
              or
            </span>
            <div class="flex justify-center gap-6">
              <button
                onClick={() => {
                  selectFilesAsync(async ([{ source, name, size, file }]) => {
                    if (file) {
                      setSelectedFile({ source, name, size, file });
                    }
                  });
                }}
                class="bg-primary py-2 px-4 rounded-lg text-neutral hover:bg-primary-250 w-52"
              >
                Browse Wasm file
              </button>
              {current() === "Metadata" && !startup() && (
                <Navigate href="/metadata" />
              )}
              <For each={droppedFiles()}>{(file) => <p>{file.name}</p>}</For>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
