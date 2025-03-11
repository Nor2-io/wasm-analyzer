import { getSummaryHeader } from "./helpers";
import type { ISummaryHeaderTexts } from "./types";

export interface SummaryHeaderProps {
  id?: string;
  summaryHeaderTexts: ISummaryHeaderTexts;
  translationFunction?: (value: string) => string;
  currentPageNumber: number;
  totalSize: number;
  pageSize?: number;
}

export const SummaryHeader = (props: SummaryHeaderProps) => {
  const translate = (value: string): string => {
    if (props.translationFunction) {
      return props.translationFunction(value);
    }

    return value;
  };

  return (
    <div
      id={props.id}
      role="heading"
      class={"flex h-20 items-center pl-6 text-sm14 text-neutral"}
      data-testid={"summary-header"}
    >
      <span>
        {getSummaryHeader(
          props.summaryHeaderTexts,
          translate,
          props.currentPageNumber,
          props.totalSize,
          props.pageSize,
        )}
      </span>
    </div>
  );
};

export default SummaryHeader;
