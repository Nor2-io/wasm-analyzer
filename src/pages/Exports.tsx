import List, { ICustomColumn } from "../components/List";
import { getFormattedExportResults } from "../components/helpers";
import { currentComponent } from "../State";
import SummaryCard from "../components/SummaryCard";
import PageHeader from "../components/PageHeader";

export interface ExportsProps {}

const tableStyling =
  "w-fit 5xs:w-full w-full sm:bg-neutral-20 text-sm rounded-lg border-transparent sm:border sm:border-neutral-50";

const headerContainerStyling =
  "opacity-0 h-0 w-0 pl-0 sm:h-fit sm:opacity-100 flex flex-row sm:px-7 sm:w-full lg:max-w-280 gap-x-2";

const exportColumn: ICustomColumn = {
  header: "Export",
  headerClass:
    "flex sm:basis-1/4 sm:h-11 items-center sm:align-left sm:truncate flex-grow",
  sortable: true,
  columnClass: "flex w-full sm:basis-1/4 items-center sm:align-left flex-grow",
};

const itemClass =
  "h-fit sm:h-16 bg-neutral-20 w-full lg:max-w-280 rounded-lg border sm:border-t border-neutral-50 sm:border-transparent sm:rounded-none sm:rounded-b-lg sm:border-t-neutral-50 px-7 font-normal sm:font-medium text-neutral flex flex-col sm:flex-row space-y-2 sm:space-y-0 pt-5 pb-5 sm:pb-0 sm:pt-0";
const itemContainerClass = "space-y-4 sm:space-y-0";

