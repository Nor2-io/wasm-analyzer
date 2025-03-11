import { JSXElement, children } from "solid-js";
import { twMerge } from "tailwind-merge";

export interface Pill {
  class?: string;
  classList?:
    | {
        [k: string]: boolean | undefined;
      }
    | undefined;
  children: Array<JSXElement> | JSXElement | string | number;
}

export function Pill(props: Pill): JSXElement {
  const c = children(() => props.children);

  return (
    <div
      class={twMerge(
        "rounded-full w-fit px-2.5 py-1 bg-[#3C3C47] text-xs font-medium whitespace-nowrap text-neutral",
        props.class
      )}
      classList={props.classList}
    >
      {c()}
    </div>
  );
}

export default Pill;
