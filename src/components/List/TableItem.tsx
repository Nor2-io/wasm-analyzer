import { For, JSXElement } from "solid-js";
import { twMerge } from "tailwind-merge";
import type { IListColumnValue } from "./types";
import { getGridCols } from "./helpers";
import { ICustomColumn } from ".";

export interface TableItemProps {
  id: string;
  class?: string; 
  columnValues: IListColumnValue[];
  columnCount: number;
  customColumns?: ICustomColumn[];
}

export const TableItem = (props: TableItemProps): JSXElement => {
  return (
    <div
      id={props.id}
      data-testid="tableItem"
      class={twMerge(
        "h-16 bg-neutral-20 w-full md:max-w-280 border-t border-t-neutral-50 px-7 font-medium text-neutral sm:gap-x-2",
        props.customColumns ? "flex" : "grid",
        !props.customColumns ? getGridCols(props.columnCount) : "",
        props.class ?? "",
      )}
      role="row"
    >
      {props.columnValues ? (
        <For each={props.columnValues}>
          {(value, i) => {
            return (
              <div
                class={twMerge(
                  "flex w-fit max-w-full h-full justify-start align-middle",
                  props.customColumns && props.customColumns[i()]
                    ? props.customColumns[i()].columnClass
                    : ""
                )}
                id={value.key.toString()}
                role="cell"
              >
                {value.value}
              </div>
            );
          }}
        </For>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TableItem;