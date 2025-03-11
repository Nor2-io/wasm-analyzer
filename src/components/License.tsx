import { JSXElement } from "solid-js";
import { twMerge } from "tailwind-merge";
import { ILicense } from "./types";
import { resolveLicense } from "./helpers";

export interface LicenseProps {
  license: ILicense;
  class?: string;
  classList?:
    | {
        [k: string]: boolean | undefined;
      }
    | undefined;
}

export function License(props: LicenseProps): JSXElement {
  return (
    <>
      {props.license && (
        <span
          class={twMerge(
            "text-primary-350 underline underline-offset-2",
            props.class
          )}
          classList={props.classList}
        >
          {resolveLicense(props.license)}
        </span>
      )}
    </>
  );
}
