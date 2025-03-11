import LogoSmall from "./../assets/WA2SmallWhite.svg";
import LogoLarge from "./../assets/WA2LargeWhite.svg";
import { Component, For, createComponent, createSignal } from "solid-js";

import { CollapseIcon, SmallScreenMenuIcon } from "./icons/Icons";
import { current, setCurrent } from "../State";
import { A } from "@solidjs/router";
import { twMerge } from "tailwind-merge";

const smallScreenWidth = 640;

export interface NavLinkProps {
  text: string;
  icon: Component;
  link?: string;
  onClicked?: () => void;

  active?: () => boolean;
  large: boolean;
}

let doClose: boolean;
let doOpen: boolean;

export function NavLink(props: NavLinkProps) {
  const icon = createComponent(props.icon, {});

  const deactivated = (): boolean => {
    return props.active ? !props.active() : false;
  };

  return (
    <A
      href={!deactivated() ? props.link ?? "#" : "#"}
      onClick={() => {
        if (!deactivated()) {
          props.onClicked ? props.onClicked() : setCurrent(props.text);
        }
      }}
      class="select-none w-full pl-8 py-2.5 font-bold text-sm rounded-r-full gap-3 items-center inline-flex whitespace-nowrap"
      classList={{
        "bg-primary text-neutral": current() == props.text && props.large,
        "cursor-not-allowed text-neutral-150 hover:text-neutral-150": deactivated(),
        "text-neutral hover:text-primary-300": !deactivated() && props.text !== current(),
      }}
    >
      <div
        class="w-5 h-5"
        classList={{
          "text-primary-250": current() == props.text && !props.large,
        }}
      >
        {icon}
      </div>

      {props.large && props.text}
    </A>
  );
}

export type Sections = Array<Section>;
export type Section = { title: string | null; links: Array<NavLink> };

export interface NavLink {
  text: string;
  icon: Component;
  link?: string;
  onClicked?: () => void;
  active?: () => boolean;
}

export interface SideNavProps {
  sections: Sections;
}

export function SideNav(props: SideNavProps) {
  const [openMenu, setOpenMenu] = createSignal(true);

  doClose = true;
  doOpen = true;

  const mobileResize = (): void => {
    if (!doClose && window.innerWidth > smallScreenWidth && window.innerWidth < smallScreenWidth + 50) {
      //we need a little bit of a span to catch this part, or it won't always work.
      doClose = true;
    }
    
    if (doClose && window.innerWidth < smallScreenWidth) {
      doClose = false;
      setOpenMenu(false);
    };

    if (doOpen && window.innerWidth > smallScreenWidth &&  window.innerWidth < smallScreenWidth + 50 && !openMenu()) {
      //keeping open status for large menu between resizing (until menu is manually opened on Mobile).
      setOpenMenu(true);
    }
  }

  new ResizeObserver(() => {
    mobileResize()
  }).observe(document.body)

  const toggleOpen = (): void => {
    doOpen = !openMenu();
    setOpenMenu(doOpen);
  };

  const navClick = (func?: () => void): (() => void) | undefined => {   
    if (window.innerWidth < smallScreenWidth) {
      setOpenMenu(false);
    }

    return func;
  }

  mobileResize();

  return (
    <div
      class={"w-[100%] z-50 sm:z-0 fixed shadow-lg sm:relative sm:w-24 h-full sm:bg-neutral-20 sm:grid sm:grid-flow-row sm:content-start"}
      classList={{ "w-full sm:w-72 h-full bg-neutral-20 sm:min-w-60": openMenu() }}
    >
      <div class={twMerge("w-full h-16 sm:border-b sm:h-36 border-neutral-30 flex sm:pt-7", openMenu() ? "bg-neutral-20" : "bg-transparent")}>
        <div class={twMerge("flex flex-row-reverse w-full h-full sm:flex-col shadow-neutral-10 items-center sm:shadow-none sm:bg-transparent bg-neutral-10 space-y-7", openMenu() ? "bg-neutral-20" : "bg-neutral-10 sm:bg-transparent")}>
          <button
            onClick={toggleOpen}
            class={twMerge("h-fit w-fit sm:h-5 sm:w-5", openMenu() ?  "sm:self-end sm:mr-7" :"self-center")}
          >
            <CollapseIcon
              class="invisible sm:visible text-neutral hover:text-primary-300"
              classList={{ "rotate-180": !openMenu() }}
            />
            <SmallScreenMenuIcon class={"visible sm:invisible text-neutral-200 w-7 h-7 mr-4"} />
          </button>

          {openMenu() ? (
            <div class="w-fit h-fit flex-grow sm:flex-grow-0">
              <img class="px-4 w-44 sm:w-52 selfcenter" src={LogoLarge} />
            </div>
          ) : (
            <>
              <img class="w-0 invisible sm:visible sm:w-20 py-2" src={LogoSmall} />
              <div class="w-fit h-fit flex-grow sm:h-0">
                <img class="w-44 px-4 visible sm:invisible sm:w-0 sm:h-0 sm:px-0 sm:py-0" src={LogoLarge} />
              </div>
            </>
          )}
        </div>
      </div>

      <div class="overflow-y-auto scrollbar bg-neutral-20"
           classList={{ "h-0 sm:h-fit": !openMenu() }}
      >
        <For each={props.sections}>
          {(it, i) => (
            <div
              class="w-full pt-5 pb-6"
              classList={{
                "border-b border-neutral-30": i() != props.sections.length - 1,
                "sm:pt-4 sm:pb-4": it.title == null,
              }}
            >
              {it.title && openMenu() ? (
                <div class="text-neutral pl-8 sm:h-4 sm:pb-6 text-opacity-70 text-xs font-normal uppercase sm:leading-4">
                  {it.title}
                </div>
              ) : it.title ? (
                <div class="sm:h-4 sm:pb-6"></div>
              ) : null}

              <For each={it.links}>
                {(it, i) => (
                  <NavLink
                    text={it.text}
                    icon={it.icon}
                    large={openMenu()}
                    active={it.active}
                    onClicked={navClick(it.onClicked)}
                    link={it.link}
                  />
                )}
              </For>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
