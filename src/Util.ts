import Dexie, { EntityTable } from "dexie";
import {
  setCurrent,
  setCurrentComponent,
  setLoading,
  setRootComponent,
  setStartup,
} from "./State";
import { reader } from "./wa/wasm_analyzer";
import { makePersisted } from "@solid-primitives/storage";
import { createSignal } from "solid-js";
import localforage from "localforage";
import { Navigate } from "@solidjs/router";

interface DataRow {
  id: number;
  data: Uint8Array;
}

export const db = new Dexie("files") as Dexie & {
  modules: EntityTable<DataRow, "id">;
};
db.version(2).stores({
  modules: "++id",
});

export async function reOpenWasm(array: Uint8Array) {
  setCurrent(null);
  setStartup(true);
  setLoading(false);

  const component = new reader.Component(array);
  setRootComponent(component);
  setCurrentComponent(component);

  setStartup(false);
  setCurrent("Metadata");
}

export async function openWasm(array: Uint8Array) {
  setCurrent(null);
  setStartup(true);
  setLoading(false);

  await db.modules.put({ id: 0, data: array });
  const component = new reader.Component(array);
  setRootComponent(component);
  setCurrentComponent(component);

  setStartup(false);
  setCurrent("Metadata");
}

export async function saveFile(
  fileName: string,
  fileType: string,
  content: string
) {
  var blob = new Blob([content], { type: fileType });

  var a = document.createElement("a");
  a.download = `${fileName}.${fileType}`;
  a.href = URL.createObjectURL(blob);
  a.dataset.downloadurl = [fileType, a.download, a.href].join(":");
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function () {
    URL.revokeObjectURL(a.href);
  }, 1500);
}
