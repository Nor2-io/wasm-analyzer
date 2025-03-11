import { twMerge } from "tailwind-merge";
import {
  AlignOnCrossAxisEnum,
  AlignOnInnerCrossAxisEnum,
  AlignOnMainAxisEnum,
  FlexDirectionEnum,
  FlexWrapEnum,
  GridDisplayEnum,
  GridAutoFlowEnum,
  GridAutoItemEnum,
} from "./types";

export const GetAlignment = (
  mainAxisAlignment?: AlignOnMainAxisEnum,
  crossAxisAlignment?: AlignOnCrossAxisEnum,
  innerCrossAxisAlignment?: AlignOnInnerCrossAxisEnum,
): string => {
  let justifyContent = "";

  switch (mainAxisAlignment) {
    case AlignOnMainAxisEnum.normal:
      justifyContent = "justify-normal";
      break;
    case AlignOnMainAxisEnum.start:
      justifyContent = "justify-start";
      break;
    case AlignOnMainAxisEnum.end:
      justifyContent = "justify-end";
      break;
    case AlignOnMainAxisEnum.center:
      justifyContent = "justify-center";
      break;
    case AlignOnMainAxisEnum["space-between"]:
      justifyContent = "justify-between";
      break;
    case AlignOnMainAxisEnum["space-around"]:
      justifyContent = "justify-around";
      break;
    case AlignOnMainAxisEnum["space-evenly"]:
      justifyContent = "justify-evenly";
      break;
    case AlignOnMainAxisEnum.stretch:
      justifyContent = "justify-stretch";
      break;
    default:
      justifyContent = "";
      break;
  }

  let alignItems = "";

  switch (crossAxisAlignment) {
    case AlignOnCrossAxisEnum.start:
      alignItems = "items-start";
      break;
    case AlignOnCrossAxisEnum.end:
      alignItems = "items-end";
      break;
    case AlignOnCrossAxisEnum.center:
      alignItems = "items-center";
      break;
    case AlignOnCrossAxisEnum.baseline:
      alignItems = "items-baseline";
      break;
    case AlignOnCrossAxisEnum.stretch:
      alignItems = "items-stretch";
      break;
    default:
      alignItems = "";
      break;
  }

  let alignContent = "";

  switch (innerCrossAxisAlignment) {
    case AlignOnInnerCrossAxisEnum.normal:
      alignContent = "content-normal";
      break;
    case AlignOnInnerCrossAxisEnum.center:
      alignContent = "content-center";
      break;
    case AlignOnInnerCrossAxisEnum.start:
      alignContent = "content-start";
      break;
    case AlignOnInnerCrossAxisEnum.end:
      alignContent = "content-end";
      break;
    case AlignOnInnerCrossAxisEnum["space-between"]:
      alignContent = "content-between";
      break;
    case AlignOnInnerCrossAxisEnum["space-around"]:
      alignContent = "content-around";
      break;
    case AlignOnInnerCrossAxisEnum["space-evenly"]:
      alignContent = "content-evenly";
      break;
    case AlignOnInnerCrossAxisEnum.baseline:
      alignContent = "content-baseline";
      break;
    case AlignOnInnerCrossAxisEnum.stretch:
      alignContent = "content-stretch";
      break;
    default:
      alignContent = "";
      break;
  }

  return twMerge(justifyContent, alignItems, alignContent);
};

export const GetFlexFlow = (
  direction?: FlexDirectionEnum,
  wrap?: FlexWrapEnum,
): string => {
  let directionValue = "";

  switch (direction) {
    case FlexDirectionEnum.column:
      directionValue = "flex-col";
      break;
    case FlexDirectionEnum["column-reverse"]:
      directionValue = "flex-col-reverse";
      break;
    case FlexDirectionEnum.row:
      directionValue = "flex-row";
      break;
    case FlexDirectionEnum["row-reverse"]:
      directionValue = "flex-row-reverse";
      break;
    default:
      directionValue = "";
      break;
  }

  let wrapValue = "";

  switch (wrap) {
    case FlexWrapEnum.wrap:
      wrapValue = "flex-wrap";
      break;
    case FlexWrapEnum["wrap-reverse"]:
      wrapValue = "flex-wrap-reverse";
      break;
    case FlexWrapEnum["no-wrap"]:
      wrapValue = "flex-nowrap";
      break;
    default:
      wrapValue = "";
      break;
  }

  return twMerge(directionValue, wrapValue);
};

export const GetGridLayout = (
  display?: GridDisplayEnum,
  autoFlow?: GridAutoFlowEnum,
  autoColumns?: GridAutoItemEnum,
  autoRows?: GridAutoItemEnum,
): string => {
  let displayValue = "grid";

  switch (display) {
    case GridDisplayEnum.grid:
      displayValue = "grid";
      break;
    case GridDisplayEnum["inline-grid"]:
      displayValue = "inline-grid";
      break;
    default:
      displayValue = "grid";
      break;
  }

  let autoFlowValue = "";

  switch (autoFlow) {
    case GridAutoFlowEnum.column:
      autoFlowValue = "grid-flow-col";
      break;
    case GridAutoFlowEnum["column-dense"]:
      autoFlowValue = "grid-flow-col-dense";
      break;
    case GridAutoFlowEnum.dense:
      autoFlowValue = "grid-flow-dense";
      break;
    case GridAutoFlowEnum.row:
      autoFlowValue = "grid-flow-row";
      break;
    case GridAutoFlowEnum["row-dense"]:
      autoFlowValue = "grid-flow-row-dense";
      break;
    default:
      autoFlowValue = "";
      break;
  }

  let autoColumnsValue = "";

  switch (autoColumns) {
    case GridAutoItemEnum.auto:
      autoColumnsValue = "auto-cols-auto";
      break;
    case GridAutoItemEnum["max-content"]:
      autoColumnsValue = "auto-cols-max";
      break;
    case GridAutoItemEnum["min-content"]:
      autoColumnsValue = "auto-cols-min";
      break;
    case GridAutoItemEnum.minmax:
      autoColumnsValue = "auto-cols-fr";
      break;
    default:
      autoColumnsValue = "";
      break;
  }

  let autoRowsValue = "";

  switch (autoRows) {
    case GridAutoItemEnum.auto:
      autoRowsValue = "auto-rows-auto";
      break;
    case GridAutoItemEnum["max-content"]:
      autoRowsValue = "auto-rows-max";
      break;
    case GridAutoItemEnum["min-content"]:
      autoRowsValue = "auto-rows-min";
      break;
    case GridAutoItemEnum.minmax:
      autoRowsValue = "auto-rows-fr";
      break;
    default:
      autoRowsValue = "";
      break;
  }

  return twMerge(autoFlowValue, autoColumnsValue, autoRowsValue, displayValue);
};

export const GetGridColumns = (columns?: number): string => {
  if (!columns) {
    return "";
  }

  const minimumColumns = 1;

  return (
    "grid-cols-" +
    (columns > 0 ? columns.toString() : minimumColumns.toString())
  );
};

export const GetGridRows = (rows?: number): string => {
  if (!rows) {
    return "";
  }

  const minimumRows = 1;

  return "grid-rows-" + (rows > 0 ? rows.toString() : minimumRows.toString());
};
