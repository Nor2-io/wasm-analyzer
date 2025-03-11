import { Link } from "../../Link";
import type { TClassList } from "components/types";
import type { JSXElement } from "solid-js";
import { twMerge } from "tailwind-merge";

/**
 * Props:
 * @param   id
 * @returns Element ID, string - optional
 *
 * @param   children
 * @returns JSXElements or strings representing child elements - required
 *
 * @param   aria-label
 * @returns Aria label text for accessibility, string - optional
 *
 * @param   class
 * @returns Set general styling of the box, string. example: class={"h-5 w-5"} - optional
 *
 * @param   classList
 * @returns Set classlist array for the box. - optional
 *
 * @param   data-testid
 * @returns Set a custom data-testid for the box, string. - optional
 *
 * @param   setCurrent
 * @returns Function for tab onClick, for setting current active tab, (current: string | number) => void. - required
 *
 * @param   current
 * @returns Identifier for the currently active tab, used for matching with this tab's key, string | number. - required
 *
 * @param   key
 * @returns Identifying key for this tab, used for matching with current prop, string | number. - required
 *
 */

export interface TabHeaderProps {
  id?: string;
  children: JSXElement;
  "aria-label"?: string;
  class?: string;
  classList?: TClassList;
  selectedClass?: string;
  "data-testid"?: string;
  setCurrent: (current: string | number) => void;
  current: string | number;
  key: string | number;
}

export const TabHeader = (props: TabHeaderProps): JSXElement => {
  const getClass = (selected: string | number): string => {
    if (selected === props.key) {
      return twMerge(
        "group inline-flex items-center border-b-2 border-primary-200 px-1 py-4 font-medium text-primary-200 text-[length:0.875rem] caret-transparent cursor",
        props.selectedClass
      );
    }

    return twMerge(
      "group inline-flex items-center border-b-2 border-transparent px-1 py-4 font-medium hover:border-neutral-200 text-neutral-350 text-[length:0.875rem] caret-transparent",
      props.class
    );
  };

  const setCurrent = (selected: string | number) => {
    props.setCurrent(selected);
  };

  return (
    <Link
      onClick={() => {
        setCurrent(props.key);
      }}
      class={getClass(props.current)}
      data-testid={
        props["data-testid"] ? props["data-testid"] : "test-tabHeader"
      }
      role="tab"
    >
      {props.children}
    </Link>
  );
};

export default TabHeader;
