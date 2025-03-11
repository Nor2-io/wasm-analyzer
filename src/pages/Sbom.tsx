export interface SbomProps {}

export function SbomPage(props: SbomProps) {
  return (
    <div class="py-6 px-8">
      <div class="flex justify-items-center place-content-between py-6 px-8 place-items-center">
        <div class="flex place-items-center justify-items-center gap-4 place-self-end pb-2.5">
          <h1 class="text-2xl font-semibold text-neutral">
            Software Bill of Materials (SBOM)
          </h1>
        </div>
        <div class="w-full">
          <div class="flex w-full md:max-w-224 lg:max-w-256">
            <p class="text-neutral pb-6">
              {
                "Generate a Software Bill of Materials file for your selected webassembly file, below."
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
          </div>
        </div>

        <div class="flex flex-col gap-1 w-96">
          <label for="format" class="text-neutral text-sm">
            SBOM format
          </label>
          <div class="flex gap-6">
            <select
              id="format"
              class="block w-full rounded-md bg-neutral-500 border border-neutral-100 text-neutral-360 p-2.5 appearance-none focus:ring-primary-300 focus:border-primary-300"
            >
              <option selected>Select SBOM Format</option>
              <option value="spdx">SPDX</option>
              <option value="spdx-json">SPDX JSON</option>
              <option value="spdx-xml">SPDX XML</option>
              <option value="cyclonedx">CycloneDX</option>
              <option value="csv">CSV</option>
              <option value="txt">Text</option>
            </select>
            <button
              class="bg-primary py-2 px-8 rounded-lg text-neutral hover:bg-primary-250"
              onClick={() => {
                /*TODO: Add Export Functionality */
              }}
            >
              Export
            </button>
          </div>
        </div>
      </div>
      <div class="h-screen w-full flex pl-8">
        <div
          id="sbom-preview"
          class="w-full h-full rounded-tl-xl overflow-clip border-t border-l border-neutral-30"
        >
          {/*TODO: Add Preview */}
        </div>
      </div>
    </div>
  );
}
