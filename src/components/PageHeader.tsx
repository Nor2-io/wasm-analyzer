import { Accessor, JSXElement, Show, createMemo, createSignal } from "solid-js";
import { TClassList } from "./types";
import { twMerge } from "tailwind-merge";

export interface PageHeaderProps {
    id?: string;
    class?: string;
    classList?: TClassList;
    "aria-label"?: string;
    heading?: string,
    headingClass?: string;
    headingContainerClass?: string;
    headingControls?: JSXElement;
    children: string | number | JSXElement;
    contentClass?: string;
    translationFunction?: (value: string) => string;
    showPageDescription?: boolean;
}

const slideDownClass = "items-center transition-all ease-out duration-700";

export const PageHeader = (props: PageHeaderProps): JSXElement => {

    const [showDescription, setShowDescription] = createSignal<boolean>(props.showPageDescription ?? false);

    const getClass = (styling?: string): string => {
        return twMerge("md:mb-3", styling);
    }
    
    const getHeadingClass = (styling?: string): string => {
        return twMerge("text-xl md:text-2xl font-semibold place-self-start text-neutral", styling ?? "");
    }

    const getHeadingContainerClass = (styling?: string): string => {
        return twMerge("flex w-fit h-fit flex-grow", styling ?? "");
    }

    const getContentClass = (show: boolean, styling?: string): string => {
        return twMerge("flex text-neutral overflow-hidden transition-all ease-in-out duration-500", !show ? "pb-0 opacity-0 max-h-0 H-0 " : "pt-6 md:pt-8 opacity-100 h-fit max-h-128", styling ?? "");
    }

    const translate = (value: string): string => {
        if (props.translationFunction) {
          return props.translationFunction(value);
        }
    
        return value;
    };

    const onHeadingClick = (): void => {
        setShowDescription(!showDescription());
    }

    const _show: Accessor<boolean> = createMemo(() => {
        if (props.showPageDescription) {
            setShowDescription(props.showPageDescription);      
            
            return props.showPageDescription;
        }

        return showDescription();
      });
    
    return  (
        <div class={getClass(props.class)}>
            <Show when={props.heading || props.headingControls}>
                <div class="flex">
                    <Show when={props.heading}>
                        <div class={getHeadingContainerClass(props.headingContainerClass)}>
                            <h1 role="heading" onClick={onHeadingClick} aria-label={props["aria-label"] ?? translate("Page header")} class={getHeadingClass(props.headingClass)}>
                                {props.heading}
                            </h1>
                        </div>
                    </Show>
                    <Show when={props.headingControls}>
                        <div class="flex flex-grow w-fit h-fit">
                            {props.headingControls}
                        </div>
                    </Show>
                </div>
            </Show>
            <div role="definition" aria-label={translate("Page content description")} class={getContentClass(showDescription(), props.contentClass)}>
                <div class="flex h-fit">
                    {props.children}
                </div>
            </div>
        </div>
    )

}

export default PageHeader;