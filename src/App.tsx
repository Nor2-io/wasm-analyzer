import "./styles/tailwind.css";
import { createSignal, Accessor, createMemo, JSXElement } from "solid-js";
import { UploadFile, createFileUploader } from "@solid-primitives/upload";
import { currentComponent, startup } from "./State";
import { Sections, SideNav } from "./components/SideNav";
import {
  MetadataIcon,
  ExportIcon,
  ImportIcon,
  DependenciesIcon,
  WitInspectionIcon,
  ComponentIcon,
  CustomSectionsIcon,
  OpenIcon,
  ShowWatIcon,
  EnvIcon,
} from "./components/icons/Icons";
import { db, openWasm, reOpenWasm } from "./Util";
import { onMount } from "solid-js";

function App(props: { children?: JSXElement }) {
  onMount(async () => {
    const data = await db.modules.get(0);
    if (data) {
      reOpenWasm(data.data);
    }
  });

  const { files: filesAsync, selectFiles: selectFilesAsync } =
    createFileUploader();

  const [selectedFile, setSelectedFile] = createSignal<UploadFile>();

  const thisFile: Accessor<UploadFile | null | undefined> = createMemo(() => {
    if (selectedFile()) {
      const bufferPromise = selectedFile()?.file.arrayBuffer();

      if (bufferPromise) {
        bufferPromise.then((buffer: any) => openWasm(new Uint8Array(buffer)));
      }
    }

    return selectedFile();
  });

  const navLinks: Sections = [
    {
      title: "Actions",
      links: [
        {
          text: "Open",
          icon: OpenIcon,
          //onClicked: () => {
          //  selectFilesAsync(async ([{ source, name, size, file }]) => {
          //    if (file) {
          //      setSelectedFile({ source, name, size, file });
          //    }
          //  });
          //},
          link: "/",
        },
        { text: "Show WAT", icon: ShowWatIcon, link: "/wat" },
      ],
    },
    {
      title: null,
      links: [{ text: "Metadata", icon: MetadataIcon, link: "/metadata" }],
    },
    {
      title: "Core WASM",
      links: [
        { text: "Imports", icon: ImportIcon, link: "/imports" },
        { text: "Exports", icon: ExportIcon, link: "/exports" },
      ],
    },
    {
      title: "Component Model",
      links: [
        {
          text: "WIT Inspection",
          icon: WitInspectionIcon,
          link: "/wit",
        },
        {
          text: "Components",
          icon: ComponentIcon,
          link: "/components",
          active: () => {
            const c = currentComponent()?.getChildComponents();
            return c ? c.length > 0 : false;
          },
        },
        {
          text: "Dependencies",
          icon: DependenciesIcon,
          link: "/dependencies",
          active: () => {
            const c = currentComponent()?.getChildComponents();
            return c ? c.length > 0 : false;
          },
        },
      ],
    },
    {
      title: "Custom Sections",
      links: [
        {
          text: "Custom Sections",
          icon: CustomSectionsIcon,
          link: "/custom-sections",
        },
        {
          text: "Environment Variables",
          icon: EnvIcon,
          link: "/env",
          active: () => {
            return false;
          },
        },
      ],
    },
  ];

  return (
    <div class="w-full h-full flex flex-col sm:flex-row overflow-hidden">
      {!startup() && <SideNav sections={navLinks} />}
      <div class="flex flex-col h-full w-[100%] overflow-auto scrollbar pt-12 sm:pt-6 sm:pr-0 px-0 5xs:px-6 sm:px-3 md:px-6 lg:px-8 align-center">
        {props.children}
      </div>
    </div>
  );
}

export default App;
