import "../styles/tailwind.css";
import { Accessor, JSXElement, createMemo, createSignal } from "solid-js";
import {
  TClassList,
  TInput,
  GetInputType,
  GetIdByType,
  InputTypes,
} from "./types";
import type { SSingleValueSchema } from "./defaultSchemas";
// import { z } from "zod";
import { twMerge } from "tailwind-merge";

//todo: look into passing in validation functions, so we can use form validation rather than on component level.
export interface TextBoxProps {
  default?: string;
  initialValue?: string;
  id?: string;
  name?: string;
  ariaLabel?: string;
  autocomplete?: string;
  class?: string;
  errorClass?: string;
  classList?: TClassList;
  disabled?: boolean;
  type?: TInput;
  setValueOnInput?: (value: string) => void;
  setValueOnFocus?: (value: string) => void;
  setValueOnFocusOut?: (value: string) => void;
  validate?: boolean;
  validationSchema?: SSingleValueSchema;
  clearValue?: () => void;
  tabIndex?: number;
}

export const TextBox = (props: TextBoxProps): JSXElement => {
  const getDefault = (): string => {
    return "" + props.default;
  };

  const [text, setText] = createSignal(
    props.initialValue ? props.initialValue : getDefault(),
  );

  const setTextWithDefault = (value: string): void => {
    setText(value === "" ? getDefault() : value);
  };

  const getCleanText = (value: string): string => {
    return value === getDefault() ? "" : value;
  };

  // const getClass = (validated: boolean) => {
  //   let classes =
  //     "no-outline flex h-10 w-12 items-center justify-center rounded-md border shadow-neutral-50 bg-neutral-10 pl-3 pr-1 font-sans text-base leading-10 text-neutral shadow-sm focus-within:ring-1 focus-within:border-primary-300 focus-within:ring-primary-300 hover:border-primary-300";
  //   const defaultColors = "bg-neutral-10 text-neutral";
  //   const errorColors = "bg-warning text-maintext ";

  //   classes = validated
  //     ? classes + defaultColors + (props.class ?? "")
  //     : classes + errorColors + (props.errorClass ?? "");

  //   return twMerge(classes, props.class ?? "");
  // };
  
  const getClass = () => {
    let classes =
      "no-outline flex h-10 w-12 items-center justify-center rounded-md border shadow-neutral-50 bg-neutral-10 pl-3 pr-1 font-sans text-base leading-10 text-neutral shadow-sm focus-within:ring-1 focus-within:border-primary-300 focus-within:ring-primary-300 hover:border-primary-300";
    const defaultColors = "bg-neutral-10 text-neutral";

    return twMerge(classes, defaultColors, (props.class ?? ""));
  };

  // const [style, setStyle] = createSignal(getClass(true));
  
  const [style, setStyle] = createSignal(getClass());

  const setDefaultClass = (): void => {
    setStyle(getClass());
  };
  
  // const setDefaultClass = (): void => {
  //   setStyle(getClass(true));
  // };

  // const setErrorClass = (): void => {
  //   setStyle(getClass(false));
  // };

  // const validateText = (value: string): void => {
  //   if (validate && validate()) {
  //     try {
  //       if (props.validationSchema) {
  //         props.validationSchema.parse(value);
  //       }

  //       if (props.setValueOnFocusOut) {
  //         props.setValueOnFocusOut(getCleanText(value));
  //       }

  //       if (text() === getDefault()) {
  //         setErrorClass();
  //       }
  //     } catch (error) {
  //       if (error instanceof z.ZodError) {
  //         setErrorClass();
  //       }
  //     }
  //   }
  // };

  // const validateTextOnSubmit = (doValidate?: boolean): void => {
  //   if (doValidate) {
  //     validateText(getCleanText(text()));
  //   }
  // };

  // const validate: Accessor<boolean | undefined> = createMemo(() => {
  //   validateTextOnSubmit(props.validate);
  //   return props.validate;
  // });

  const getId = (): string => {
    return GetIdByType("textbox", props.id, props.type);
  };

  const getType = (): string => {
    return GetInputType(InputTypes.text, props.type);
  };

  const toggleTextIn = (value: string): void => {
    if (value === getDefault()) {
      setText("");

      if (props.setValueOnFocus) {
        props.setValueOnFocus("");
      }

      if (props.clearValue) {
        props.clearValue();
      }
    } else {
      setText(value);
      if (props.setValueOnFocus) {
        props.setValueOnFocus(getCleanText(value));
      }
    }

    setDefaultClass();
  };

  const toggleTextOut = (value: string): void => {
    setTextWithDefault(value);

    if (props.setValueOnFocusOut) {
      props.setValueOnFocusOut(getCleanText(value));
    }
  };

  const onTextInput = (value: string): void => {
    if (props.setValueOnInput) {
      props.setValueOnInput(getCleanText(value));
    }
  };

  return (
    <input
      type={getType()}
      id={getId()}
      name={props.name}
      autocomplete={props.autocomplete}
      class={style()}
      classList={props.classList}
      value={text()}
      onClick={(e) => toggleTextIn((e.target as HTMLInputElement).value)}
      onInput={(e) => onTextInput((e.target as HTMLInputElement).value)}
      onFocusOut={(e) => toggleTextOut((e.target as HTMLInputElement).value)}
      onChange={(e) => toggleTextOut((e.target as HTMLInputElement).value)}
      onBlur={(e) => toggleTextOut((e.target as HTMLInputElement).value)}
      disabled={props.disabled}
      aria-label={props.ariaLabel}
      tabIndex={props.tabIndex}
    />
  );
};

export default TextBox;
