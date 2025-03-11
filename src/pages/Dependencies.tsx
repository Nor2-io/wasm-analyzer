import { ButtonGroup } from "../components/ButtonGroup";
import PageHeader from "../components/PageHeader";
import { ListViewIcon, TreeViewIcon } from "../components/icons/Icons";

export interface DependenciesProps {}

export function DependenciesPage(props: DependenciesProps) {
  return (
    <div class="flex justify-items-center place-content-between place-items-center py-6 px-8">
      <PageHeader
        id="dependencies-heading-section"
        heading="Dependencies"
        class="w-full max-w-280"
      >
        <p class="text-neutral pb-6">
          {"This is a summary of the Dependencies required by your selected file."}
          <br/><br/>             
          {"If you need additional information about the WASM Analyzer's capabilities, have a look at our "}
          <a
            href="https://docs.wa2.dev/"
            class="text-primary-350 hover:text-primary-300 underline underline-offset-2"
          >
            documentation
          </a>   
          {"."}
        </p>
      </PageHeader>
      <ButtonGroup
        items={[
          { icon: <ListViewIcon class="w-5 h-5" />, onClick: () => {} },
          { icon: <TreeViewIcon class="w-5 h-5" />, onClick: () => {} },
        ]}
      />
    </div>
  );
}
