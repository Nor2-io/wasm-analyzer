import { Link } from "./Link";
import LabeledContent from "./LabeledContent";
import type { TClassList, TPillData } from "./types";
import "../styles/tailwind.css";
import { Show, type JSXElement, For } from "solid-js";
import { twMerge } from "tailwind-merge";
import PillList from "./PillList";
import { ToolTip } from "./ToolTip";
import { QuestionmarkIcon } from "./icons/Icons";
import { A } from "@solidjs/router";
import Label from "./Label";
import { WasmModuleType } from "../wa/interfaces/nornor-wasm-analyzer-types";

export interface IAuthor {
  name: string;
  url?: string;
  onClick?: (() => void) | ((value?: string) => void);
}

export interface SearchResultItemProps {
  id?: string;
  "aria-label"?: string;
  class?: string;
  classList?: TClassList;
  "data-testid"?: string;
  header: string;
  headerOnClick?: (() => void) | ((value?: string) => void);
  href?: string;
  version: string;
  description?: string;
  homepageUrl?: string;
  documentationUrl?: string;
  repositoryUrl?: string;
  categories?: TPillData[];
  latestRelease?: Date;
  releases?: number;
  componentType?: WasmModuleType;
  size: string;
  optional?: boolean | "True" | "False";
  authors?: string | IAuthor[];
  license?: string | JSXElement;
  translationFunction?: (value: string) => string;
  locale: string;
  target?: "_blank" | "_self" | "_parent" | "_top" | "framename";
}

