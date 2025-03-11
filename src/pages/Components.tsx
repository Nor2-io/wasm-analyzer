import { JSXElement } from "solid-js";
import { ILicense, TClassList, TPillData } from "../components/types";
import { twMerge } from "tailwind-merge";
import { IListItemContent } from "../components/List/types";
import SearchResultItem, { IAuthor } from "../components/SearchResultItem";
import FlexLayout from "../components/containers/FlexLayout";
import Section from "../components/containers/Section";
import { FlexDirectionEnum } from "../components/containers/types";
import SearchBar from "../components/SearchBar";
import List from "../components/List";
import { resolveLicense } from "../components/helpers";
import PageHeader from "../components/PageHeader";
import { WasmModuleType } from "../wa/interfaces/nornor-wasm-analyzer-types";
import { currentComponent } from "../State";

export interface ComponentsProps {}

export interface IComponentsResult {
  name: string;
  version: string;
  description?: string;
  homepageUrl?: string;
  documentationUrl?: string;
  repositoryUrl?: string;
  categories?: TPillData[];
  latestRelease?: Date;
  componentType?: WasmModuleType;
  optional: boolean | "True" | "False";
  size: string;
  authors?: string | IAuthor[];
  license: string | ILicense;
  locale?: string;
}

export interface ComponentsProps {
  id?: string;
  ariaLabel?: string;
  class?: string;
  classList?: TClassList;
  "data-testid"?: string;
  //searchFunction: (value: string) => void;
  translationFunction?: (value: string) => string;
}

export const ComponentsPage = (props: ComponentsProps) => {
  const getClass = (): string => {
    return twMerge(props.class, "pt-14 py-6 px-8 bg-neutral-10 h-fit w-280");
  };

  const translate = (value: string): string => {
    if (props.translationFunction) {
      return props.translationFunction(value);
    }

    return value;
  };

  const items = currentComponent()
    ?.getChildComponents()
    .map((value): IComponentsResult => {
      return {
        name: value.getModuleInformation().name,
        version: "1",
        componentType: value.getType(),
        optional: false,
        size: value.getModuleInformation().size.toString(),
        license: "None",
      };
    });

  const getFormattedResults = (
    items?: IComponentsResult[]
  ): IListItemContent[] => {
    const formattedResults: IListItemContent[] = [];

    if (items) {
      for (let i = 0; i < items.length; i++) {
        const headerClick = () => {};

        const item = (
          <SearchResultItem
            header={items[i].name}
            headerOnClick={headerClick}
            version={items[i].version}
            componentType={items[i].componentType}
            description={items[i].description}
            homepageUrl={items[i].homepageUrl}
            documentationUrl={items[i].documentationUrl}
            repositoryUrl={items[i].repositoryUrl}
            latestRelease={items[i].latestRelease}
            size={items[i].size}
            authors={items[i].authors}
            license={resolveLicense(items[i].license)}
            locale={items[i].locale ?? "en-US"}
            translationFunction={translate}
          />
        );

        formattedResults.push({
          id: "test",
          columnValues: [{ id: "test", value: item, key: i }],
        });
      }
    }

    return formattedResults;
  };

  return (
    <div class={getClass()} data-testid={props["data-testid"]}>
      <FlexLayout direction={FlexDirectionEnum.column}>
        <PageHeader
          id="components-heading-section"
          heading="Components"
          class="w-full max-w-280"
        >
          <p class="text-neutral pb-6">
            {
              "Find out more about a given Component by clicking its entry in the list. Read more about Components, "
            }
            <a
              href="https://docs.wa2.dev/wasm/concepts-and-features/4-component-model/"
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

        <Section dividers="none" class="flex h-fit bg-neutral-10 pt-9">
          <div class="flex h-fit w-full flex-col space-y-9">
            <div class="flex flex-row space-x-3">
              <SearchBar class="w-176 bg-neutral-20" />
            </div>
            <List
              id="components-list"
              items={getFormattedResults(items)}
              type={"list"}
            />
          </div>
        </Section>
      </FlexLayout>
    </div>
  );
};

export default ComponentsPage;
