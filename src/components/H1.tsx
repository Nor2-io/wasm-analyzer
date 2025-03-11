import { JSXElement, children } from "solid-js";
import { twMerge } from "tailwind-merge";

export interface H1Props {
  class?: string;
  classList?:
    | {
        [k: string]: boolean | undefined;
      }
    | undefined;
  children: Array<JSXElement> | JSXElement | string | number;
}

export function H1(props: H1Props): JSXElement {
  const c = children(() => props.children);

  return (
    <div
      class={twMerge("text-3xl font-semibold text-neutral", props.class)}
      classList={props.classList}
    >
      {c()}
    </div>
  );
}
