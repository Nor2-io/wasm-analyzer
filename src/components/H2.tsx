import { JSXElement, children } from "solid-js";
import { twMerge } from "tailwind-merge";

export interface H2Props {
  class?: string;
  classList?:
    | {
        [k: string]: boolean | undefined;
      }
    | undefined;
  children: Array<JSXElement> | JSXElement | string | number;
}

export function H2(props: H2Props): JSXElement {
  const c = children(() => props.children);

  return (
    <div
      class={twMerge("text-2xl pt-6 font-semibold text-neutral", props.class)}
      classList={props.classList}
    >
      {c()}
    </div>
  );
}
