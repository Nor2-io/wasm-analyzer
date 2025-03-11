import "../styles/tailwind.css";
import { children, JSXElement } from "solid-js";
import {
  GetButtonType,
  GetIdByType,
  InputTypes,
  TButton,
  TClassList,
  TInput,
} from "./types";
import { twMerge } from "tailwind-merge";

export interface ButtonProps {
  class?: string;
  disabledClass?: string;
  classList?: TClassList;
  onClick?: () => void;
  children?: JSXElement;
  id?: string;
  name?: string;
  ariaLabel?: string;
  tabIndex?: number;
  type?: TInput;
  disabled?: boolean;
  formmethod?: "dialog" | undefined;
  title?: string;
  "data-testid"?: string;
}

export const Button = (props: ButtonProps): JSXElement => {
  const getChildren = children(() => props.children);

  const getClass = () => {
    const defaultClasses =
      "border-transparent px-4 w-32 py-2 h-10 font-medium shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 border ";

    const lockedPositioning =
      " relative inline-flex items-center justify-center caret-transparent";

    if (props.disabled) {
      return twMerge(
        defaultClasses,
        "bg-headertext text-brand hover:bg-maintext focus:ring-bg-maintext focus:ring-offset-bg-maintext ",
        props.disabledClass ?? "",
        lockedPositioning,
      );
    }

    return twMerge(
      defaultClasses +
        "bg-buttons text-headertext hover:bg-brand-dark focus:ring-brand-light focus:ring-offset-maintext ",
      props.class ?? "",
      lockedPositioning,
    );
  };

  const getId = (): string => {
    return GetIdByType("button", props.id, props.type);
  };

  const getName = (): string => {
    return props.name ?? "button";
  };

  const getType = (): TButton => {
    return GetButtonType(InputTypes.submit.type as TButton);
  };

  const onClick = (): void => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <button
      id={getId()}
      name={getName()}
      aria-label={props.ariaLabel ?? ""}
      type={getType()}
      class={getClass()}
      classList={props.classList}
      onClick={onClick}
      tabIndex={props.tabIndex}
      disabled={props.disabled}
      formMethod={props.formmethod}
      title={props.title}
      data-testid={props["data-testid"]}
    >
      {getChildren()}
    </button>
  );
};

export default Button;
