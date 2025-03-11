import { For } from "solid-js";
import type { TClassList, TPathPart, TPathParts } from "../types";
import type { JSXElement } from "solid-js";
import { twMerge } from "tailwind-merge";
import { BreadCrumbsDivider } from "./BreadCrumbsDivider";
import { Link } from "../Link";

export interface BreadCrumbsProps {
  id?: string;
  class?: string;
  classList?: TClassList;
  "aria-label"?: string;
  currentPath: TPathParts;
  setCurrent?: (current: string | null) => void;
  "data-testid"?: string;
  translationFunction?: (value: string) => string;
  useFunctions?: boolean;
  useLinks?: boolean;
}

const linkClass =
  "text-neutral-200 font-semibold hover:underline hover:text-primary-400";
const currentClass = "text-primary-350 font-semibold";

export const GetPathPartsArray = (path: string): string[] => {
  const pathParts = path.split("/");
  return pathParts.filter(
    (part) =>
      part !== "http" &&
      !part.includes(":") &&
      part !== "" &&
      !part.includes("."),
  );
};

export const GetSlashedPathPartsArray = (path: string) => {
  const pathParts = GetPathPartsArray(path);
  const slashedPathParts = ["/"];

  for (let i = 0; i < pathParts.length; i++) {
    slashedPathParts.push("/" + pathParts[i]);
  }

  return slashedPathParts;
};

export const BreadCrumbs = (props: BreadCrumbsProps): JSXElement => {

  const getClass = () => {
    return twMerge("flex w-fit h-fit text-[length:0.875rem]", props.class ?? "");
  };

  const getTrail = (path: TPathParts): TPathParts => {
    if (path.length === 1) {
      return [];
    }

    return path.slice(0, -1);
  };

  const getCurrentLabel = (path: TPathParts): TPathPart => {
    return path[path.length - 1];
  };

  const setCurrent = (path?: string | null): void => {
    if (props.setCurrent && props.useFunctions) {
      props.setCurrent(path ?? null);
    }
  };

  const translate = (value: string): string => {
    if (props.translationFunction) {
      return props.translationFunction(value);
    }

    return value;
  };

  return (
    <div
      id={props.id}
      class={getClass()}
      data-testid={props["data-testid"] ?? "breadcrumbs"}
      aria-label={props["aria-label"]}
    >
      <nav
        role="navigation"
        class="flex h-4 w-fit items-center justify-center space-x-2.5"
      >
        {getTrail(props.currentPath).length > 0 ? (
          <For each={getTrail(props.currentPath)}>
            {(pathPart) => {
              return (
                <>
                  <Link
                    aria-label={translate("Link to ") + pathPart.label}
                    href={props.useLinks ? pathPart.href : undefined}
                    onClick={() => setCurrent(pathPart.path)}
                    class={linkClass}
                  >
                    {translate(pathPart.label)}
                  </Link>
                  <BreadCrumbsDivider
                    aria-label={"divider"}
                    data-testid={`${props["data-testid"]}${
                      props["data-testid"] ? "-" : ""
                    }divider`}
                  />
                </>
              );
            }}
          </For>
        ) : (
          <></>
        )}
        <span class={currentClass}>
          {translate(getCurrentLabel(props.currentPath).label)}
        </span>
      </nav>
    </div>
  );
};

export default BreadCrumbs;
