import type { JSXElement } from "solid-js";
import { twMerge } from "tailwind-merge";
import type { TClassList } from "./types";

export interface PillProps {
  id?: string | number;
  children?: JSXElement;
  "aria-label"?: string;
  class?: string;
  classList?: TClassList;
  textColor: string;
  backgroundColor: string;
  "data-testid"?: string;
}

export const Pill = (props: PillProps): JSXElement => {
  return (
    <div
      id={props.id as string}
      class={twMerge(
        "h-fit w-fit rounded-full px-2.5 py-1 text-[length:0.875rem] font-medium truncate",
        props.class,
        props.textColor,
        props.backgroundColor
      )}
      classList={props.classList}
    >
      {props.children}
    </div>
  );
};

export default Pill;
