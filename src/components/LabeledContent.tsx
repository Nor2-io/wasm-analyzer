import "../styles/tailwind.css";
import type { JSXElement } from "solid-js";
import { twMerge } from "tailwind-merge";
import type { JSX } from "solid-js";
import { PositionEnum, TClassList, TMediaSize, TPosition, TPositionString } from "./types";
export interface LabeledContentProps {
  id?: string;
  children?: JSXElement;
  "aria-label"?: string;
  labelText: string;
  labelClass?: string;
  class?: string;
  classList?: TClassList;
  wrapperClass?: string;
  "data-testid"?: string;
  labelPosition?: TPosition;
  labelPositionStart?: TMediaSize;
  labelFallBackPosition?: TPosition;
  role?: JSX.AriaAttributes["role"];
  translationFunction?: (value: string) => string;
  formFieldId?: string;
}

const getLabelPosition = (labelPosition?: TPosition, limit?: TMediaSize): string => {
  let direction = "flex-row";

  if (labelPosition) {
    switch (labelPosition) {
      case "before":
      case PositionEnum.before:
        switch(limit) {
          case "sm":
            return "sm:flex-row";
          case "md":
            return "md:flex-row";
          case "lg":
            return "lg:flex-row";
          case "xl":
            return "xl:flex-row";
          case "2xl":
            return "xl:flex-row";
          default:
            return "flex-row";
        }
      case "after":
      case PositionEnum.after:
        switch(limit) {
          case "sm":
            return "sm:flex-row-reverse";
          case "md":
            return "md:flex-row-reverse";
          case "lg":
            return "lg:flex-row-reverse";
          case "xl":
            return "xl:flex-row-reverse";
          case "2xl":
            return "xl:flex-row-reverse";
          default:
            return "flex-row-reverse";
        }
      case "above":
      case PositionEnum.above:
        switch(limit) {
          case "sm":
            return "sm:flex-col";
          case "md":
            return "md:flex-col";
          case "lg":
            return "lg:flex-col";
          case "xl":
            return "xl:flex-col";
          case "2xl":
            return "xl:flex-col";
          default:
            return "flex-col";
        }
      case "below":
      case PositionEnum.below:
        switch(limit) {
          case "sm":
            return "sm:flex-col-reverse";
          case "md":
            return "md:flex-col-reverse";
          case "lg":
            return "lg:flex-col-reverse";
          case "xl":
            return "xl:flex-col-reverse";
          case "2xl":
            return "xl:flex-col-reverse";
          default:
            return "flex-col-reverse";
        }
      }
    }

  return direction;
}

export const LabeledContent = (props: LabeledContentProps): JSXElement => {
  const getClass = (
    elementClass?: string,
    labelPosition?: TPosition,
    limit?: TMediaSize,
  ): string => {
    let direction = getLabelPosition(labelPosition, limit);

    if (props.labelPositionStart) {
      direction = `${props.labelPositionStart}:${direction}`;
    }

    return twMerge("w-fit", elementClass ?? "", props.labelPositionStart ? getLabelPosition(props.labelFallBackPosition) : "", direction, "flex");
  };

  const getLabelClass = (
    labelClass?: string,
    labelPosition?: TPosition,
  ): string => {
    let margin = "";

    if (labelPosition) {
      switch (labelPosition) {
        case "before":
        case PositionEnum.before:
          margin = "mr-1";
          break;
        case "after":
        case PositionEnum.after:
          margin = "ml-1";
          break;
        case "above":
        case PositionEnum.above:
          margin = "";
          break;
        case "below":
        case PositionEnum.below:
          margin = "";
          break;
      }
    }

    return twMerge(
      "bg-transparent text-neutral-200 text-[length:0.875rem] font-semibold",
      margin,
      labelClass,
      ""
    );
  };

  const getWrapperClass = (wrapperClass?: string): string => {
    return twMerge(
      "bg-transparent text-neutral test-base text-left w-full",
      wrapperClass ?? ""
    );
  };

  const translate = (value: string): string => {
    if (props.translationFunction) {
      return props.translationFunction(value);
    }

    return value;
  };

  return (
    <div
      data-testid={props["data-testid"] ?? "test-labeled-content"}
      aria-label={props["aria-label"]}
      id={props.id}
      class={getClass(props.class, props.labelPosition)}
    >
      <div class="inline-block text-left">
        {props.formFieldId ? (
          <label
            role="definition"
            class={getLabelClass(props.labelClass, props.labelPosition)}
            for={props.formFieldId}
          >
            {translate(props.labelText)}
          </label>
        ) : (
            <span
              role="definition"
              class={getLabelClass(props.labelClass, props.labelPosition)}
            >
              {translate(props.labelText)}
            </span>
          )
        }
      </div>
      <div
        role={props.role ?? "none"}
        class={getWrapperClass(props.wrapperClass)}
      >
        {props.children}
      </div>
    </div>
  );
};

export default LabeledContent;
