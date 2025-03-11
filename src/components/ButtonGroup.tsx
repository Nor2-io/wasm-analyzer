import { For, JSXElement, createSignal } from "solid-js";

export interface ButtonGroupProps {
  items: Array<{ icon: JSXElement; onClick: () => void }>;
}

export function ButtonGroup(props: ButtonGroupProps) {
  const [active, setActive] = createSignal(0);

  return (
    <div class="flex justify-center items-center">
      <For each={props.items}>
        {(it, i) => (
          <button
            class="py-2 px-3 border-t border-b border-l border-neutral-100 text-neutral hover:bg-primary-250"
            classList={{
              "border-r rounded-r-lg": i() === props.items.length - 1,
              "rounded-l-lg": i() === 0,
              "bg-primary": i() === active(),
            }}
            onClick={() => {
              setActive(i());
              it.onClick();
            }}
          >
            {it.icon}
          </button>
        )}
      </For>
    </div>
  );
}
