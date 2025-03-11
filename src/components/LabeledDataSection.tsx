import { JSXElement, children } from "solid-js";
import { twMerge } from "tailwind-merge";

export interface LicenseProps {
  label: JSXElement | string | number;
  children: Array<JSXElement> | JSXElement | string | number;
  class?: string;
  classList?:
    | {
        [k: string]: boolean | undefined;
      }
    | undefined;
}

export function LabeledDataSection(props: LicenseProps): JSXElement {
  const c = children(() => props.children);

  return (
    <div class="flex flex-col gap-1">
      <span class="text-sm font-normal leading-6 text-neutral-360">
        {props.label}
      </span>
      <div class={twMerge("", props.class)} classList={props.classList}>
        {c()}
      </div>
    </div>
  );
}
