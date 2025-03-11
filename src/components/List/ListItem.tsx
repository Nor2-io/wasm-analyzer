import { For, JSXElement } from "solid-js";
import { twMerge } from "tailwind-merge";
import type { IListColumnValue } from "./types";
import { getGridCols } from "./helpers";

export interface ListItemProps {
  id: string;
  class?: string;
  columnValues: IListColumnValue[];
  columnCount: number;
}

export const ListItem = (props: ListItemProps): JSXElement => {


  return (
    <div
      id={props.id}
      data-testid="listItem"
      class={twMerge(
        " mb-4 grid md:h-72 min-h-fit xl:min-h-20 lg:w-full max-w-128 md:max-w-280 rounded-lg border border-neutral-50 bg-neutral-20 p-6 font-medium text-neutral shadow-sm shadow-neutral-20",
        getGridCols(props.columnCount),
        props.class ?? "",
      )}
      role="listitem"
    >
      {props.columnValues ? (
        <For each={props.columnValues}>
          {(value) => {
            return (
              <div
                class={"flex h-full justify-start align-middle max-w-full"}
                id={value.key.toString()}
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

export default ListItem;
