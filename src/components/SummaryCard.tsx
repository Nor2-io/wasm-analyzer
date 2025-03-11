import { JSXElement } from "solid-js";
import { TClassList } from "./types";
import { twMerge } from "tailwind-merge";

export interface SummaryCardProps {
    id?: string;
    class?: string;
    classList?: TClassList;
    href: string;
    header: string;
    children: string | number | JSXElement;
}

export const SummaryCard = (props: SummaryCardProps): JSXElement => {
    return  (
      <a
        id={props.id}
        href={props.href}
        class={twMerge("flex flex-col border rounded-md border-neutral-50 w-full flex-grow h-24 hover:bg-neutral-20 items-center", props.class)}
      >
        <div class="flex flex-col h-full w-full items-center justify-center">
            <p class="text-sm font-normal leading-6 text-neutral whitespace-nowrap">
                {props.header}
            </p>
            <p class="text-lg 2xl:text-4xl font-semibold tracking-tight text-neutral">
                {props.children}
            </p>
        </div>
      </a>
    )

}

export default SummaryCard;