export const SearchResultItem = (props: SearchResultItemProps): JSXElement => {
  const getClass = (containerClass?: string): string => {
    return twMerge(
      "grid pr-4 grid-cols-1 grid-rows-6 md:grid-rows-2 md:grid-cols-2 md:pr-0 grid-col bg-neutral-20 w-full h-128 md:h-fit justify-between space-x-1 lg:min-w-152 xl:max-w-280",
      containerClass ?? "",
      ""
    );
  };

  const translate = (value: string): string => {
    if (props.translationFunction) {
      return props.translationFunction(value);
    }

    return value;
  };

  const getAuthors = (authors: string | IAuthor[]): JSXElement => {
    if (typeof authors === "string") {
      return (
        <div class="w-60 md:w-52 lg:w-72 space-x-1 line-clamp-2">{authors}</div>
      );
    }

    return (
      <div class="w-60 lg:w-72 space-x-1 line-clamp-2">
        <For each={authors}>
          {(author) => {
            return (
              <span>
                <Link
                  href={author.url}
                  onClick={author.onClick}
                  class={"text-[length:1rem] text-neutral-350"}
                  target={props.target}
                >
                  {author.name}
                </Link>
                {author.name !== authors[authors.length - 1].name &&
                author.name !== authors[authors.length - 2].name
                  ? ", "
                  : author.name === authors[authors.length - 2].name
                  ? translate(" and ")
                  : ""}
              </span>
            );
          }}
        </For>
      </div>
    );
  };

  const getComponentTypeColor = (type?: WasmModuleType): string => {
    if (!type) return "";
    switch (type) {
      case "component": {
        return "text-primary-350";
      }
      case "interface": {
        return "text-pill-1";
      }
      case "core": {
        return "text-neutral-350";
      }
    }
  };

  const getComponentTypeTooltip = (type?: WasmModuleType): string => {
    if (!type) return "";
    switch (type) {
      case "component": {
        return translate("Component type");
      }
      case "interface": {
        return translate("Interface type");
      }
      case "core": {
        return translate("Core module type");
      }
    }
  };

  const onClick = () => {
    if (props.headerOnClick) {
      props.headerOnClick();
    }
  };

  return (
    <div
      data-testid={props["data-testid"] ?? "searchresultitem"}
      aria-label={props["aria-label"]}
      id={props.id}
      class={getClass(props.class)}
    >
      <div class="flex flex-col md:flex-row w-full row-span-2 md:row-span-1">
        <div class={"flex h-full flex-col w-full"}>
          <div class="flex flex-col space-y-2 h-3 md:flex-grow w-full">
            <div class="flex flex-col lg:flex-row gap-y-2 md:gap-y-0 h-fit w-full">
              <div class="flex flex-col lg:w-fit lg:flex-row pt-1.5 h-fit">
                <A
                  class="flex h-fit w-full lg:w-fit lg:max-w-full"
                  onClick={onClick}
                  href={props.href ?? "#"}
                >
                  <Label class="h-auto w-full text-lg md:text-base break-all lg:pt-0 lg:text-lg text-neutral font-bold mr-4 cursor-pointer hover:text-primary-350 hover:underline flex-grow">
                    {translate(props.header)}
                  </Label>
                </A>
                <div class="flex h-fit w-full lg:w-fit lg:max-w-full pr-2 pt-[0.2rem]">
                  {props.version}
                </div>
              </div>
              <Show when={props.componentType}>
                <div
                  class={twMerge(
                    "flex pt-1 lg:pt-2.5 h-fit text-[length:0.875rem] font-semibold relative w-1/4 flex-grow",
                    getComponentTypeColor(props.componentType)
                  )}
                >
                  <span>{props.componentType}</span>
                  <div class="ml-1 flex pt-1 lg:pt-1">
                    <ToolTip
                      content={getComponentTypeTooltip(props.componentType)}
                      class="-top-6 lg:top-0.5 lg:-left-3"
                      contentClass="w-36 h-16 lg:flex-col lg:justify-center lg:bottom-[100%] lg:-left-11"
                      position="after"
                      arrowPosition="middle"
                      arrow={true}
                      arrowClass="lg:left-0 lg:bottom-3"
                    >
                      <QuestionmarkIcon />
                    </ToolTip>
                  </div>
                </div>
              </Show>
            </div>
            <div class="flex w-full text-neutral-300 flex-wrap h-56">
              {props.description ?? ""}
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col space-y-2 md:w-64 lg:w-96 row-span-3 md:row-span-2">
        <div class="flex space-x-3">
          <Show when={props.latestRelease}>
            <LabeledContent
              labelText={translate("Latest Release")}
              labelPosition="above"
              translationFunction={translate}
              class="lg:pr-3"
            >
              {props.latestRelease
                ? props.latestRelease.toLocaleString(props.locale, {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : ""}
            </LabeledContent>
          </Show>
          <Show when={props.releases}>
            <LabeledContent
              labelText={translate("Releases")}
              labelPosition="above"
              translationFunction={translate}
            >
              {props.releases}
            </LabeledContent>
          </Show>
        </div>
        <div class="flex space-x-4">
          <LabeledContent
            labelText={translate("Size")}
            labelPosition="above"
            translationFunction={translate}
            class="lg:pr-3 flex"
          >
            {props.size}
          </LabeledContent>
          <Show when={props.optional !== undefined && props.optional !== null}>
            <LabeledContent
              labelText={translate("Optional")}
              labelPosition="above"
              translationFunction={translate}
            >
              {props.optional?.toString()}
            </LabeledContent>
          </Show>
          <Show when={props.authors}>
            <LabeledContent
              labelText={translate("Author")}
              labelPosition="above"
              translationFunction={translate}
              class="flex lg:w-64"
            >
              {getAuthors(props.authors ?? "")}
            </LabeledContent>
          </Show>
        </div>
        <div>
          <LabeledContent
            labelText={translate("License")}
            labelPosition="above"
            class="flex pr-3"
            translationFunction={translate}
            wrapperClass="line-clamp-3 max-w-full md:max-w-80 lg:max-w-96"
          >
            {props.license}
          </LabeledContent>
        </div>
      </div>

      <div class="flex flex-col w-full">
        <div class="flex flex-wrap w-full text-[length:0.875rem] font-semibold text-primary-350 h-10 md:h-20 md:mb-3 space-x-6 lg:space-x-8">
          <Show when={props.homepageUrl}>
            <Link
              ariaLabel={translate("Link to home page")}
              href={props.homepageUrl}
              target={props.target}
            >
              {translate("Homepage")}
            </Link>
          </Show>
          <Show when={props.documentationUrl}>
            <Link
              ariaLabel={translate("Link to documentation")}
              href={props.documentationUrl}
              target={props.target}
            >
              {translate("Documentation")}
            </Link>
          </Show>
          <Show when={props.repositoryUrl}>
            <Link
              ariaLabel={translate("Link to repository")}
              href={props.repositoryUrl}
              target={props.target}
            >
              {translate("Repository")}
            </Link>
          </Show>
        </div>
        <div class="flex w-full">
          <PillList class="flex w-full flex-wrap" items={props.categories} />
        </div>
      </div>
    </div>
  );
};

export default SearchResultItem;
