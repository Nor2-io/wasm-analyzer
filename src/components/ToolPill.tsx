import { JSXElement } from "solid-js";
import { twMerge } from "tailwind-merge";
import { Pill } from "./OldPill";
import { ToolTip } from "./ToolTip";

export interface ToolPillProps {
  tool?: string;
  class?: string;
  version?: string | null;
}

export const ToolPill = (props: ToolPillProps): JSXElement => {
  function color() {
    switch (props.tool?.toLowerCase()) {
      case "wit":
        return "bg-[#865aff]";
      case "wit-component":
        return "bg-[#671542]";
      case "cargo-component":
        return "bg-[#ea4700]";
      case "wabt":
        return "bg-[#865aff]";
      case "llvm":
        return "bg-[#5011b7]";
      case "clang":
        return "bg-[#126681]";
      case "lld":
        return "bg-[#2f0a6b]";
      case "binaryen":
        return "bg-[#33509a]";
      case "rustc":
        return "bg-[#ea4700]";
      case "wasm-bindgen":
        return "bg-[#3cdfbd]";
      case "wasm-pack":
        return "bg-[#671542]";
      case "webassemblyjs":
        return "bg-[#00a3cc]";
      case "wasm-snip":
        return "bg-[#6a55f0]";
      case "javy":
        return "bg-[#00a3cc]";
      default:
        return "bg-[#3C3C47]";
    }
  }

  return (
  <ToolTip
    position="above"
    arrowPosition="start"
    contentClass="w-32 left-1 2xl:left-3"
    arrow={true}
    class="inline-block justify-center max-w-full"
    content={(props.tool ? props.tool : "Unknown") + (props.version ? ` - ${props.version}` : "")}
  >
    <Pill  class={twMerge(color(), "h-fit w-fit", props.class ?? "")}>
      {props.tool ? props.tool : "Unknown"}
    </Pill>
  </ToolTip>
  );
}

export default ToolPill;