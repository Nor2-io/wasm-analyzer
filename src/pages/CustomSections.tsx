import { currentComponent } from "../State";
import List from "../components/List";
import { getFormattedCustomSectionResults } from "../components/helpers";
import PageHeader from "../components/PageHeader";

export interface CustomSectionsProps {}

export function CustomSectionsPage(props: CustomSectionsProps) {
  const tableStyling =
    "w-fit w-full sm:bg-neutral-20 text-sm rounded-lg border-transparent sm:border sm:border-neutral-50";
  const headerContainer =
    "opacity-0 h-0 w-0 pl-0 sm:h-fit sm:opacity-100 flex flex-row sm:px-7 sm:w-full lg:max-w-280";

  const nameColumn = {
    header: "Name",
    headerClass: "flex sm:w-1/2 flex-grow sm:h-11 items-center",
    sortable: true,
    columnClass: "flex w-full sm:w-1/2 flex-grow items-center sm:align-left",
  };

  const sizeColumn = {
    header: "Size",
    headerClass: "flex sm:w-1/2 sm:h-11 items-center",
    sortable: true,
    columnClass: "flex sm:w-1/2 items-center sm:align-left",
  };

  const itemClass =
    "h-fit sm:h-16 bg-neutral-20 w-full lg:max-w-280 rounded-lg border sm:border-t border-neutral-50 sm:border-transparent sm:rounded-none sm:rounded-b-lg sm:border-t-neutral-50 px-7 font-normal sm:font-medium text-neutral flex flex-col sm:flex-row space-y-2 sm:space-y-0 pt-5 pb-5 sm:pb-0 sm:pt-0";
  const itemContainerClass = "space-y-4 sm:space-y-0";

  const sections = currentComponent()?.getCustomSections();

  return (
    <div class="flex flex-col items-center max-w-280 py-6 ">
      <PageHeader
        id="customssections-heading-section"
        heading="Custom Sections"
        class="w-full max-w-280"
      >
        <p class="text-neutral pb-6">
          {
            "This is a brief summary of the Custom Sections contained in your selected file. Read more about Custom Sections, "
          }
          <a
            href="https://docs.wa2.dev/wasm/building-blocks/7-custom-sections/"
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

      {sections && sections.length > 0 ? (
        <div class="py-10 w-full">
          <h2
            id="customsections"
            class="text-base font-semibold text-neutral py-10"
          >
            Custom Sections
          </h2>

          <List
            type="table"
            id="customsections-table"
            items={/*@once*/ getFormattedCustomSectionResults(sections)}
            customColumns={[nameColumn, sizeColumn]}
            class={tableStyling}
            itemClass={itemClass}
            itemContainerClass={itemContainerClass}
            customColumnsHeaderContainerClass={headerContainer}
          />
        </div>
      ) : null}
    </div>
  );
}
