import "../../styles/tailwind.css";
import {
  Accessor,
  For,
  createSignal,
  type JSXElement,
  Switch,
  Match,
  createMemo,
} from "solid-js";
import type { TClassList } from "../types";
import { twMerge } from "tailwind-merge";
import PagingFooter from "./PagingFooter";
import ListItem from "./ListItem";
import {
  type IListItemContent as listItemContent,
  type ISummaryHeaderTexts,
  type TList,
  type ISortValues,
  ListTypeEnum,
} from "./types";
import { getGridCols, sortByColumn } from "./helpers";
import { generatePageSymbols } from "./helpers";
import TableItem from "./TableItem";
import { SummaryHeader } from "./SummaryHeader";
import { TriangleDownIcon, TriangleUpIcon } from "../icons/Icons";

export type IListItemContent = listItemContent;

export interface ICustomColumn {
  header: string;
  sortable: boolean;
  headerClass: string;
  columnClass: string;
}

export interface ListProps {
  ariaLabel?: string;
  id: string;
  name?: string;
  content?: string | JSXElement;
  headers?: string[];
  headerClass?: string;
  items?: IListItemContent[];
  class?: string;
  classList?: TClassList;
  itemClass?: string;
  itemContainerClass?: string;
  children?: JSXElement;
  customColumns?: ICustomColumn[];
  customColumnsHeaderContainerClass?: string;
  sortable?: boolean;
  pageSize?: number;
  type: TList;
  summaryHeaderTexts?: ISummaryHeaderTexts;
  translationFunction?: (value: string) => string;
}

let columnCount: number;
let sortValues: ISortValues;
let currentColumnSort: { column: number | undefined; step: number };

