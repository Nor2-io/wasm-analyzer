import "../styles/tailwind.css";
import { twMerge } from "tailwind-merge";
import { ToolTip } from "./ToolTip";
import { InputTypes, TClassList } from "./types";
import { Accessor, createMemo, createSignal, type JSXElement } from "solid-js";
// import type { SSingleValueSchema } from "./defaultSchemas";
// import { z } from "zod";

export interface SearchBarProps {
  default?: string;
  initialValue?: string;
  id?: string;
  name?: string;
  ariaLabel?: string;
  autocomplete?: string;
  class?: string;
  errorClass?: string;
  classList?: TClassList;
  setValueOnInput?: (value: string) => void;
  setValueOnFocus?: (value: string) => void;
  setValueOnFocusOut?: (value: string) => void;
  validate?: boolean;
  // validationSchema?: SSingleValueSchema;
  clearValue?: () => void;
  tabIndex?: number;
  infoToolTip?: JSXElement;
}

const boxStyle = " flex-grow no-outline bg-transparent bottom-0";
const textBoxStyle = " opacity-80 caret-neutral-350";

export const SearchBar = (props: SearchBarProps): JSXElement => {
  const getDefault = (): string => {
    return props.default ? props.default : "";
  };

  const [inputValue, setInputValue] = createSignal(
    props.initialValue ? props.initialValue : getDefault()
  );

  const setValueWithDefault = (value: string): void => {
    setInputValue(value.trim() === "" ? getDefault() : value);
  };

  const getCleanValue = (value: string): string => {
    if (value === getDefault()) {
      return "";
    }

    return value;
  };

  const getClass = (validated: boolean) => {
    let classes =
      "no-outline flex h-10 w-12 items-center justify-center rounded-md border shadow-neutral-50 bg-neutral-10 pl-3 pr-1 font-sans text-base leading-10 text-neutral shadow-sm focus-within:ring-1";
    const defaultColors =
      "focus-within:border-primary-300 focus-within:ring-primary-300 hover:border-primary-300";
    const errorColors =
      "focus-within:border-destructive-200 focus-within:ring-destructive-100";

    classes = validated
      ? twMerge(classes, defaultColors, props.class ?? "")
      : twMerge(classes, errorColors, props.errorClass ?? "");

    return twMerge(classes, props.class ?? "");
  };

  const [textStyle, setTextStyle] = createSignal(
    twMerge(boxStyle, textBoxStyle)
  );

  const [style, setStyle] = createSignal(getClass(true));

  const setDefaultClass = (): void => {
    setStyle(getClass(true));
  };

  // const setErrorClass = (): void => {
  //   setStyle(getClass(false));
  // };

  // const validateInput = (value: string): void => {
  //   if (validate && validate()) {
  //     try {
  //       if (props.validationSchema) {
  //         props.validationSchema.parse(value);
  //       }

  //       if (props.setValueOnFocusOut) {
  //         props.setValueOnFocusOut(getCleanValue(value));
  //       }

  //       if (inputValue() === getDefault()) {
  //         setErrorClass();
  //       }
  //     } catch (error) {
  //       if (error instanceof z.ZodError) {
  //         setErrorClass();
  //       }
  //     }
  //   }
  // };

  // const validateInputOnSubmit = (doValidate?: boolean): void => {
  //   if (doValidate) {
  //     validateInput(getCleanValue(inputValue()));
  //   }
  // };

  // const validate: Accessor<boolean | undefined> = createMemo(() => {
  //   validateInputOnSubmit(props.validate);
  //   return props.validate;
  // });

  const toggleTextIn = (value: string): void => {
    setTextStyle(twMerge(boxStyle, "opacity-100"));

    if (props.id) {
      const numberBox = document.getElementById(props.id) as HTMLInputElement;
      numberBox.focus();
    }

    if (value === getDefault() || value === props.initialValue) {
      setInputValue("");
    } else {
      setInputValue(value);
      if (props.setValueOnFocus) {
        props.setValueOnFocus(getCleanValue(value));
      }
    }

    setDefaultClass();
  };

  const toggleTextOut = (value: string): void => {
    setValueWithDefault(value);

    if (
      value.trim() === "" ||
      value === getDefault() ||
      value === props.initialValue
    ) {
      setTextStyle(twMerge(boxStyle, textBoxStyle));
    }

    if (props.setValueOnFocusOut) {
      props.setValueOnFocusOut(getCleanValue(value));
    }
  };

  const onTextInput = (value: string): void => {
    if (props.setValueOnInput) {
      props.setValueOnInput(getCleanValue(value));
    }
  };

  return (
    <div class={style()} data-testid="searchbar-wrapper">
      <div class="mr-2 w-fit caret-transparent">
        <ToolTip
          content={props.infoToolTip}
          contentClass="w-fit break-keep bottom-8 -left-5"
          arrow={true}
          arrowPosition="middle"
          position="above"
        >
          <svg
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 fill-none"
          >
            <path
              d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z"
              stroke-linecap="round"
              stroke-linejoin="round"
              class={"stroke-neutral-200 stroke-[0.104rem]"}
            />
          </svg>
        </ToolTip>
      </div>
      <input
        type={InputTypes.text.type}
        id={props.id}
        name={props.name}
        autocomplete={props.autocomplete}
        role="search"
        class={twMerge(
          textStyle(),
          inputValue() === props.initialValue ? "text-neutral-200" : "",
          "border-transparent focus:border-transparent focus:ring-0 focus:ring-transparent"
        )}
        classList={props.classList}
        value={inputValue()}
        onClick={(e) => toggleTextIn((e.target as HTMLInputElement).value)}
        onInput={(e) => onTextInput((e.target as HTMLInputElement).value)}
        onFocusOut={(e) => toggleTextOut((e.target as HTMLInputElement).value)}
        onChange={(e) => toggleTextOut((e.target as HTMLInputElement).value)}
        onBlur={(e) => toggleTextOut((e.target as HTMLInputElement).value)}
        aria-label={props.ariaLabel}
        tabIndex={props.tabIndex}
        data-testid="searchbar-input"
      />
    </div>
  );
};

export default SearchBar;
