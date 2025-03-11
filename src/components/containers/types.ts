// justify-content
export enum AlignOnMainAxisEnum {
  normal,
  start,
  end,
  center,
  "space-between",
  "space-around",
  "space-evenly",
  stretch,
}

// align-items
export enum AlignOnCrossAxisEnum {
  start,
  end,
  center,
  baseline,
  stretch,
}

// align-content
export enum AlignOnInnerCrossAxisEnum {
  normal,
  center,
  start,
  end,
  "space-between",
  "space-around",
  "space-evenly",
  baseline,
  stretch,
}

// flex-direction
export enum FlexDirectionEnum {
  row,
  "row-reverse",
  column,
  "column-reverse",
}

// flex-wrap
export enum FlexWrapEnum {
  "no-wrap",
  wrap,
  "wrap-reverse",
}

// grid display
export enum GridDisplayEnum {
  grid,
  "inline-grid",
}

// grid auto flow
export enum GridAutoFlowEnum {
  row,
  column,
  dense,
  "row-dense",
  "column-dense",
}

// grid auto columns/rows
export enum GridAutoItemEnum {
  auto,
  "min-content",
  "max-content",
  minmax,
}

type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

type positiveIntegers<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;
export type PositiveIntegers = positiveIntegers<1, 999>;
