import { JSXElement } from "solid-js";
import { twMerge } from "tailwind-merge";
import { Pill } from "./OldPill";

export interface LanguagePillProps {
  class?: string;
  language?: string;
}

export const LanguagePill = (props: LanguagePillProps): JSXElement => {
  function color() {
    switch (props.language?.toLowerCase()) {
      case "rust":
        return "bg-[#ea4700]";
      case "zig":
        return "bg-[#ea9c1c]";
      case "c11":
        return "bg-[#33509a]";
      case "c_plus_plus":
        return "bg-[#1d669e]";
      case "c#":
        return "bg-[#2f0a6b]";
      case "go":
        return "bg-[#00a3cc]";
      case "python":
        return "bg-[#f2c938]";
      case "javascript":
        return "bg-[#e4d04b]";
      case "typescript":
        return "bg-[#2f72bc]";
      case "assemblyscript":
        return "bg-[#007acc]";
      case "java":
        return "bg-[#f89917]";
      case "scala":
        return "bg-[#d33121]";
      case "kotlin":
        return "bg-[#7f52ff]";
      case "swift":
        return "bg-[#e44d35]";
      case "ruby":
        return "bg-[#c20000]";
      case "php":
        return "bg-[#7175aa]";
      case "r":
        return "bg-[#b0b1b5]";
      case "dart":
        return "bg-[#00c7af]";
      case "grain":
        return "bg-[#ff850e]";
      default:
        return "bg-[#3C3C47]";
    }
  }

  return (
    <Pill class={twMerge(color(), "h-fit w-fit", props.class ?? "")}>{props.language ? props.language : "Unknown"}</Pill>
  );
}

export default LanguagePill;
