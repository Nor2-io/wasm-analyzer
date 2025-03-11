import { createSignal } from "solid-js";

import { Component } from "./wa/interfaces/nornor-wasm-analyzer-reader";
import { makePersisted } from "@solid-primitives/storage";

export const [rootComponent, setRootComponent] = createSignal<Component>();
export const [currentComponent, setCurrentComponent] =
  createSignal<Component>();

export const [current, setCurrent] = makePersisted(
  createSignal<string | null>(null)
);
export const [startup, setStartup] = makePersisted(createSignal(true));

export const [loading, setLoading] = makePersisted(createSignal(false));
export const [loadingMessage, setLoadingMessage] = makePersisted(
  createSignal<string | null>(null)
);
