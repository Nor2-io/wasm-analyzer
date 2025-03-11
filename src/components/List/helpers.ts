import type {
  IListItemContent,
  ISummaryHeaderTexts,
  IListColumnValue,
} from "./types";

export const getSummaryHeader = (
  texts: ISummaryHeaderTexts,
  translate: (value: string) => string,
  pageNumber = 0,
  totalSize = 0,
  pageSize?: number,
): string => {
  if (pageSize) {
    const place = 1 + pageSize * (pageNumber - 1);
    const pages = Math.ceil(totalSize / pageSize);
    const remainder = totalSize % pageSize;

    const currentItems =
      place.toString() +
      (pageNumber < pages
        ? "-" + (place + pageSize - 1)
        : pageSize > 1
        ? "-" + (place + remainder - 1)
        : "");

    return (
      translate(texts.beginning) +
      " " +
      currentItems +
      " " +
      translate(texts.middle) +
      " " +
      totalSize +
      " " +
      translate(texts.ending)
    );
  }

  return (
    translate(texts.beginning) + " " + totalSize + " " + translate(texts.ending)
  );
};

export const generatePageSymbols = (
  pageNumber: number,
  pageSize: number,
  totalSize: number,
): string[] => {
  const pageSymbols: string[] = [];

  if (pageSize > 0) {
    const pageCount = Math.ceil(totalSize / pageSize);

    if (pageCount <= 7) {
      for (let i = 1; i <= pageCount; i++) {
        pageSymbols.push(i.toString());
      }
    } else {
      for (let i = 1; i <= pageCount; i++) {
        if (
          (i === pageNumber + 3 || i === pageNumber - 3) &&
          i < totalSize - 1 &&
          i > 2
        ) {
          pageSymbols.push("...");
        } else {
          if (
            i <= 2 ||
            (i >= pageNumber - 1 && i <= pageNumber + 1) ||
            i >= totalSize - 1 ||
            i <= 3 ||
            i >= totalSize - 1 ||
            (i >= totalSize - 2 &&
              (i > pageNumber + 1 || pageNumber === totalSize))
          ) {
            pageSymbols.push(i.toString());
          }
        }
      }
    }
  }

  return pageSymbols;
};

export const sortByColumn = (
  column: number,
  sortValues: { sortColumn: number; sortOrder: number },
): ((first: IListItemContent, second: IListItemContent) => number) => {
  const valueFormatter = (values: IListColumnValue[]): string | number => {
    if (values[column] && values[column].key) {
      if (typeof(values[column].key) === "string") {
        return values[column].key.toString();
      }

      if (typeof(values[column].key) === "number") {
        return isNaN(values[column].key as number) ? 0 :values[column].key;
      }
    }

    return "";
  };

  if (sortValues.sortColumn === column) {
    sortValues.sortOrder = sortValues.sortOrder * -1;
  } else {
    sortValues.sortOrder = 1;
  }

  sortValues.sortColumn = column;

  return function (first: IListItemContent, second: IListItemContent) {
    const result =
    valueFormatter(first.columnValues) < valueFormatter(second.columnValues)
        ? -1
        : valueFormatter(first.columnValues) > valueFormatter(second.columnValues)
        ? 1
        : 0;

    return result * sortValues.sortOrder;
  };
};

export const getGridCols = (columnCount: number) => {
  switch (columnCount) {
    case 1: {
      return "grid-cols-1";
    }
    case 2: {
      return "grid-cols-1";
    }
    case 3: {
      return "grid-cols-3";
    }
    case 4: {
      return "grid-cols-4";
    }
    case 5: {
      return "grid-cols-5";
    }
    case 6: {
      return "grid-cols-6";
    }
    case 7: {
      return "grid-cols-7";
    }
    case 8: {
      return "grid-cols-8";
    }
    case 9: {
      return "grid-cols-7";
    }
    case 10: {
      return "grid-cols-8";
    }
    default: {
      return "grid-cols-1";
    }
  }
}