import { For } from "solid-js";
//import { env } from "../State";
import PageHeader from "../components/PageHeader";

export interface EnvProps {}

export function EnvPage(props: EnvProps) {
  return (
    <div class="flex flex-col items-center">
      <PageHeader
        id="environmentvariables-heading-section"
        heading="Environment Variables"
        class="w-full max-w-280"
      >
        <p class="text-neutral pb-6">
          {
            "This is a summary of the Environmental variables of your selected file."
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
      <table class="mt-6 w-full whitespace-nowrap text-left">
        <colgroup>
          <col class="w-4/12" />
          <col class="w-8/12" />
        </colgroup>
        <thead class="border-b border-white/10 text-sm leading-6 text-white">
          <tr>
            <th
              scope="col"
              class="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8"
            >
              Name
            </th>
            <th
              scope="col"
              class="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell"
            >
              Value
            </th>
          </tr>
        </thead>
        {/*<tbody class="divide-y divide-white/5">
          <For each={env()}>
            {(it, i) => (
              <tr>
                <td class="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                  <div class="flex items-center gap-x-4">
                    <div class="truncate text-sm font-medium leading-6 text-white">
                      {it.name}
                    </div>
                  </div>
                </td>
                <td class="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                  <div class="flex gap-x-3">
                    <div class="font-mono text-sm leading-6 text-gray-400">
                      {it.value}
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </For>
        </tbody>*/}
      </table>
    </div>
  );
}
