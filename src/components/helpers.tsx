import { JSXElement } from "solid-js";
import { Link } from "./Link";
import {
  CustomSection,
  WasmType,
  WasmTypeRefType,
  RefTypeIndexed,
} from "../wa/interfaces/nornor-wasm-analyzer-types";
import { IListItemContent } from "./List";
import { IListColumnValue } from "./List/types";
import { ILicense } from "./types";
import { twMerge } from "tailwind-merge";
import {
  Function as ImportFunction,
  Global as ImportGlobal,
  Memory as ImportMemory,
  Table as ImportTable,
} from "../wa/interfaces/nornor-wasm-analyzer-core-import";

import {
  Function as ExportFunction,
  Global as ExportGlobal,
  Memory as ExportMemory,
  Table as ExportTable,
} from "../wa/interfaces/nornor-wasm-analyzer-core-export";

export const resolveLicense = (
  license: ILicense | string | undefined
): JSXElement => {
  if (!license) return undefined;
  if (typeof license === "string") {
    return (
      <span class="text-primary-350 hover:text-primary-300 cursor-pointer underline underline-offset-2">
        {license}
      </span>
    );
  }

  return (
    <>
      <span class="text-primary-350 hover:text-primary-300 cursor-pointer underline underline-offset-2">
        {license.url ? (
          <Link href={license.url}>{license.license}</Link>
        ) : (
          <>{license.license}</>
        )}
      </span>
      {license.or && " OR "}
      {license.or && resolveLicense(license.or)}
      {license.and && " AND "}
      {license.and && resolveLicense(license.and)}
    </>
  );
};

const getWasmType = (type: WasmType): string => {
  if (type.tag === "ref-type") {
    const val = (type as WasmTypeRefType).val;
    if (val.tag == "indexed") {
      return "Indexed: (" + (val as RefTypeIndexed).val.toString() + ")";
    }
    return "Ref: " + (type as WasmTypeRefType).val;
  }

  return type.tag;
};

const getWasmTypes = (types: WasmType[]): string => {
  const formattedTypes: string[] = [];

  for (let i = 0; i < types.length; i++) {
    formattedTypes.push(getWasmType(types[i]));
  }

  return formattedTypes.join(", ");
};

const getBaseListColumn = (
  label: string,
  value: string | number,
  labelStyling?: string
): JSXElement => {
  return (
    <div class="items-center text-neutral sm:text-neutral-200 text-[length:0.875rem] w-full h-fit flex mx-h-full">
      <div
        class={twMerge(
          "opacity-0 w-0 flex 5xs:w-24 5xs:opacity-100 sm:w-0 sm:invisible sm:opacity-0 line-clamp-2",
          labelStyling ?? ""
        )}
      >
        {label}
      </div>
      <div class="flex w-24 sm:w-full flex-grow">
        <div class="line-clamp-2 break-words w-full h-fit">{value}</div>
      </div>
    </div>
  );
};

