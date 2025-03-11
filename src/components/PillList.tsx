import { For, type JSXElement } from "solid-js";
import type { TClassList, TPillData } from "./types";
import Pill from "./Pill";

type TPillColors = {
  text: string;
  background: string;
};

const colors: TPillColors[] = [
  {
    text: "text-pill-1",
    background: "bg-pill-2",
  },
  {
    text: "text-pill-2",
    background: "bg-pill-1",
  },
  {
    text: "text-pill-9",
    background: "bg-pill-4",
  },
  {
    text: "text-pill-4",
    background: "bg-pill-9",
  },
  {
    text: "text-pill-5",
    background: "bg-pill-7",
  },
  {
    text: "text-pill-7",
    background: "bg-pill-5",
  },
  {
    text: "text-pill-7",
    background: "bg-pill-8",
  },
  {
    text: "text-pill-8",
    background: "bg-pill-7",
  },
  {
    text: "text-pill-6",
    background: "bg-neutral",
  },
  {
    text: "text-neutral",
    background: "bg-pill-6",
  },
  {
    text: "text-pill-9",
    background: "bg-pill-3",
  },
  {
    text: "text-pill-3",
    background: "bg-pill-9",
  },
];

const colorMap: { [key: string]: TPillColors } = {
  wasm: {
    text: "text-pill-1",
    background: "bg-pill-2",
  },
  wasi: {
    text: "text-pill-2",
    background: "bg-pill-1",
  },
  "component-model": {
    text: "text-pill-9",
    background: "bg-pill-4",
  },
};

export interface PillListProps {
  id?: string;
  "aria-label"?: string;
  class?: string;
  classList?: TClassList;
  pillClass?: string;
  items?: TPillData[];
  "data-testid"?: string;
}

export const PillList = (props: PillListProps): JSXElement => {
  let lastColors = { text: "", background: "" };

  const getColors = (key: string): TPillColors => {
    const c = colorMap[key];

    if (c) {
      return c;
    }

    let randomNumber = Math.floor(Math.random() * colors.length);

    if (randomNumber < 0) {
      randomNumber = 0;
      0;
    }

    if (randomNumber > colors.length - 1) {
      randomNumber = colors.length - 1;
    }

    let selectedColors = colors[randomNumber];

    if (selectedColors.background === lastColors.background) {
      if (randomNumber === colors.length - 1) {
        selectedColors = colors[randomNumber - 1];
      }

      if (randomNumber === 0) {
        selectedColors = colors[1];
      }

      if (randomNumber > 0 && randomNumber < colors.length - 1) {
        const up = Math.random() < 0.5;

        selectedColors = up
          ? colors[randomNumber + 1]
          : colors[randomNumber - 1];
      }
    }

    lastColors = selectedColors;

    return { ...selectedColors };
  };

  return (
    <div class="flex space-x-2 ">
      <For each={props.items}>
        {(item) => {
          const colors = getColors(item.label);
          return (
            <Pill
              class={props.pillClass}
              textColor={colors.text}
              backgroundColor={colors.background}
              id={item.key}
            >
              {item.label}
            </Pill>
          );
        }}
      </For>
    </div>
  );
};

export default PillList;
