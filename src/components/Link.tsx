import "../styles/tailwind.css";
import type { JSXElement } from "solid-js";
import type { TClassList } from "./types";
import { twMerge } from "tailwind-merge";
import { A } from "@solidjs/router";

type roleType =
  | "link"
  | "button"
  | "cell"
  | "columnheader"
  | "heading"
  | "listitem"
  | "tab"
  | "menu"
  | "menubar"
  | "menuitem"
  | "navigation"
  | "none"
  | "option"
  | "rowheader";

export interface LinkProps {
  content?: JSXElement;
  children?: JSXElement;
  id?: string;
  name?: string;
  class?: string;
  classList?: TClassList;
  href?: string;
  ariaLabel?: string;
  "aria-label"?: string;
  ariaCurrent?: string | boolean;
  tabIndex?: number;
  onClick?: (value?: string) => void;
  role?: roleType;
  "data-testid"?: string;
  target?: "_blank" | "_self" | "_parent" | "_top" | "framename";
}

export function Link(props: LinkProps): JSXElement {
  const getClass = () => {
    return twMerge(
      "flex inline-flex items-center text-primary-350 cursor-pointer hover:text-primary-300 hover:underline hover:underline-offset-2",
      props.class ??
        "focus:ring-0 focus:ring-offset-0 no-outline border-0 caret-transparent focus:border-none p-0"
    );
  };

  const onClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  const getRole = (role?: roleType, href?: string): roleType | undefined => {
    if (role) {
      return role;
    }

    if (href) {
      return "link";
    }

    return undefined;
  };

  return (
    <A
      id={props.id}
      class={getClass()}
      classList={props.classList}
      href={props.href ?? "#"}
      aria-label={props.ariaLabel ?? props["aria-label"]}
      role={getRole(props.role, props.href)}
      tabIndex={props.tabIndex}
      onClick={onClick}
      target={props.target}
    >
      {props.children}
    </A>
  );
}
