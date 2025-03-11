import type { TClassList } from "components/types";
import type { JSXElement } from "solid-js";
import { twMerge } from "tailwind-merge";
import type {
  AlignOnCrossAxisEnum,
  AlignOnInnerCrossAxisEnum,
  AlignOnMainAxisEnum,
  GridAutoFlowEnum,
  GridAutoItemEnum,
  GridDisplayEnum,
  PositiveIntegers,
} from "./types";
import {
  GetAlignment,
  GetGridColumns,
  GetGridLayout,
  GetGridRows,
} from "./helpers";

/**
 * A stylable Flex Grid container component
 *
 * Props:
 * @param   id
 * @returns Element ID, string - optional
 *
 * @param   children
 * @returns JSXElements or strings representing child elements - required
 *
 * @param   aria-label
 * @returns Aria label text for accessibility, string - otional
 *
 * @param   class
 * @returns Set general styling of the box, string, example: class={"h-5 w-5"} - optional
 *
 * @param   classList
 * @returns Set classlist array for the box. - optional
 *
 * @param   data-testid
 * @returns Set a custom data-testid for the box, string. - optional
 *
 * @param   columns
 * @returns Set the number of columns for the flex grid, number. Values below 1 will be ignored.
 *
 * @param   wrap
 * @returns Set type of wrap for items in the flexbox when items don't fit on one line, same as css flex-wrap. Uses the WrapEnum. Options: no-wrap, wrap, wrap-reverse. - optional (this may also be set through class attribute) - if set, this supercedes flex-wrap set in class.
 *
 * @param   alignOnMainAxis
 * @returns Sets how items align along the main axis of the flexbox, same as css justify-content. Uses the AlignOnMainAxisEnum. - if set, this supercedes justify set in class.
 *
 * @param   alignOnCrossAxis
 * @returns Sets how items align along the cross axis of the flexbox, same as css align-items. Uses the AlignOnCrossAxisEnum. - if set, this supercedes item align set in class.
 *
 * @param   alignOnInnerCrossAxis
 * @returns Sets how items align inside of the cross axis of the flexbox, when there is space, same as css align-content. Uses the AlignOnInnerCrossAxisEnum. - if set, this supercedes content align set in class.
 *
 */

export interface GridLayoutProps {
  id?: string;
  children?: JSXElement;
  "aria-label": string;
  class?: string;
  classList?: TClassList;
  "data-testid"?: string;
  columns?: PositiveIntegers;
  rows?: PositiveIntegers;
  display?: GridDisplayEnum;
  flow?: GridAutoFlowEnum;
  autoColumns?: GridAutoItemEnum;
  autoRows?: GridAutoItemEnum;
  alignOnMainAxis?: AlignOnMainAxisEnum;
  alignOnCrossAxis?: AlignOnCrossAxisEnum;
  alignOnInnerCrossAxis?: AlignOnInnerCrossAxisEnum;
}

export const GridLayout = (props: GridLayoutProps): JSXElement => {
  const getClass = (): string => {
    return twMerge(
      props.class,
      GetAlignment(
        props.alignOnMainAxis,
        props.alignOnCrossAxis,
        props.alignOnInnerCrossAxis,
      ),
      GetGridColumns(props.columns),
      GetGridRows(props.rows),
      GetGridLayout(
        props.display,
        props.flow,
        props.autoColumns,
        props.autoRows,
      ),
    );
  };

  return (
    <div
      id={props.id}
      class={getClass()}
      classList={props.classList}
      data-testid={
        props["data-testid"] ? props["data-testid"] : "grid-container"
      }
      aria-label={props["aria-label"]}
    >
      {props.children}
    </div>
  );
};

export default GridLayout;
