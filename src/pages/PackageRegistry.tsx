//import { createSignal } from "solid-js";
//import { setActiveWasm } from "../Util";
//import SearchResultItem from "../components/SearchResultItem";
//import { loading, setLoading } from "../State";
//import List, { IListItemContent } from "../components/List";
//import { TPillData } from "../components/types";
//import { ComponentInfo, Package, CustomSection } from "wasm-analyzer";
//import { LoadingPage } from "./Loading";
//import LabeledContent from "../components/LabeledContent";
//import TextBox from "../components/TextBox";
//import * as wasm from "wasm-analyzer";
//import PageHeader from "../components/PageHeader";
//
//export interface PackageRegistryProps {
//  class?: string;
//  customSections?: Array<CustomSection>;
//  translationFunction?: (value: string) => string;
//}
//
//export function PackageRegistry(props: PackageRegistryProps) {
//  const [repositoryAddress, setRepositoryAddress] = createSignal<string>(
//    "https://preview-registry.bytecodealliance.org"
//  );
//  const [packages, setPackages] = createSignal<
//    Array<[string, Package, ComponentInfo?]>
//  >([]);
//
//  //invoke("get_wasms", {}).then((packages) => {
//  //  setPackages(packages as Array<[string, Package, ComponentInfo?]>);
//  //});
//
//  setLoading(true);
//  wasm.get_packages(repositoryAddress()).then((packages) => {
//    setPackages(packages.packages);
//    setLoading(false);
//  });
//
//  const getFormattedResults = (
//    packages: Array<[string, Package, ComponentInfo?]>
//  ): IListItemContent[] => {
//    const formattedResults: IListItemContent[] = [];
//
//    if (packages) {
//      for (let i = 0; i < packages.length; i++) {
//        const headerClick = () => {
//          const name = packages[i][0];
//          const registryInfo = packages[i][1];
//          const info = packages[i][2];
//
//          if (info) {
//            setActiveWasm(name, info, registryInfo);
//          }
//        };
//
//        const info = packages[i][1];
//        const pack = packages[i][2];
//
//        if (pack) {
//          let homepage = pack.data.registry_metadata?.links?.find((value) => {
//            if (value.ty.kind === "Homepage") {
//              return value;
//            }
//          });
//
//          let docs = pack.data.registry_metadata?.links?.find((value) => {
//            if (value.ty.kind === "Documentation") {
//              return value;
//            }
//          });
//
//          let repo = pack.data.registry_metadata?.links?.find((value) => {
//            if (value.ty.kind === "Repository") {
//              return value;
//            }
//          });
//
//          const release = info.releases[info.releases.length - 1];
//
//          const item = (
//            <SearchResultItem
//              header={packages[i][0]}
//              headerOnClick={headerClick}
//              href="/metadata"
//              version={release.version}
//              componentType={pack?.kind}
//              description={pack.data.registry_metadata?.description ?? ""}
//              homepageUrl={homepage?.value}
//              documentationUrl={docs?.value}
//              repositoryUrl={repo?.value}
//              categories={pack.data.registry_metadata?.categories?.map(
//                (value, i): TPillData => {
//                  return { key: i.toString(), label: value };
//                }
//              )}
//              // x1000 to convert from seconds to milliseconds
//              latestRelease={new Date(Number(release.timestamp) * 1000)}
//              size={pack.data.human_size}
//              //TODO: Fix authors data format.
//              authors={pack.data.registry_metadata?.authors?.toString()}
//              license={pack.data.registry_metadata?.license ?? "Unlicensed"}
//              locale={"en-US"}
//              translationFunction={translate}
//              target="_blank"
//              releases={info.releases.length}
//            />
//          );
//
//          formattedResults.push({
//            id: packages[i][0],
//            columnValues: [{ id: packages[i][0], value: item, key: i }],
//          });
//        }
//      }
//    }
//
//    return formattedResults;
//  };
//
//  const translate = (value: string): string => {
//    if (props.translationFunction) {
//      return props.translationFunction(value);
//    }
//
//    return value;
//  };
//
//  const setRepository = (address: string): void => {
//    setRepositoryAddress(address);
//
//    wasm.get_packages(repositoryAddress()).then((packages) => {
//      setPackages(packages.packages);
//    });
//  };
//
//  return (
//    <div class="flex lg:justify-center w-full">
//      <div class="flex flex-col w-full h-full py-6">
//        <div class="flex flex-col w-full">
//          <PageHeader
//            id="package-registry-heading-section"
//            heading="Package Registry"
//            headingControls={
//              <div class="flex w-full">
//                <LabeledContent
//                  labelText="Repository URL: "
//                  labelPosition="before"
//                  wrapperClass="flex-grow sm:flex-grow-0 w-full"
//                  class="w-full"
//                  labelClass="w-0 invisible md:visible flex sm:flex-grow md:w-32 h-full pt-2.5"
//                >
//                  <div class="inline-block w-full">
//                    <TextBox
//                      setValueOnFocusOut={setRepository}
//                      class="w-full flex-grow text-sm"
//                      initialValue="https://preview-registry.bytecodealliance.org"
//                      default="https://"
//                    />
//                  </div>
//                </LabeledContent>
//              </div>
//            }
//            class="max-w-280 pb-8"
//          >
//            <p>
//              {
//                "The WASM Analyzer Package Registry page. Click on the header of an entry in the list below to enter a detailed view for that package. Or, you can enter a valid URL for another repository to fetch a list of packages in that repository."
//              }
//              <br />
//              <br />
//              {
//                "If you need additional information about the WASM Analyzer's capabilities, have a look at our "
//              }
//              <a
//                href="https://docs.wa2.dev/"
//                class="text-primary-350 hover:text-primary-300 underline underline-offset-2"
//              >
//                documentation
//              </a>
//              {"."}
//            </p>
//          </PageHeader>
//        </div>
//        {loading() && <LoadingPage message="Building registry index..." />}
//
//        {!loading() && (
//          <List
//            id="packages"
//            items={/*@once*/ getFormattedResults(packages())}
//            type={"list"}
//            class={"min-w-80"}
//            itemContainerClass="max-w-100 md:max-w-full"
//          />
//        )}
//      </div>
//    </div>
//  );
//}