export const getFormattedImportResults = (
  itemValues:
    | ImportFunction[]
    | ImportTable[]
    | ImportMemory[]
    | ImportGlobal[],
  type: "functions" | "tables" | "memories" | "globals"
): IListItemContent[] => {
  const formattedResults: IListItemContent[] = [];

  if (itemValues) {
    for (let i = 0; i < itemValues.length; i++) {
      const item = itemValues[i];

      const columnValues: IListColumnValue[] = [];

      const fieldColumn: IListColumnValue = {
        value: (
          <div class="text-sm 5xs:text-lg sm:text-sm pb-4 sm:pb-0 font-medium sm:w-full break-all line-clamp-2 max-h-10 5xs:max-h-14">
            {item.field}
          </div>
        ),
        key: item.field,
      };

      columnValues.push(fieldColumn);

      const moduleColumn: IListColumnValue = {
        value: getBaseListColumn(
          "Module:",
          item.module,
          type === "memories" ? "w-36" : undefined
        ),
        key: item.module,
      };

      columnValues.push(moduleColumn);

      switch (type) {
        case "functions": {
          const paramsColumn: IListColumnValue = {
            value: getBaseListColumn(
              "Parameters:",
              `(${getWasmTypes((item as ImportFunction).params)})`
            ),
            key: getWasmTypes((item as ImportFunction).params),
          };

          columnValues.push(paramsColumn);

          const resultsColumn: IListColumnValue = {
            value: getBaseListColumn(
              "Results:",
              `(${getWasmTypes((item as ImportFunction).results)})`
            ),
            key: getWasmTypes((item as ImportFunction).results),
          };

          columnValues.push(resultsColumn);

          break;
        }
        case "tables": {
          const tyColumn: IListColumnValue = {
            value: getBaseListColumn(
              "Type:",
              getWasmType((item as ImportTable).ty)
            ),
            key: getWasmType((item as ImportTable).ty),
          };

          columnValues.push(tyColumn);

          const minimumColumn: IListColumnValue = {
            value: getBaseListColumn(
              "Minimum:",
              (item as ImportTable).minimum as unknown as number
            ),
            key: (item as ImportTable).minimum as unknown as number,
          };

          columnValues.push(minimumColumn);

          const maximumColumn: IListColumnValue = {
            value: getBaseListColumn(
              "Maximum:",
              ((item as ImportTable).maximum as unknown as number) ?? "∞"
            ),
            key:
              ((item as ImportTable).maximum as unknown as number) ??
              9007199254740991,
          };

          columnValues.push(maximumColumn);

          break;
        }
        case "memories": {
          const sharedColumn: IListColumnValue = {
            value: getBaseListColumn(
              "Thread Sharing:",
              (item as ImportMemory).shared.toString(),
              "w-36"
            ),
            key: (item as ImportMemory).shared.toString(),
          };

          columnValues.push(sharedColumn);

          const minimumColumn: IListColumnValue = {
            value: getBaseListColumn(
              "Minimum Memory:",
              (item as ImportMemory).humanMinimumSize,
              "w-36"
            ),
            key: (item as ImportMemory).humanMinimumSize,
          };

          columnValues.push(minimumColumn);

          const maximumColumn: IListColumnValue = {
            value: getBaseListColumn(
              "Maximum Memory:",
              (item as ImportMemory).humanMaximumSize ?? "∞",
              "w-36"
            ),
            key:
              (item as ImportMemory).maximumPages?.toString() ??
              9007199254740991,
          };

          columnValues.push(maximumColumn);

          const memory64Column: IListColumnValue = {
            value: getBaseListColumn(
              "Memory 64:",
              (item as ImportMemory).memory64.toString(),
              "w-36"
            ),
            key: (item as ImportMemory).memory64.toString(),
          };

          columnValues.push(memory64Column);

          break;
        }
        case "globals": {
          const tyColumn: IListColumnValue = {
            value: getBaseListColumn(
              "Type:",
              getWasmType((item as ImportTable).ty)
            ),
            key: getWasmType((item as ImportTable).ty),
          };

          columnValues.push(tyColumn);

          const mutableColumn: IListColumnValue = {
            value: getBaseListColumn(
              "Mutable:",
              (item as ImportGlobal).mutable.toString()
            ),
            key: (item as ImportGlobal).mutable.toString(),
          };

          columnValues.push(mutableColumn);

          break;
        }
      }

      formattedResults.push({
        id: "imports-" + type + "-" + i,
        columnValues: columnValues,
      });
    }
  }

  return formattedResults;
};

