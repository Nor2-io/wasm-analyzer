import type { TClassList } from "components/types";
import type { JSXElement } from "solid-js";
import { twMerge } from "tailwind-merge";

type TSectionDividerString = "both" | "none" | "top" | "bottom";

export enum SectionDividerEnum {
  both = "both",
  none = "none",
  top = "top",
  bottom = "bottom",
}

export type TSectionDivider =
  | true
  | TSectionDividerString
  | SectionDividerEnum
  | false;

export interface SectionProps {
  id?: string;
  children: JSXElement;
  "aria-label"?: string;
  class?: string;
  classList?: TClassList;
  dividers?: TSectionDivider;
  "data-testid"?: string;
}

export const Section = (props: SectionProps): JSXElement => {
  const getClass = (): string => {
    const topDivider =
      props.dividers && props.dividers !== "none" && props.dividers !== "bottom"
        ? "border-t-2 border-neutral-50"
        : "";
    const bottomDivider =
      props.dividers && props.dividers !== "none" && props.dividers !== "top"
        ? "border-b-2 border-neutral-50"
        : "";

    return twMerge(
      "bg-transparent h-fit",
      props.class,
      topDivider,
      bottomDivider,
      "flex w-full"
    );
  };

  return (
    <div
      id={props.id}
      class={getClass()}
      classList={props.classList}
      data-testid={
        props["data-testid"] ? props["data-testid"] : "flex-container"
      }
      aria-label={props["aria-label"]}
    >
      {props.children}
    </div>
  );
};

export default Section;
