import { For, JSXElement, Show } from "solid-js";
import { currentComponent } from "../State";
import { Hash } from "../components/HashComponent";
import { LanguagePill } from "../components/LanguagePill";
import { ToolPill } from "../components/ToolPill";
import { SdkPill } from "../components/SdkPill";
import { Markdown } from "../components/Markdown";
import { License } from "../components/License";
import { H2 } from "../components/H2";
import PillList from "../components/PillList";
import LabeledContent from "../components/LabeledContent";
import {
  DocumentationIcon,
  FileIcon,
  GithubIcon,
  HomepageIcon,
  RepositoryIcon,
} from "../components/icons/Icons";
import { IAuthor } from "../components/SearchResultItem";
import { Link } from "../components/Link";
import { twMerge } from "tailwind-merge";
import PageHeader from "../components/PageHeader";

const version = (): string => {
  return "v(PLACEHOLDER)";
};

export interface MetadataProps {}

export function Metadata(props: MetadataProps) {
  //const list = registryMetadata()?.categories ?? [];
  //const pills = list.map((value: string) => {
  //  return { key: value, label: value };
  //});

  const info = currentComponent()?.getModuleInformation();

  const getAuthors = (authors?: string | string[] | IAuthor[]): JSXElement => {
    if (!authors) {
      return (
        <div class="w-60 md:w-full text-sm 2xl:text-xl space-x-1 line-clamp-2 text-neutral">
          Unknown
        </div>
      );
    }

    if (typeof authors === "string") {
      return (
        <div class="w-60 md:w-full text-sm 2xl:text-xl space-x-1 line-clamp-2 text-neutral">
          {authors}
        </div>
      );
    }

    return (
      <div class="flex flex-col w-60 md:w-full">
        <For each={authors}>
          {(author) => {
            if (typeof author === "string") {
              return (
                <div class="flex flex-row">
                  <div class={"text-sm 2xl:text-xl text-neutral"}>{author}</div>
                </div>
              );
            } else {
              return (
                <div class="flex flex-row">
                  <Link
                    href={author.url}
                    onClick={author.onClick}
                    class={"text-sm 2xl:text-xl text-neutral"}
                    // target={props.target}
                  >
                    {author.name}
                  </Link>
                </div>
              );
            }
          }}
        </For>
      </div>
    );
  };

  //const getLinkIcon = (type: LinkType, address: string) => {
  //  const defaultStyling =
  //    "h-5 w-5 2xl:h-7 2xl:w-7 mt-1 2xl:mb-0.5 2xl:mr-2 mr-1.5";
  //
  //  switch (type.kind) {
  //    case "Custom": {
  //      return <HomepageIcon class={defaultStyling} />;
  //    }
  //    case "Documentation": {
  //      return <DocumentationIcon class={defaultStyling} />;
  //    }
  //    case "Homepage": {
  //      return <HomepageIcon class={defaultStyling} />;
  //    }
  //    case "Repository": {
  //      if (address.toLowerCase().includes("github")) {
  //        return (
  //          <GithubIcon class="h-5 w-5 2xl:h-7 2xl:w-7 mt-1 2xl:mb-0.5 2xl:mr-3 mr-2" />
  //        );
  //      }
  //
  //      return <RepositoryIcon class={defaultStyling} />;
  //    }
  //    default: {
  //      return <HomepageIcon class={defaultStyling} />;
  //    }
  //  }
  //};

  const countVisibleSectionsTop = (): number => {
    let count = 6;

    if (currentComponent()) {
      count += 2;
    }

    if (info?.unknowMetadata && info.unknowMetadata.length > 0) {
      count++;
    }

    return count;
  };

  return (
    <>
      <div class="flex flex-col items-center w-full h-full py-6">
        <div class="flex flex-col gap-8 w-full">
          <PageHeader
            id="metadata-heading-section"
            heading="Metadata"
            class="w-full max-w-280"
          >
            <p class="text-neutral">
              {
                "This is a representation of the available Metadata contained in the package section of the file you've selected."
              }
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
        </div>

        <div class="w-full">
          <div
            class={twMerge(
              "grid grid-cols-1 lg:grid-flow-col lg:grid-cols-fiftyfifty xl:grid-cols-widermiddle-3 gap-x-[10%] max-w-full md:max-w-280 ",
              countVisibleSectionsTop() > 6
                ? "xl:grid-rows-colwisedown-3"
                : "xl:grid-rows-colwisedown-2",
              countVisibleSectionsTop() > 6
                ? countVisibleSectionsTop() > 8
                  ? "lg:grid-rows-colwisedown-5"
                  : "lg:grid-rows-colwisedown-4"
                : "lg:grid-rows-colwisedown-3"
            )}
          >
            <LabeledContent
              labelText="Name"
              labelClass="text-sm 2xl:text-lg font-normal text-neutral"
              class="border-b-neutral-20 border-b-2 w-full h-fit space-y-1 pt-8"
              labelPosition="above"
              wrapperClass="w-full space-x-1 break-all inline pb-12 text-sm 2xl:text-xl"
            >
              {info?.name}
            </LabeledContent>

            <Show when={currentComponent()}>
              <LabeledContent
                labelText="Type"
                labelClass="text-sm 2xl:text-lg font-normal text-neutral"
                class="border-b-2 w-full space-y-1 pt-8 border-b-neutral-20"
                labelPosition="above"
                wrapperClass="text-sm 2xl:text-xl flex min-h-fit h-16"
              >
                {currentComponent()?.getType()}
              </LabeledContent>
            </Show>

            <LabeledContent
              labelText="Size"
              labelClass="text-sm 2xl:text-lg font-normal text-neutral"
              class="border-b-2 w-full space-y-1 pt-8 border-b-neutral-20 xl:border-transparent"
              labelPosition="above"
              wrapperClass="text-sm 2xl:text-xl flex min-h-fit h-16"
            >
              {info?.humanSize}
            </LabeledContent>

            <Show when={currentComponent()}>
              <LabeledContent
                labelText="Version"
                labelClass="text-sm 2xl:text-lg font-normal text-neutral"
                class="border-b-neutral-20 border-b-2 w-full space-y-1 pt-8 lg:border-transparent xl:border-neutral-20"
                labelPosition="above"
                wrapperClass="text-sm 2xl:text-xl flex min-h-fit h-16"
              >
                {version()}
              </LabeledContent>
            </Show>

            <LabeledContent
              labelText={
                !info?.languages
                  ? "Language"
                  : info.languages.length > 0
                  ? "Languages"
                  : "Language"
              }
              labelClass="text-sm 2xl:text-lg font-normal text-neutral"
              class={twMerge(
                "border-neutral-20 font-normal border-b-2 w-full space-y-1 pt-8 overflow-x-hidden md:overflow-x-visible xl:border-neutral-20",
                countVisibleSectionsTop() < 7 ? "lg:border-transparent" : ""
              )}
              labelPosition="above"
              wrapperClass="text-sm 2xl:text-xl flex min-h-16 gap-x-2 w-fit h-fit pb-8 flex-wrap"
            >
              {!info?.languages || info.languages.length === 0 ? (
                <LanguagePill class="text-sm 2xl:text-xl" />
              ) : (
                <For each={info.languages}>
                  {(it, i) => (
                    <LanguagePill
                      class="text-sm 2xl:text-xl min-w-10 flex"
                      language={it.field}
                    />
                  )}
                </For>
              )}
            </LabeledContent>

            <LabeledContent
              labelText={
                !info?.tools ? "Tool" : info.tools.length > 0 ? "Tools" : "Tool"
              }
              labelClass="text-sm 2xl:text-lg font-normal text-neutral"
              class="border-b-2 w-full space-y-1 pt-8 border-b-neutral-20 xl:border-transparent"
              labelPosition="above"
              wrapperClass="text-sm 2xl:text-xl flex min-h-16 gap-x-2 w-fit h-fit pb-8 flex-wrap"
            >
              {!info?.tools || info.tools.length === 0 ? (
                <ToolPill class="text-sm 2xl:text-xl" />
              ) : (
                <For each={info.tools}>
                  {(it) => (
                    <ToolPill
                      class="text-sm 2xl:text-xl min-w-10 flex"
                      tool={it.field}
                      version={it.version}
                    />
                  )}
                </For>
              )}
            </LabeledContent>

            <LabeledContent
              labelText={
                !info?.sdks ? "Sdk" : info.sdks.length > 0 ? "Sdks" : "Sdk"
              }
              labelClass="text-sm 2xl:text-lg font-normal text-neutral"
              class="border-b-neutral-20 font-normal border-b-2 w-full space-y-1 pt-8 overflow-x-hidden md:overflow-x-visible"
              labelPosition="above"
              wrapperClass="text-sm 2xl:text-xl flex min-h-16 gap-x-2 w-fit h-fit pb-8 flex-wrap"
            >
              {!info?.sdks || info.sdks.length === 0 ? (
                <SdkPill class="text-sm 2xl:text-xl" />
              ) : (
                <For each={info.sdks}>
                  {(it) => (
                    <SdkPill
                      class="text-sm 2xl:text-xl min-w-10 flex"
                      sdk={it.field}
                      version={it.field}
                    />
                  )}
                </For>
              )}
            </LabeledContent>
            <LabeledContent
              labelText={"Hash"}
              labelClass="text-sm 2xl:text-lg font-normal text-neutral"
              class={twMerge(
                "border-b-2 font-normal w-full space-y-1 pt-8",
                info?.unknowMetadata && info.unknowMetadata.length > 0
                  ? "border-b-neutral-20"
                  : "border-b-neutral-20 lg:border-transparent"
              )}
              labelPosition="above"
              wrapperClass="text-sm 2xl:text-xl flex min-h-16 gap-x-2 w-fit h-fit pb-7 flex-wrap"
            >
              <span class="flex">
                <a
                  href="#"
                  onClick={async () => {
                    await navigator.clipboard.writeText(info?.sha256 ?? "");
                  }}
                  class="mr-1.5 2xl:mr-2 hover:text-neutral-300"
                >
                  <FileIcon class="w-5 h-5 2xl:h-7 2xl:w-7" />
                </a>
                <Hash content={info?.sha256} />
              </span>
            </LabeledContent>

            {info?.unknowMetadata && info.unknowMetadata.length > 0 ? (
              <LabeledContent
                labelText={"Unknown Field"}
                labelClass="text-sm 2xl:text-lg font-normal text-neutral"
                class="font-normal w-full space-y-1 pt-8 border-t-neutral-20 border-t-2"
                labelPosition="above"
                wrapperClass="text-sm 2xl:text-xl flex min-h-16 gapx-x-2 w-fit h-fit pb-7 flex-wrap"
              >
                <For each={info.unknowMetadata}>
                  {(it, i) => (
                    <div class="text-neutral">
                      {it.field}{" "}
                      {it.metadata.field ? ` - ${it.metadata.version}` : null}
                    </div>
                  )}
                </For>
              </LabeledContent>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
