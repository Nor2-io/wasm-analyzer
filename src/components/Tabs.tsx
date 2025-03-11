import { setCurrent } from "../State";

export interface TabsProps {
  active: boolean;
  selected: string | null;
  containsEnv: boolean;
}

export function Tabs(props: TabsProps) {
  return (
    <>
      {props.active ? (
        <div class="bg-neutral-10 w-full px-10">
          <div class="block">
            <div class="border-b border-gray-200">
              <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                <a
                  href="#"
                  onClick={() => {
                    setCurrent("Imports");
                  }}
                  class={
                    props.selected === "Imports"
                      ? "border-indigo-500 text-indigo-600 group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium"
                  }
                >
                  <span>Imports</span>
                </a>
                <a
                  href="#"
                  onClick={() => {
                    setCurrent("Exports");
                  }}
                  class={
                    props.selected === "Exports"
                      ? "border-indigo-500 text-indigo-600 group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium"
                  }
                >
                  <span>Exports</span>
                </a>
                <a
                  href="#"
                  onClick={() => {
                    setCurrent("Custom Sections");
                  }}
                  class={
                    props.selected === "Custom Sections"
                      ? "border-indigo-500 text-indigo-600 group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium"
                  }
                  aria-current="page"
                >
                  <span>Custom Sections</span>
                </a>
                {props.containsEnv ? (
                  <a
                    href="#"
                    onClick={() => {
                      setCurrent("Env");
                    }}
                    class={
                      props.selected === "Env"
                        ? "border-indigo-500 text-indigo-600 group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium"
                    }
                    aria-current="page"
                  >
                    <span>Environment Variables</span>
                  </a>
                ) : null}
              </nav>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