export const getFormattedExportResults = (
  itemValues:
    | ExportFunction[]
    | ExportTable[]
    | ExportMemory[]
    | ExportGlobal[],
  type: "functions" | "tables" | "memories" | "globals"
): IListItemContent[] => {
  const formattedResults: IListItemContent[] = [];

  if (itemValues) {
    for (let i = 0; i < itemValues.length; i++) {
      const item = itemValues[i];

      const columnValues: IListColumnValue[] = [];

      const fieldColumn: IListColumnValue = {
        value: (
          <span class="text-sm 5xs:text-lg sm:text-sm pb-4 sm:pb-0 font-medium sm:w-full break-all line-clamp-2 max-h-10 5xs:max-h-14">
            {item.field}
          </span>
        ),
        key: item.field,
      };

      columnValues.push(fieldColumn);

      switch (type) {
        case "functions": {
          const paramsColumn: IListColumnValue = {
            value: getBaseListColumn(
              "Parameters:",
              `(${getWasmTypes((item as ExportFunction).params)})`
            ),
            key: getWasmTypes((item as ExportFunction).params),
          };

          columnValues.push(paramsColumn);

          const resultsColumn: IListColumnValue = {
            value: getBaseListColumn(
              "Results:",
              `(${getWasmTypes((item as ExportFunction).results)})`
            ),
            key: getWasmTypes((item as ExportFunction).results),
          };

          columnValues.push(resultsColumn);

          break;
        }
        case "tables": {
          const tyColumn: IListColumnValue = {
            value: getBaseListColumn(
              "Type:",
              getWasmType((item as ExportGlobal).ty)
            ),
            key: getWasmType((item as ExportGlobal).ty),
          };

          columnValues.push(tyColumn);

          const minimumColumn: IListColumnValue = {
            value: getBaseListColumn(
              "Minimum:",
              (item as ExportTable).minimum as unknown as number
            ),
            key: (item as ExportTable).minimum as unknown as number,
          };

          columnValues.push(minimumColumn);

          const maximumColumn: IListColumnValue = {
            value: getBaseListColumn(
              "Minimum:",
              ((item as ExportTable).maximum as unknown as number) ?? "∞"
            ),
            key:
              ((item as ExportTable).maximum as unknown as number) ??
              9007199254740991,
          };

          columnValues.push(maximumColumn);

          break;
        }
        case "memories": {
          const sharedColumn: IListColumnValue = {
            value: getBaseListColumn(
              "Thread Sharing:",
              (item as ExportMemory).shared.toString()
            ),
            key: (item as ExportMemory).shared.toString(),
          };

          columnValues.push(sharedColumn);

          const minimumColumn: IListColumnValue = {
            value: getBaseListColumn(
              "Minimum Memory:",
              (item as ExportMemory).humanMinimumSize
            ),
            key: (item as ExportMemory).humanMinimumSize,
          };

          columnValues.push(minimumColumn);

          const maximumColumn: IListColumnValue = {
            value: getBaseListColumn(
              "Maximum Memory:",
              (item as ExportMemory).humanMaximumSize ?? "∞"
            ),
            key:
              (item as ExportMemory).maximumPages?.toString() ??
              9007199254740991,
          };

          columnValues.push(maximumColumn);

          const memory64Column: IListColumnValue = {
            value: getBaseListColumn(
              "Memory 64:",
              (item as ExportMemory).memory64.toString()
            ),
            key: (item as ExportMemory).memory64.toString(),
          };

          columnValues.push(memory64Column);

          break;
        }
        case "globals": {
          const tyColumn: IListColumnValue = {
            value: getBaseListColumn(
              "Type:",
              getWasmType((item as ExportGlobal).ty)
            ),
            key: getWasmType((item as ExportGlobal).ty),
          };

          columnValues.push(tyColumn);

          const mutableColumn: IListColumnValue = {
            value: getBaseListColumn(
              "Mutable:",
              (item as ExportGlobal).mutable.toString()
            ),
            key: (item as ExportGlobal).mutable.toString(),
          };

          columnValues.push(mutableColumn);

          break;
        }
      }

      formattedResults.push({
        id: "imports-" + type + "-" + i,
        columnValues: columnValues,
      });
    }
  }

  return formattedResults;
};

export const getFormattedCustomSectionResults = (
  itemValues?: CustomSection[]
): IListItemContent[] => {
  const formattedResults: IListItemContent[] = [];

  if (itemValues) {
    for (let i = 0; i < itemValues.length; i++) {
      const item = itemValues[i];

      const columnValues: IListColumnValue[] = [];

      const nameColumn: IListColumnValue = {
        value: (
          <div class="text-sm 5xs:text-lg sm:text-sm pb-4 sm:pb-0 font-medium sm:w-full break-all line-clamp-2 max-h-10 5xs:max-h-14">
            {item.name}
          </div>
        ),
        key: item.name,
      };

      columnValues.push(nameColumn);

      const sizeColumn: IListColumnValue = {
        value: getBaseListColumn("Size:", item.humanSize, "5xs:w-12"),
        key: item.size as unknown as number,
      };

      columnValues.push(sizeColumn);

      formattedResults.push({
        id: "customsections-" + i,
        columnValues: columnValues,
      });
    }
  }

  return formattedResults;
};
