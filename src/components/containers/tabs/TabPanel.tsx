import type { JSXElement } from "solid-js";
import { twMerge } from "tailwind-merge";

export interface TabPanelProps {
  class?: string;
  children: JSXElement;
  current: string | number;
  key: string | number;
  "data-testid"?: string;
}

/**
 * Props:
 * @param   class
 * @returns Set general styling of the box. example: class={"h-5 w-5"} - optional
 *
 * @param   children
 * @returns JSXElement - required
 *
 * @param   current
 * @returns Currently selected tab identifier, number | string, 0-n. - optional
 *
 * @param   key
 * @returns Identifying key for this tab, used for matching with current prop, string | number. - required
 *
 */

export const TabPanel = (props: TabPanelProps): JSXElement => {
  const getClass = (selected: string | number): string => {
    if (selected === props.key) {
      return twMerge("pt-10", props.class);
    }

    return "opacity-0 h-0 w-0"; // This is the default state for a TabComponent that isn't selected.
  };

  return (
    <div
      class={getClass(props.current)}
      data-testid={
        props["data-testid"] ? props["data-testid"] : "test-tabPanel"
      }
      role="tabpanel"
    >
      {props.children}
    </div>
  );
};

export default TabPanel;
