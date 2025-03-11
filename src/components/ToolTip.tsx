import { Show, type JSXElement } from "solid-js";
import { twMerge } from "tailwind-merge";
import { PositionEnum, TClassList, TPosition } from "./types";

export enum ArrowPositionEnum {
  start = "start",
  middle = "middle",
  end = "end",
}

type TArrowPositionstrings = "start" | "middle" | "end";

type TArrowPosition = ArrowPositionEnum | TArrowPositionstrings;

export interface ToolTipProps {
  id?: string;
  name?: string;
  class?: string;
  content?: string | JSXElement;
  contentClass?: string;
  children?: string | JSXElement;
  position?: TPosition;
  arrow?: boolean;
  arrowPosition?: TArrowPosition;
  arrowClass?: string;
  wrapperClass?: string;
  classList?: TClassList;
}

export function ToolTip(props: ToolTipProps): JSXElement {
  const getClass = (): string => {
    return twMerge(props.class ?? "");
  };

  const getArrowClass = (
    toolTipPosition?: TPosition,
    arrowPosition?: TArrowPosition
  ): string => {
    let p = "";

    switch (toolTipPosition) {
      case PositionEnum.before:
        p = "right-3";
        break;
      case PositionEnum.after:
        p = "left-3";
        break;
      case PositionEnum.above:
        p = "bottom-3";
        break;
      case PositionEnum.below:
        p = "top-3";
        break;
      default:
        return "";
    }

    let a = "";

    switch (toolTipPosition) {
      case PositionEnum.before:
      case PositionEnum.after:
        switch (arrowPosition) {
          case ArrowPositionEnum.start:
          default:
            a = "-top-1";
            break;
          case ArrowPositionEnum.end:
            a = "top-1";
            break;
          case ArrowPositionEnum.middle:
            a = "";
            break;
        }
        break;
      case PositionEnum.above:
      case PositionEnum.below:
        switch (arrowPosition) {
          case ArrowPositionEnum.start:
          default:
            a = "left-[10%]";
            break;
          case ArrowPositionEnum.middle:
            a = "left-[45%]";
            break;

          case ArrowPositionEnum.end:
            a = "left-[80%]";
            break;
        }
        break;
    }

    return twMerge(
      "z-20 h-4 w-4 bg-neutral-100 rotate-45 relative",
      p,
      a,
      props.arrowClass ?? ""
    );
  };

  const getTooltipContainerClass = (position?: TPosition) => {
    let order = "";

    switch (position) {
      case "before":
      case PositionEnum.before:
        order = "-top-[100%]";
        break;
      case "after":
      case PositionEnum.after:
        order = "-top-[100%]";
        break;
      case "above":
      case PositionEnum.above:
      default:
        order = "top-0.5";
        break;
      case "below":
      case PositionEnum.below:
        order = "bottom-0.5";
        break;
    }

    let positioning = "";

    switch (position) {
      case "before":
      case PositionEnum.before:
        positioning = "left-1";
        break;
      case "after":
      case PositionEnum.after:
        positioning = "-right-1";
        break;
      case "above":
      case PositionEnum.above:
      default:
        positioning = "-left-3";
        break;
      case "below":
      case PositionEnum.below:
        positioning = "-left-3";
        break;
    }
    return twMerge(
      "peer absolute opacity-0 transition-opacity peer-hover:opacity-100 z-[-999] flex peer-hover:z-50 items-center",
      order,
      positioning,
      props.class
    );
  };

  const getToolTipContentClass = (position?: TPosition): string => {
    let positioning = "";

    switch (position) {
      case "before":
      case PositionEnum.before:
        positioning = "flex-row items-center right-[100%]";
        break;
      case "after":
      case PositionEnum.after:
        positioning = "flex-row-reverse items-center";
        break;
      case "above":
      case PositionEnum.above:
      default:
        positioning = "flex-col justify-center bottom-[100%]";
        break;
      case "below":
      case PositionEnum.below:
        positioning = "flex-col-reverse justify-center";
        break;
    }

    return twMerge(
      "h-fit w-fit break flex absolute break-all",
      positioning,
      props.contentClass ?? ""
    );
  };

  return (
    <div
      class={twMerge("group relative flex", props.wrapperClass)}
      id={props.id}
      data-testid="tooltip-wrapper"
    >
      <div class="peer flex h-fit w-fit z-30">{props.children}</div>
      <div
        class={getTooltipContainerClass(props.position)}
        data-testid="tooltip"
        role="tooltip"
      >
        <div class="w-0 h-0 absolute">
          <div class="h-fit w-fit block top-0 sticky">
            <div class={getToolTipContentClass(props.position)}>
              <div class="z-30 p-2 w-fit h-fit bg-neutral-100 rounded-lg max-w-full whitespace-normal justify-self-center">
                {props.content}
              </div>
              <Show when={props.arrow}>
                <div
                  class={getArrowClass(props.position, props.arrowPosition)}
                ></div>
              </Show>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div class="h-fit-w-fit max-w-full flex absolute bottom-0.5 bg-neutral-100 p-2 rounded-md">{props.content}</div> */
}
