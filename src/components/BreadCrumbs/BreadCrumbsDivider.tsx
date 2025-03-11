import { twMerge } from "tailwind-merge";

export interface BreadCrumbsDividerProps {
  id?: string;
  class?: string;
  title?: string;
  currentPath?: string;
}

export const BreadCrumbsDivider = (props: BreadCrumbsDividerProps) => {
  const getSvgClass = (): string => {
    return twMerge(
      "fill-none stroke-0.5 w-4 h-4 stroke-neutral-200 overflow-visible",
      props.class ?? "",
    );
  };

  return (
    <svg
      class={getSvgClass()}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <title>{props.title ?? "breadcrumbs divider"}</title>
      <path d="M0 0h24v24H0z" class="fill-none stroke-none" />
      <path d="M9 6l6 6l-6 6" />
    </svg>
  );
};
