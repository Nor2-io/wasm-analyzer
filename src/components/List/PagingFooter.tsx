import Button from "../Button";
import { Index, Switch, Match, JSXElement } from "solid-js";
import { twMerge } from "tailwind-merge";

export interface PagingFooterProps {
  id: string;
  pageNumber: number;
  pageSymbols: string[];
  pageCount: number;
  class?: string;
  onClick: (pageNumber: number) => void;
  translationFunction?: (value: string) => string;
}

export const PagingFooter = (props: PagingFooterProps): JSXElement => {
  const translate = (value: string): string => {
    if (props.translationFunction) {
      return props.translationFunction(value);
    }

    return value;
  };

  const getClass = (): string => {
    return twMerge(
      "flex h-20 w-full flex-row items-center px-6 py-4 text-sm14",
      props.class
    );
  };

  return (
    <div class={getClass()} id={props.id} data-textid="paging-footer">
      {props.pageSymbols.length > 1 ? (
        <Index each={props.pageSymbols}>
          {(pageSymbol, i) => {
            return (
              <Switch
                fallback={
                  <Button
                    id={props.id + "-page-" + i}
                    ariaLabel={"Go to page " + pageSymbol()}
                    data-testid={"page-button"}
                    class={
                      "flex h-10 w-10 border-none bg-transparent text-sm14 text-neutral-200 shadow-transparent hover:bg-primary-200 hover:text-neutral-10 focus:ring-0"
                    }
                    onClick={() => props.onClick(Number(pageSymbol()))}
                  >
                    {pageSymbol()}
                  </Button>
                }
              >
                <Match when={pageSymbol() === props.pageNumber.toString()}>
                  <Button
                    id={props.id + "-page-" + i}
                    ariaLabel={"Go to page " + pageSymbol()}
                    data-testid={"page-button"}
                    class={
                      "flex h-10 w-10 border-none bg-neutral-100 text-sm14 text-neutral shadow-transparent hover:bg-primary-200 hover:text-neutral-10 focus:ring-0"
                    }
                    onClick={() => props.onClick(Number(pageSymbol()))}
                  >
                    {pageSymbol()}
                  </Button>
                </Match>
                <Match when={Number.isNaN(pageSymbol())}>
                  <div
                    id={props.id + i}
                    data-testid={"page-button-divider"}
                    class={
                      "flex h-10 w-10 flex-col items-center justify-center border-none"
                    }
                  >
                    <div class={"flex h-4 text-sm14 text-neutral-200"}>
                      {pageSymbol()}
                    </div>
                  </div>
                </Match>
              </Switch>
            );
          }}
        </Index>
      ) : (
        <></>
      )}
      <div class={"flex grow flex-row justify-end space-x-4"}>
        <div class="flex grow flex-row justify-end">
          {props.pageNumber > 1 ? (
            <Button
              id={props.id + "-prevbutton"}
              class={
                "group h-10 w-20 space-x-2 border border-neutral-100 bg-neutral-20 px-0 py-0 text-sm14 text-neutral-200 shadow-sm shadow-neutral-50 hover:bg-primary-200 hover:text-neutral-10 focus:ring-0 focus:ring-offset-0"
              }
              ariaLabel="Go to previous2 page"
              onClick={() => props.onClick(props.pageNumber - 1)}
            >
              <svg
                fill="none"
                stroke-width="2"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 overflow-visible stroke-neutral-200 group-hover:stroke-neutral-10"
                stroke-linecap="round"
                stroke-linejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span>{translate("Prev")}</span>
            </Button>
          ) : (
            <></>
          )}
        </div>
        <div class="inline-block w-20">
          {props.pageNumber < props.pageCount ? (
            <Button
              id={props.id + "-nextbutton"}
              class={
                "group h-10 w-20 space-x-2 border border-neutral-100 bg-neutral-20 px-0 py-0 text-sm14 text-neutral-200 shadow-sm shadow-neutral-50 hover:bg-primary-200 hover:text-neutral-10 focus:ring-0 focus:ring-offset-0"
              }
              ariaLabel="Go to next page"
              onClick={() => props.onClick(props.pageNumber + 1)}
            >
              <span>{translate("Next")}</span>
              <svg
                fill="none"
                stroke-width="2"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 overflow-visible stroke-neutral-200 group-hover:stroke-neutral-10"
                stroke-linecap="round"
                stroke-linejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default PagingFooter;
