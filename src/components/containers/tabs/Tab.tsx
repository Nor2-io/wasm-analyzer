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
 * @returns Set general styling of the box. example: class={"h-5 w-5"} - optional
 *
 * @param   classList
 * @returns Set classlist array for the box. - optional
 *
 * @param   data-testid
 * @returns Set a custom data-testid for the box. - optional
 *
 * @param   title
 * @returns This title is used for the automatically generated TabHeader, string. - required
 *
 * @param   customHeader
 * @returns Alternative TabHeader this prop takes any JSXElement, but component states/signals for components you've passed into this prop don't work, JSXElement. - required
 *
 */

// Workaround for limitations with JS. This tag is set on every custom header.
export const customHeaderTag =
  "011010000110010101100001011001000110010101110010";

export interface TabProps {
  id?: string;
  children: JSXElement;
  "aria-label"?: string;
  class?: string;
  classList?: TClassList;
  "data-testid"?: string;
  title: string;
  customHeader?: JSXElement;
}

export const Tab = (props: TabProps): JSXElement => {
  const getClass = (): string => {
    return twMerge(props.class, "");
  };

  // If a customHeader exists, we'll stick it in the returning JSX-element here, and then copy it up to the header section through a parent component.
  return (
    <>
      {props.customHeader ? (
        <div id={customHeaderTag} class={"h-0 w-0 opacity-0"}>
          {props.customHeader}
        </div>
      ) : undefined}
      <div
        id={props.id}
        class={getClass()}
        classList={props.classList}
        data-testid={props["data-testid"] ? props["data-testid"] : "test-tab"}
        aria-label={props["aria-label"]}
        title={props.title}
      >
        {props.children}
      </div>
    </>
  );
};

export default Tab;
