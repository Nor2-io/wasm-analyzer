import type { TClassList } from "components/types";
import { JSXElement, createSignal, children, For } from "solid-js";
import { twMerge } from "tailwind-merge";
import TabHeader from "./TabHeader";
import { customHeaderTag } from "./Tab";
import TabPanel from "./TabPanel";

/**
 * Props:
 * @param   id
 * @returns Element ID, string - optional
 *
 * @param   children
 * @returns JSXElements. These should have titles, and preferably be TabComponents - required
 *
 * @param   aria-label
 * @returns Aria label text for accessibility, string - otional
 *
 * @param   class
 * @returns Set general styling of the box. example: class={"h-5 w-5"} - optional
 *
 * @param   classList
 * @returns Set classlist array for the box. - optional
 *
 * @param   contentClass
 * @returns Styling for the content container, string. - optional
 *
 * @param   headerClass
 * @returns Styling for the individual header tabs, string. - optional
 *
 * @param   navClass
 * @returns Styling for the nav field wrapping the header tabs, string. - optional
 *
 * @param   data-testid
 * @returns Set a custom data-testid for the box. - optional
 *
 * @param   current
 * @returns Currently selected tab identifier, number, 0-n. - optional
 *
 * @param   setCurrent
 * @returns Function for setting the current tab, in case parent component needs to keep track of it, (current: string | number) => void. - optional
 *
 */

let tabHeaders: JSXElement[];

export interface TabContainerProps {
  id?: string;
  children: JSXElement;
  "aria-label"?: string;
  class?: string;
  classList?: TClassList;
  tabPanelClass?: string;
  tabHeaderClass?: string;
  tabHeaderSelectedClass?: string;
  tabListClass?: string;
  "data-testid"?: string;
  current?: number | string;
  setCurrent?: (clicked: number | string) => void;
}

export const TabContainer = (props: TabContainerProps): JSXElement => {
  const [current, setCurrent] = createSignal(props.current ? props.current : 0);

  const getClass = (): string => {
    return twMerge("bg-neutral-10 w-full flex flex-col", props.class);
  };

  const getContentClass = (): string => {
    return twMerge("flex w-full", props.tabPanelClass ?? "");
  };

  const getHeaderClass = (): string => {
    return props.tabHeaderClass ?? "";
  };

  const getSelectedHeaderClass = (): string => {
    return props.tabHeaderSelectedClass ?? "";
  };

  const getNavClass = (): string => {
    return twMerge(
      "-mb-px flex h-fit w-fit space-x-8 border-b border-neutral-100",
      props.tabListClass
    );
  };

  const onClick = (clicked: number | string) => {
    setCurrent(clicked);

    if (props.setCurrent) {
      props.setCurrent(clicked);
    }
  };

  const getTabHeaders = (): JSXElement[] => {
    if (!tabHeaders || tabHeaders.length < 1) {
      tabHeaders = [];

      const childContent = props.children
        ? (children(() => props.children)() as HTMLElement[]).filter((x) => x)
        : undefined;

      if (childContent) {
        for (let i = 0; i < (childContent as HTMLElement[]).length; i++) {
          if ((childContent[i] as HTMLElement).id === customHeaderTag) {
            tabHeaders.push(childContent[i].children[0] as HTMLElement);
            i++; // customHeaders always come before the regular header in the incoming list of children, if the children are Tab components. So if the customHeader exists, we skip the following header.
          } else {
            tabHeaders.push(childContent[i].title);
          }
        }
      }
    }

    return tabHeaders;
  };

  return (
    <div
      id={props.id}
      class={getClass()}
      classList={props.classList}
      data-testid={
        props["data-testid"] ? props["data-testid"] : "test-tabcontainer"
      }
      aria-label={props["aria-label"]}
    >
      <nav class={getNavClass()} aria-label="tabs" role="tablist">
        <For each={getTabHeaders()}>
          {(tabHeader, i) => {
            return (
              <TabHeader
                setCurrent={onClick}
                current={current()}
                key={i()}
                class={getHeaderClass()}
                selectedClass={getSelectedHeaderClass()}
              >
                {tabHeader}
              </TabHeader>
            );
          }}
        </For>
      </nav>
      <For each={props.children as JSXElement[]}>
        {(child, i) => {
          return (
            <TabPanel current={current()} key={i()} class={getContentClass()}>
              {child}
            </TabPanel>
          );
        }}
      </For>
    </div>
  );
};

export default TabContainer;
