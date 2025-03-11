interface classListPairs {
  [k: string]: boolean | undefined;
}

export type TClassList = classListPairs | undefined;

export type TLoginForm = {
  username: string;
  password: string;
};

export type TButton = "button" | "reset" | "submit";

export type TInput = { type: string | TButton; alias?: string };

export const InputTypes: { [k: string]: TInput } = {
  button: { type: "button" },
  checkbox: { type: "checkbox" },
  color: { type: "color" },
  date: { type: "date" },
  email: { type: "email" },
  file: { type: "file" },
  number: { type: "number" },
  password: { type: "password" }, //Password needs to be typed as text if text should be possible to be made visible, I think.
  radio: { type: "radio" },
  submit: { type: "submit" },
  text: { type: "text" },
  url: { type: "url" },
  username: { type: "text", alias: "username--" },
};

export const GetInputType = (defaultType: TInput, type?: TInput) => {
  if (type) {
    return type.type;
  }

  return defaultType.type;
};

export const GetIdByType = (defaultId: string, id?: string, type?: TInput) => {
  if (id) {
    if (type && type.alias) {
      return type.alias + id;
    }

    return id;
  }

  if (type && type.alias) {
    return type.alias + defaultId;
  }

  return defaultId;
};

export const GetButtonType = (
  defaultButtonType: TButton,
  type?: TInput
): TButton => {
  if (
    type &&
    (type.type === InputTypes.button.type ||
      type.type === InputTypes.reset.type ||
      type.type === InputTypes.submit.type)
  ) {
    return <TButton>type.type;
  }

  return defaultButtonType;
};

export type TPillData = { key: string; label: string };

export interface ILicense {
  license?: string | null;
  url?: string;
  or?: ILicense;
  and?: ILicense;
}

export type TPathPart = {
  label: string;
  path?: string | null;
  href?: string;
};

export type TPathParts = TPathPart[];

export const Paths = {
  root: {
    label: "Start",
    path: null,
    href: undefined,
  },
  "Select file": {
    label: "Select file",
    path: null,
    href: undefined,
  },
  "Package registry": {
    label: "Package registry",
    path: "Package registry",
    href: undefined,
  },
  "Show WAT": {
    label: "Show WAT",
    path: "Show WAT",
    href: undefined,
  },
  "Generate SBOM": {
    label: "Generate SBOM",
    path: "Generate SBOM",
    href: undefined,
  },
  Metadata: {
    label: "Metadata",
    path: "Metadata",
    href: undefined,
  },
  Imports: {
    label: "Imports",
    path: "Imports",
    href: undefined,
  },
  Exports: {
    label: "Exports",
    path: "Exports",
    href: undefined,
  },
  Components: {
    label: "Components",
    path: "Components",
    href: undefined,
  },
  Dependencies: {
    label: "Dependencies",
    path: "Dependencies",
    href: undefined,
  },
  "WIT Inspection": {
    label: "WIT Inspection",
    path: "WIT Inspection",
    href: undefined,
  },
  "Custom Sections": {
    label: "Custom Sections",
    path: "Custom Sections",
    href: undefined,
  },
  "Environment Variables": {
    label: "Environment Variables",
    path: "Environment Variables",
    href: undefined,
  },
  Secrets: {
    label: "Secrets",
    path: "Secrets",
    href: undefined,
  },
};

export type TMediaSize = "sm" | "md" | "lg" | "xl" | "2xl";

export enum PositionEnum {
  before = "before",
  after = "after",
  above = "above",
  below = "below",
}

export type TPositionString = "before" | "after" | "above" | "below";

export type TPosition = TPositionString | PositionEnum;
