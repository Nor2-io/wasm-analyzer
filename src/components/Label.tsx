import "../styles/tailwind.css";
import type { JSXElement } from "solid-js";
import type { TClassList } from "./types";
import { twMerge } from "tailwind-merge";

export interface LabelProps {
  id?: string;
  children?: JSXElement;
  ariaLabel?: string;
  class?: string;
  classList?: TClassList;
  testId?: string;
}

export const Label = (props: LabelProps): JSXElement => {
  const getClass = (): string => {
    return (
      twMerge("relative z-10 p-0 m-0 h-0 top-0 text-neutral flex-wrap", props.class)
    );
  };

  return (
    <div
      data-testid={props.testId ?? "label"}
      aria-label={props.ariaLabel}
      role="definition"
      id={props.id}
      class={getClass()}
    >
      {props.children}
    </div>
  );
};

export default Label;
