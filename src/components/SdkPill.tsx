import { JSXElement } from "solid-js";
import { Pill } from "./OldPill";
import { twMerge } from "tailwind-merge";

export interface SdkPillProps {
  class?: string;
  sdk?: string;
  version?: string;
}

export const SdkPill = (props: SdkPillProps): JSXElement => {
  function color() {
    switch (props.sdk?.toLowerCase()) {
      case "emscripten":
        return "bg-[#b6d433]";
      case "webpack":
        return "bg-[#8acef2]";
      default:
        return "bg-[#3C3C47]";
    }
  }

  return (
    <Pill class={twMerge(color(), "h-fit w-fit", props.class ?? "")}>
      {props.sdk ? props.sdk : "Unknown"}
      {props.version && ` - ${props.version}`}
    </Pill>
  );
}

export default SdkPill;
