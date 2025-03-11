import { twMerge } from "tailwind-merge";
import { ToolTip } from "./ToolTip";
import { Position } from "monaco-editor";

export interface HashProps {
  label?: string;
  content?: string;
  class?: string;
}

export const Hash = (props: HashProps) => {
  return (
    <ToolTip content={props.content ?? ""}
      class={twMerge("lg:-left-48 2xl:-left-72", props.class)}
      position={"above"}
      arrow={true}
      arrowClass={"left-[25%] md:left-[15%] lg:left-[55%] xl:left-[70%] 2xl:left-[65%] 3xl:left-1/2"}
      contentClass="w-72 md:w-100 lg:w-96 md:left-0 lg:-left-12 xl:-left-36 2xl:-left-32 3xl:-left-12 lg:break-keep lg:w-fit"      
    >
      <div class="block truncate w-fit text-sm 2xl:text-xl text-neutral md:pr-0">
        {(props.label ? props.label + ": " : "") + props.content?.slice(0, 14) + "..."}
      </div>
    </ToolTip>
  );
}

export default Hash;