export const List = (props: ListProps): JSXElement => {
  sortValues = {
    sortColumn: 0,
    sortOrder: -1,
  };

  currentColumnSort = {
    column: undefined,
    step: -1,
  };

  const [listContent, setListContent] = createSignal(
    props.items ? [...props.items] : []
  );

  const getPage = (pageNumber: number): IListItemContent[] => {
    if (props.pageSize) {
      return [...listContent()].slice(
        (pageNumber - 1) * props.pageSize,
        pageNumber * props.pageSize
      );
    } else {
      return listContent();
    }
  };

  const [pageContent, setPageContent] = createSignal(getPage(1));
  const [currentPageNumber, setCurrentPageNumber] = createSignal(1);
  const [headerSymbol, setHeaderSymbol] = createSignal<{
    symbol: "" | "up" | "down";
    column: number;
  }>({ symbol: "", column: -1 });

  const [pageSymbols, setPageSymbols] = createSignal(
    generatePageSymbols(
      1,
      props.pageSize ? props.pageSize : 0,
      props.items ? props.items.length : 0
    )
  );

  const setPage = (pageNumber: number) => {
    setCurrentPageNumber(pageNumber);
    setPageContent(getPage(pageNumber));

    setPageSymbols(
      generatePageSymbols(
        pageNumber,
        props.pageSize ? props.pageSize : 0,
        props.items ? props.items.length : 0
      )
    );
  };

  const translate = (value: string): string => {
    if (props.translationFunction) {
      return props.translationFunction(value);
    }

    return value;
  };

  getPage(1);

  columnCount = props.headers ? props.headers.length : 0;

  if (props.items) {
    for (let i = 0; i < props.items?.length; i++) {
      const itemColumnCount = props.items[i].columnValues.length;

      if (columnCount < itemColumnCount) {
        columnCount = itemColumnCount;
      }
    }
  }

  for (let i = 0; i < listContent.length; i++) {
    const itemColumnCount = listContent()[i].columnValues.length;

    if (columnCount < itemColumnCount) {
      columnCount = itemColumnCount;
    }
  }

  const items: Accessor<IListItemContent[]> = createMemo(() => {
    return props.items ?? [];
  });

  const headerClick = (column: number) => {

    let lastColumn = currentColumnSort.column;
    let step = currentColumnSort.step;

    if (step < 2 && lastColumn === column) {
      if (step === 0) {
        setHeaderSymbol({ column: column, symbol: "down" });
      }

      if (step === 1) {
        setHeaderSymbol({ column: column, symbol: "up" });
      }

      step++;
      setListContent([...listContent()].sort(sortByColumn(column, sortValues)));
    } else if (step === 2 && lastColumn === column) {
      step = 0;
      setListContent([...items()]);

      setHeaderSymbol({ column: -1, symbol: "" });
    } else {
      step = 1;
      setListContent([...listContent()].sort(sortByColumn(column, sortValues)));

      setHeaderSymbol({ column: column, symbol: "down" });
    }

    currentColumnSort = {
      step: step,
      column: column,
    };

    setPage(currentPageNumber());
  };

  return (
    <div
      id={props.id}
      data-testid="list"
      class={twMerge(
        " flex w-full flex-col bg-neutral-10 font-medium text-neutral items-center md:items-start",
        props.type === ListTypeEnum.table || (props.type as string) === "table"
          ? " rounded-md border-2 "
          : "",
        props.class
      )}
      aria-label={props.ariaLabel}
      role={props.type === ListTypeEnum.table ? "table" : "list"}
    >
      {props.children}
      {props.summaryHeaderTexts && props.items ? (
        <SummaryHeader
          id={props.id + "-summaryheader"}
          summaryHeaderTexts={props.summaryHeaderTexts}
          translationFunction={translate}
          currentPageNumber={currentPageNumber()}
          totalSize={props.items.length}
          pageSize={props.pageSize}
        />
      ) : (
        <></>
      )}
      {props.headers && !props.customColumns ? (
        <div class={twMerge(getGridCols(columnCount), "grid h-11 px-7 pt-2")}>
          {props.sortable ? (
            <For each={props.headers}>
              {(header, i) => {
                return (
                  <div class="flex">
                    <button
                      id={props.id + "-header-" + i()}
                      name={props.id + "-header-" + i()}
                      class={
                        "inline-block h-fit w-fit no-outline reset-appearance focus:ring-0 focus:ring-transparent"
                      }
                      role="columnheader"
                      onClick={() => headerClick(i())}
                    >
                      {header}
                    </button>
                    <div class="flex pl-2 pt-0.5">
                      {headerSymbol().column === i() ? (
                        headerSymbol().symbol === "" ? (
                          ""
                        ) : headerSymbol().symbol === "up" ? (
                          <TriangleUpIcon class="overflow-visible h-4 w-4 fill-neutral-200" />
                        ) : (
                          <TriangleDownIcon class="overflow-visible h-4 w-4 fill-neutral-200" />
                        )
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                );
              }}
            </For>
          ) : (
            <For each={props.headers}>
              {(header, i) => {
                return (
                  <div
                    id={props.id + "-header-" + i()}
                    class={"inline-block h-fit w-fit"}
                    role="columnheader"
                  >
                    {header}
                  </div>
                );
              }}
            </For>
          )}
        </div>
      ) : (
        <></>
      )}
      {props.customColumns ? (
        <div class={twMerge("opacity-0 h-0 w-0 pl-0 md:h-fit md:opacity-100 flex flex-row md:px-7 md:w-full lg:max-w-280", props.customColumnsHeaderContainerClass)}>
          <For each={props.customColumns}>
            {(column, i) => {
              return (
                <div class={column.headerClass}>
                  {column.sortable ? (
                    <>
                      <button
                        id={props.id + "-header-" + i()}
                        name={props.id + "-header-" + i()}
                        class={
                          "block truncate h-0 w-0 sm:h-fit sm:w-fit no-outline reset-appearance focus:ring-0 focus:ring-transparent"
                        }
                        role="columnheader"
                        onClick={() => headerClick(i())}
                      >
                        {column.header}
                      </button>
                      <div class="flex pl-2 pt-0.5">
                        {headerSymbol().column === i() ? (
                          headerSymbol().symbol === "" ? (
                            ""
                          ) : headerSymbol().symbol === "up" ? (
                            <TriangleUpIcon class="overflow-visible h-0 w-0 sm:h-4 sm:w-4 fill-neutral-200" />
                          ) : (
                            <TriangleDownIcon class="overflow-visible h-0 w-0 sm:h-4 sm:w-4 fill-neutral-200" />
                          )
                        ) : (
                          <></>
                        )}
                      </div>
                    </>
                  ) : (
                    <div
                      id={props.id + "-header-" + i()}
                      class={"block truncate h-0 w-0 sm:h-fit sm:w-fit"}
                      role="columnheader"
                    >
                      {column.header}
                    </div>
                  )}
                </div>
              );
            }}
          </For>
        </div>
      ) : (
        <></>
      )}
      <div class={twMerge("flex flex-col w-full", props.itemContainerClass ?? "")}>
        {pageContent() && pageContent().length > 0 ? (
          <For each={pageContent()}>
            {(item) => {
              return (
                <Switch
                  fallback={
                    <ListItem
                      id={item.id}
                      class={props.itemClass}
                      columnValues={item.columnValues}
                      columnCount={columnCount}
                    />
                  }
                >
                  <Match when={props.type === ListTypeEnum.table}>
                    <TableItem
                      id={item.id}
                      class={props.itemClass}
                      columnValues={item.columnValues}
                      columnCount={columnCount}
                      customColumns={props.customColumns}
                    />
                  </Match>
                </Switch>
              );
            }}
          </For>
        ) : (
          <></>
        )}
      </div>
      {props.pageSize ? (
        <PagingFooter
          id={props.id + "-pagingFooter"}
          pageNumber={currentPageNumber()}
          pageSymbols={pageSymbols()}
          pageCount={
            props.items ? Math.ceil(props.items.length / props.pageSize) : 0
          }
          onClick={setPage}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default List;