export function ExportsPage(props: ExportsProps) {
  const exports = currentComponent()?.getCoreExports();
  if (!exports) {
    return null;
  }

  const getStandardColumn = (
    header: string,
    sortable: boolean
  ): ICustomColumn => {
    return {
      header: header,
      headerClass:
        "flex sm:basis-1/4 sm:h-11 items-center sm:align-left sm:truncate",
      sortable: sortable,
      columnClass: "flex w-full sm:basis-1/4 items-center sm:align-left",
    };
  };

  return (
    <div class="flex flex-col items-center py-6 max-w-full sm:max-w-280">
      <PageHeader
        id="exports-heading-section"
        heading="Exports"
        class="w-full max-w-280 pb-8"
      >
        <p class="text-neutral">
          {
            "This is a summary of the accessible Exports of your selected file. Read more about Exports, "
          }
          <a
            href="https://docs.wa2.dev/wasm/building-blocks/2-exports/"
            class="text-primary-350 hover:text-primary-300 underline underline-offset-2"
          >
            here
          </a>
          {"."}
          <br />
          <br />
          {
            "If you need additional information about the WASM Analyzer's capabilities, have a look at our "
          }
          <a
            href="https://docs.wa2.dev/"
            class="text-primary-350 hover:text-primary-300 underline underline-offset-2"
          >
            documentation
          </a>
          {"."}
        </p>
      </PageHeader>

      <div class="flex w-full justify-center lg:justify-start left-0">
        <div class="grid w-full max-w-128 lg:max-w-224 grid-cols-1 5xs:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard
            id="functions-summary-card"
            href="#functions"
            header="Exported Functions"
          >
            {exports?.functions.length}
          </SummaryCard>
          <SummaryCard
            id="tables-summary-card"
            href="#tables"
            header="Exported Tables"
          >
            {exports?.tables.length}
          </SummaryCard>
          <SummaryCard
            id="memories-summary-card"
            href="#memories"
            header="Exported Memories"
          >
            {exports?.memories.length}
          </SummaryCard>
          <SummaryCard
            id="globals-summary-card"
            href="#globals"
            header="Exported Globals"
          >
            {exports?.globals.length}
          </SummaryCard>
        </div>
      </div>

      {exports?.functions && exports?.functions.length ? (
        <div class="py-10 w-full">
          <h2 id="functions" class="text-base font-semibold text-neutral py-10">
            Functions
          </h2>

          <List
            type="table"
            id="exports-table-functions"
            items={
              /*@once*/ getFormattedExportResults(
                exports?.functions ?? [],
                "functions"
              )
            }
            customColumns={[
              exportColumn,
              getStandardColumn("Parameters", false),
              getStandardColumn("Result", false),
            ]}
            sortable={true}
            class={tableStyling}
            itemClass={itemClass}
            itemContainerClass={itemContainerClass}
            customColumnsHeaderContainerClass={headerContainerStyling}
          />
        </div>
      ) : null}

      {exports?.tables.length ? (
        <div class="py-10 w-full">
          <h2 id="tables" class="text-base font-semibold text-neutral py-10">
            Tables
          </h2>

          <List
            type="table"
            id="exports-table-tables"
            items={
              /*@once*/ getFormattedExportResults(
                exports?.tables ?? [],
                "tables"
              )
            }
            customColumns={[
              exportColumn,
              getStandardColumn("Type", true),
              getStandardColumn("Minimum", true),
              getStandardColumn("Maximum", true),
            ]}
            sortable={true}
            class={tableStyling}
            itemClass={itemClass}
            itemContainerClass={itemContainerClass}
            customColumnsHeaderContainerClass={headerContainerStyling}
          />
        </div>
      ) : null}

      {exports?.memories.length ? (
        <div class="py-10 w-full">
          <h2 id="memories" class="text-base font-semibold text-neutral py-10">
            Memories
          </h2>

          <List
            type="table"
            id="exports-table-memories"
            items={
              /*@once*/ getFormattedExportResults(
                exports?.memories ?? [],
                "memories"
              )
            }
            customColumns={[
              {
                header: "Export",
                headerClass:
                  "flex w-full sm:w-1/5 sm:h-11 items-center flex-grow",
                sortable: true,
                columnClass:
                  "flex w-full sm:w-1/5 sm:truncate items-center flex-grow",
              },
              {
                header: "Thread Sharing",
                headerClass: "flex w-full sm:w-1/5 sm:h-11 items-center",
                sortable: true,
                columnClass: "flex w-full sm:w-1/5 sm:truncate items-center",
              },
              {
                header: "Minimum Memory",
                headerClass: "flex w-full sm:w-1/5 sm:h-11 items-center",
                sortable: true,
                columnClass: "flex w-full sm:w-1/5 sm:truncate items-center",
              },
              {
                header: "Maximum Memory",
                headerClass: "flex w-full sm:w-1/5 sm:h-11 items-center",
                sortable: true,
                columnClass: "flex w-full sm:w-1/5 sm:truncate items-center",
              },
              {
                header: "Memory 64",
                headerClass: "flex w-full sm:w-1/12 sm:h-11 items-center",
                sortable: true,
                columnClass: "flex w-full sm:w-1/12 sm:truncate items-center",
              },
            ]}
            sortable={true}
            class={tableStyling}
            itemClass={itemClass}
            itemContainerClass={itemContainerClass}
            customColumnsHeaderContainerClass={headerContainerStyling}
          />
        </div>
      ) : null}
      {exports?.globals.length ? (
        <div class="py-10 w-full">
          <h2 id="globals" class="text-base font-semibold text-neutral py-10">
            Globals
          </h2>

          <List
            type="table"
            id="exports-table-globals"
            items={
              /*@once*/ getFormattedExportResults(
                exports?.globals ?? [],
                "globals"
              )
            }
            customColumns={[
              exportColumn,
              getStandardColumn("Type", true),
              getStandardColumn("Mutable", true),
            ]}
            sortable={true}
            class={tableStyling}
            itemClass={itemClass}
            itemContainerClass={itemContainerClass}
            customColumnsHeaderContainerClass={headerContainerStyling}
          />
        </div>
      ) : null}
    </div>
  );
}
