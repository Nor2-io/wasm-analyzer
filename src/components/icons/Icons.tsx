import type { JSXElement } from "solid-js";
import { twMerge } from "tailwind-merge";

interface classListPairs {
  [k: string]: boolean;
}

export type TClassList = classListPairs | undefined;

export interface IconProps {
  class?: string;
  classList?: TClassList;
}

export function QuestionmarkIcon(props: IconProps): JSXElement {
  return (
    <svg
      class={props.class}
      classList={props.classList}
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 16 16"
    >
      <path
        d="M6.05998 6C6.21672 5.55444 6.52608 5.17873 6.93328 4.93942C7.34048 4.7001 7.81924 4.61262 8.28476 4.69247C8.75028 4.77232 9.17252 5.01434 9.4767 5.37568C9.78087 5.73702 9.94735 6.19434 9.94665 6.66666C9.94665 8 7.94665 8.66666 7.94665 8.66666M7.99998 11.3333H8.00665M14.6666 8C14.6666 11.6819 11.6819 14.6667 7.99998 14.6667C4.31808 14.6667 1.33331 11.6819 1.33331 8C1.33331 4.3181 4.31808 1.33333 7.99998 1.33333C11.6819 1.33333 14.6666 4.3181 14.6666 8Z"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke="currentColor"
        stroke-width="1.33333"
      />
    </svg>
  );
}

export function RegistryIcon(props: IconProps): JSXElement {
  return (
    <svg
      class={props.class}
      classList={props.classList}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1"
      >
        <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3l-4.03 2.42ZM7 16.5l-4.74-2.85M7 16.5l5-3m-5 3v5.17m5-8.17V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Zm5 3l-5-3m5 3l4.74-2.85M17 16.5v5.17" />
        <path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3l5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8ZM12 8L7.26 5.15M12 8l4.74-2.85M12 13.5V8" />
      </g>
    </svg>
  );
}

export function TextViewIcon(props: IconProps): JSXElement {
  return (
    <svg
      class={props.class}
      classList={props.classList}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="none"
    >
      <g
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        clip-path="url(#a)"
      >
        <path d="M2.002 5.376V4.011A1.55 1.55 0 0 1 3.555 2.46h10.89a1.55 1.55 0 0 1 1.552 1.552v1.365M9 15.54V3.082M6.045 15.54h5.91" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h18v18H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function GraphViewIcon(props: IconProps): JSXElement {
  return (
    <svg
      class={props.class}
      classList={props.classList}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="none"
    >
      <g
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-opacity=".7"
        stroke-width="1.5"
        clip-path="url(#a)"
      >
        <path d="m4.54 9.035-.83 3.18m10.573-6.429L13.299 9m-5.263-.955 1.607 1.598m6.428-3.857H13.5A1.286 1.286 0 0 1 12.214 4.5V1.93A1.286 1.286 0 0 1 13.5.643h2.571a1.286 1.286 0 0 1 1.286 1.286V4.5a1.286 1.286 0 0 1-1.286 1.286ZM13.5 14.143h-2.572a1.286 1.286 0 0 1-1.285-1.286v-2.571A1.286 1.286 0 0 1 10.928 9H13.5a1.286 1.286 0 0 1 1.286 1.286v2.571a1.286 1.286 0 0 1-1.286 1.286ZM6.75 9.035H4.179a1.286 1.286 0 0 1-1.286-1.286V5.178a1.286 1.286 0 0 1 1.286-1.286H6.75a1.286 1.286 0 0 1 1.286 1.286v2.571A1.286 1.286 0 0 1 6.75 9.035ZM4.5 17.357H1.929a1.285 1.285 0 0 1-1.286-1.285V13.5a1.286 1.286 0 0 1 1.286-1.286H4.5A1.286 1.286 0 0 1 5.786 13.5v2.572A1.286 1.286 0 0 1 4.5 17.357Z" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h18v18H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function TreeViewIcon(props: IconProps): JSXElement {
  return (
    <svg
      class={props.class}
      classList={props.classList}
      xmlns="http://www.w3.org/2000/svg"
      width="17.154"
      height="14.903"
      fill="none"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-miterlimit="10"
        stroke-opacity=".7"
        d="M8.98 2.585v9.037c0 .765.727 1.39 1.616 1.39h1.211"
      />
      <path
        fill="currentColor"
        fill-opacity=".7"
        fill-rule="evenodd"
        d="M1 1.89C1 1.47 1.43 1 2.115 1h2.423c.686 0 1.116.47 1.116.89v.656a.56.56 0 0 0 0 .078v.656c0 .421-.43.89-1.116.89H2.115C1.43 4.17 1 3.701 1 3.28Zm5.654 1.195v.195c0 1.11-1.024 1.89-2.116 1.89H2.115C1.024 5.17 0 4.39 0 3.28V1.89C0 .782 1.024 0 2.115 0h2.423C5.63 0 6.654.782 6.654 1.89v.195h4.654v-.056c0-.802.733-1.334 1.469-1.334h2.907c.737 0 1.47.532 1.47 1.335v1.112c0 .802-.733 1.334-1.47 1.334h-2.907c-.736 0-1.47-.532-1.47-1.334v-.057Zm5.654-1.056c0-.114.139-.334.469-.334h2.907c.33 0 .47.22.47.335v1.112c0 .115-.14.334-.47.334h-2.907c-.33 0-.47-.22-.47-.334V2.03Zm.469 4.88c-.33 0-.47.22-.47.334v.514a.484.484 0 0 1 0 .084v.515c0 .114.14.334.47.334h2.907c.33 0 .47-.22.47-.334V7.243c0-.114-.14-.334-.47-.334zm-1.47.334v.056H8.982a.5.5 0 1 0 0 1h2.326v.057c0 .802.733 1.334 1.469 1.334h2.907c.737 0 1.47-.532 1.47-1.334V7.243c0-.802-.733-1.334-1.47-1.334h-2.907c-.736 0-1.47.532-1.47 1.334zm1 5.213c0-.115.14-.334.47-.334h2.907c.33 0 .47.22.47.334v1.113c0 .114-.14.334-.47.334h-2.907c-.33 0-.47-.22-.47-.334zm.47-1.334c-.736 0-1.47.532-1.47 1.334v1.113c0 .802.734 1.334 1.47 1.334h2.907c.737 0 1.47-.532 1.47-1.334v-1.113c0-.802-.733-1.334-1.47-1.334z"
        clip-rule="evenodd"
      />
    </svg>
  );
}

export function ListViewIcon(props: IconProps): JSXElement {
  return (
    <svg
      class={props.class}
      classList={props.classList}
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
    >
      <path
        d="M2.08398 8.33628H14.5884M2.08398 4.16815H14.5884M2.08398 12.5044H10.4202"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export function MetadataIcon(props: IconProps): JSXElement {
  return (
    <svg
      class={props.class}
      classList={props.classList}
      width="22"
      height="23"
      viewBox="0 0 22 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Menu icon for proto" clip-path="url(#clip0_1093_530)">
        <g id="file-code-1--code-files-angle-programming-file-bracket">
          <path
            id="Vector"
            d="M19.6431 19.7915C19.6431 20.2082 19.4776 20.6079 19.1829 20.9026C18.8882 21.1973 18.4885 21.3629 18.0717 21.3629H3.92885C3.51208 21.3629 3.11238 21.1973 2.81768 20.9026C2.52298 20.6079 2.35742 20.2082 2.35742 19.7915V2.50575C2.35742 2.08899 2.52298 1.68929 2.81768 1.39459C3.11238 1.09989 3.51208 0.934326 3.92885 0.934326H14.1431L19.6431 6.43433V19.7915Z"
            stroke="currentColor"
            stroke-opacity="0.7"
            stroke-width="1.71429"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Vector_2"
            d="M8.64286 16.6488L5.5 13.5059L8.64286 10.363"
            stroke="currentColor"
            stroke-opacity="0.7"
            stroke-width="1.71429"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Vector_3"
            d="M13.3574 16.6485L16.5003 13.5057L13.3574 10.3628"
            stroke="currentColor"
            stroke-opacity="0.7"
            stroke-width="1.71429"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_1093_530">
          <rect
            width="22"
            height="22"
            fill="white"
            transform="translate(0 0.148193)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export function CustomSectionsIcon(props: IconProps): JSXElement {
  return (
    <svg
      class={props.class}
      classList={props.classList}
      width="24"
      height="23"
      viewBox="0 0 24 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Menu icon for proto">
        <g id="pencil--change-edit-modify-pencil-write-writing">
          <path
            id="Vector"
            d="M14.5192 18.8064L10.0273 20.0641L11.2851 15.5722L19.5102 7.387C19.6032 7.29193 19.7142 7.21639 19.8368 7.16481C19.9593 7.11324 20.091 7.08667 20.2239 7.08667C20.3569 7.08667 20.4885 7.11324 20.6111 7.16481C20.7337 7.21639 20.8447 7.29193 20.9376 7.387L22.7044 9.16379C22.7979 9.25666 22.872 9.36708 22.9226 9.48871C22.9732 9.61034 22.9993 9.74078 22.9993 9.87251C22.9993 10.0042 22.9732 10.1347 22.9226 10.2563C22.872 10.3779 22.7979 10.4884 22.7044 10.5812L14.5192 18.8064Z"
            stroke="currentColor"
            stroke-opacity="0.7"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <g id="cog--work-loading-cog-gear-settings-machine">
          <path
            id="Vector_2"
            d="M16.1149 10.3021V9.94822L17.1209 8.66659C17.2946 8.44862 17.3981 8.1831 17.4178 7.90508C17.4375 7.62706 17.3724 7.34961 17.2311 7.10934L16.6799 6.14467C16.543 5.90817 16.3389 5.7177 16.0935 5.59746C15.8482 5.47722 15.5726 5.43265 15.3018 5.4694L13.6756 5.71746L11.6636 4.55986L11.071 3.03017C10.9711 2.77118 10.7953 2.54841 10.5666 2.39103C10.3379 2.23365 10.067 2.14901 9.78941 2.14819H8.65937C8.38177 2.14901 8.11088 2.23365 7.88219 2.39103C7.65351 2.54841 7.47768 2.77118 7.37774 3.03017L6.78516 4.55986L4.74558 5.71746L3.11943 5.4694C2.84865 5.43265 2.57307 5.47722 2.32768 5.59746C2.0823 5.7177 1.87821 5.90817 1.74133 6.14467L1.19009 7.10934C1.04884 7.34961 0.983759 7.62706 1.00344 7.90508C1.02312 8.1831 1.12664 8.44862 1.30034 8.66659L2.33391 9.94822V12.2634L1.3279 13.545C1.15421 13.763 1.05069 14.0285 1.031 14.3066C1.01132 14.5846 1.0764 14.862 1.21765 15.1023L1.76889 16.067C1.90577 16.3035 2.10987 16.4939 2.35525 16.6142C2.60063 16.7344 2.87621 16.779 3.14699 16.7422L4.77314 16.4942L6.78516 17.6518L7.37774 19.1815C7.47768 19.4405 7.65351 19.6632 7.88219 19.8206C8.11088 19.978 8.38177 20.0626 8.65937 20.0634H9.81697M6.4682 11.1058C6.4682 11.8368 6.75858 12.5379 7.27547 13.0547C7.79235 13.5716 8.4934 13.862 9.22439 13.862C9.95538 13.862 10.6564 13.5716 11.1733 13.0547C11.6902 12.5379 11.9806 11.8368 11.9806 11.1058C11.9806 10.3748 11.6902 9.67378 11.1733 9.15689C10.6564 8.64001 9.95538 8.34963 9.22439 8.34963C8.4934 8.34963 7.79235 8.64001 7.27547 9.15689C6.75858 9.67378 6.4682 10.3748 6.4682 11.1058Z"
            stroke="currentColor"
            stroke-opacity="0.7"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </g>
    </svg>
  );
}

export function WitInspectionIcon(props: IconProps): JSXElement {
  return (
    <svg
      class={props.class}
      classList={props.classList}
      width="22"
      height="25"
      viewBox="0 0 22 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Menu icon for proto">
        <g id="magnifying-glass--glass-search-magnifying">
          <path
            id="Vector"
            d="M15.0696 21.5757C16.2229 21.5757 17.3291 21.1201 18.1447 20.309C18.9602 19.498 19.4184 18.398 19.4184 17.251C19.4184 16.104 18.9602 15.004 18.1447 14.193C17.3291 13.3819 16.2229 12.9263 15.0696 12.9263C13.9162 12.9263 12.81 13.3819 11.9945 14.193C11.1789 15.004 10.7207 16.104 10.7207 17.251C10.7207 18.398 11.1789 19.498 11.9945 20.309C12.81 21.1201 13.9162 21.5757 15.0696 21.5757Z"
            stroke="currentColor"
            stroke-opacity="0.7"
            stroke-width="1.71429"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Vector_2"
            d="M20.9999 23.1483L18.2324 20.3962"
            stroke="currentColor"
            stroke-opacity="0.7"
            stroke-width="1.71429"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <g id="new-file--empty-common-file-content">
          <path
            id="Vector_3"
            d="M15.7485 12.9262V5.81487L11.0558 1.14819H2.34077C1.98518 1.14819 1.64415 1.28867 1.3927 1.53872C1.14126 1.78877 1 2.12791 1 2.48153V17.1482C1 17.5018 1.14126 17.841 1.3927 18.091C1.64415 18.3411 1.98518 18.4816 2.34077 18.4816H10.7207"
            stroke="currentColor"
            stroke-opacity="0.7"
            stroke-width="1.71429"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Vector 2529"
            d="M10.3848 1.14819V6.48153H15.7479"
            stroke="currentColor"
            stroke-opacity="0.7"
            stroke-width="1.71429"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </g>
    </svg>
  );
}

export function ImportIcon(props: IconProps): JSXElement {
  return (
    <svg
      class={props.class}
      classList={props.classList}
      width="22"
      height="23"
      viewBox="0 0 22 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Menu icon for proto">
        <g id="download-box-1--arrow-box-down-download-internet-network-server-upload">
          <path
            id="Vector"
            d="M19.5327 7.98886C19.9441 7.98886 20.3387 8.11005 20.6296 8.32578C20.9205 8.54151 21.084 8.8341 21.084 9.13919L21.084 18.3418L0.917315 18.3418L0.917315 9.13918C0.917315 8.8341 1.08075 8.54151 1.37168 8.32578C1.6626 8.11005 2.05717 7.98886 2.4686 7.98886"
            stroke="currentColor"
            stroke-opacity="0.7"
            stroke-width="1.71429"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Vector_2"
            d="M7.07031 9.87109L10.9989 13.9047L14.9275 9.87109"
            stroke="currentColor"
            stroke-opacity="0.7"
            stroke-width="1.71429"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Vector_3"
            d="M11 13.7703L11 4.0896"
            stroke="currentColor"
            stroke-opacity="0.7"
            stroke-width="1.71429"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </g>
    </svg>
  );
}

export function ExportIcon(props: IconProps): JSXElement {
  return (
    <svg
      class={props.class}
      classList={props.classList}
      width="22"
      height="23"
      viewBox="0 0 22 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Menu icon for proto">
        <g id="download-box-1--arrow-box-down-download-internet-network-server-upload">
          <path
            id="Vector"
            d="M19.5327 7.98886C19.9441 7.98886 20.3387 8.11005 20.6296 8.32578C20.9205 8.54151 21.084 8.8341 21.084 9.13919L21.084 18.3418L0.917316 18.3418L0.917316 9.13919C0.917316 8.8341 1.08075 8.54151 1.37168 8.32578C1.6626 8.11006 2.05717 7.98886 2.4686 7.98886"
            stroke="currentColor"
            stroke-opacity="0.7"
            stroke-width="1.71429"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Vector_2"
            d="M14.9277 8.12305L10.9992 4.08943L7.07059 8.12305"
            stroke="currentColor"
            stroke-opacity="0.7"
            stroke-width="1.71429"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Vector_3"
            d="M11 4.08935L11 13.77"
            stroke="currentColor"
            stroke-opacity="0.7"
            stroke-width="1.71429"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </g>
    </svg>
  );
}

export function CollapseIcon(props: IconProps): JSXElement {
  return (
    <svg
      class={props.class}
      classList={props.classList}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Icon: Arrow">
        <g id="Icon">
          <path
            id="Vector"
            d="M10.5762 4.8L5.14284 10.2333C4.50117 10.875 4.50117 11.925 5.14284 12.5667L10.5762 18"
            stroke="currentColor"
            stroke-opacity="0.7"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Vector_2"
            d="M16 4.8L10.5667 10.2333C9.925 10.875 9.925 11.925 10.5667 12.5667L16 18"
            stroke="currentColor"
            stroke-opacity="0.7"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </g>
    </svg>
  );
}

export function SmallScreenMenuIcon(props: IconProps): JSXElement {
  return (
    <svg
      class={twMerge("fill-none w-[1.25rem] h-[1.25rem] stroke-neutral-200", props.class)}
      viewBox="0 0 30 30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 15H28.5"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M1.5 6H28.5"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M1.5 24H28.5"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export function DependenciesIcon(props: IconProps): JSXElement {
  return (
    <svg
      class={props.class}
      classList={props.classList}
      width="22"
      height="23"
      viewBox="0 0 22 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Menu icon for proto" clip-path="url(#clip0_1093_6077)">
        <g id="hierarchy-2--node-organization-links-structure-link-nodes-network-hierarchy">
          <path
            id="Vector"
            d="M3.14258 15.8625V12.7196C3.14258 12.3029 3.30814 11.9032 3.60284 11.6085C3.89754 11.3138 4.29724 11.1482 4.71401 11.1482H17.2854C17.7022 11.1482 18.1019 11.3138 18.3966 11.6085C18.6913 11.9032 18.8569 12.3029 18.8569 12.7196V15.8625"
            stroke="currentColor"
            stroke-opacity="0.7"
            stroke-width="1.71429"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Vector_2"
            d="M11 6.43408V15.8627"
            stroke="currentColor"
            stroke-opacity="0.7"
            stroke-width="1.71429"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Vector 2521"
            d="M8.64258 3.29115V4.86258C8.64258 5.27935 8.80814 5.67905 9.10284 5.97375C9.39754 6.26845 9.79724 6.43401 10.214 6.43401H11.7854C12.2022 6.43401 12.6019 6.26845 12.8966 5.97375C13.1913 5.67905 13.3569 5.27935 13.3569 4.86258V3.29115C13.3569 2.87439 13.1913 2.47469 12.8966 2.17999C12.6019 1.88529 12.2022 1.71973 11.7854 1.71973H10.214C9.79724 1.71973 9.39754 1.88529 9.10284 2.17999C8.80814 2.47469 8.64258 2.87439 8.64258 3.29115Z"
            stroke="currentColor"
            stroke-opacity="0.7"
            stroke-width="1.71429"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Vector 2522"
            d="M8.64258 17.434V19.0054C8.64258 19.4222 8.80814 19.8219 9.10284 20.1166C9.39754 20.4113 9.79724 20.5768 10.214 20.5768H11.7854C12.2022 20.5768 12.6019 20.4113 12.8966 20.1166C13.1913 19.8219 13.3569 19.4222 13.3569 19.0054V17.434C13.3569 17.0172 13.1913 16.6175 12.8966 16.3228C12.6019 16.0281 12.2022 15.8625 11.7854 15.8625H10.214C9.79724 15.8625 9.39754 16.0281 9.10284 16.3228C8.80814 16.6175 8.64258 17.0172 8.64258 17.434Z"
            stroke="currentColor"
            stroke-opacity="0.7"
            stroke-width="1.71429"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Vector 2523"
            d="M0.785156 17.434V19.0054C0.785156 19.4222 0.950717 19.8219 1.24542 20.1166C1.54012 20.4113 1.93982 20.5768 2.35658 20.5768H3.92801C4.34478 20.5768 4.74448 20.4113 5.03918 20.1166C5.33388 19.8219 5.49944 19.4222 5.49944 19.0054V17.434C5.49944 17.0172 5.33388 16.6175 5.03918 16.3228C4.74448 16.0281 4.34478 15.8625 3.92801 15.8625H2.35658C1.93982 15.8625 1.54012 16.0281 1.24542 16.3228C0.950717 16.6175 0.785156 17.0172 0.785156 17.434Z"
            stroke="currentColor"
            stroke-opacity="0.7"
            stroke-width="1.71429"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Vector 2524"
            d="M16.5 17.434V19.0054C16.5 19.4222 16.6656 19.8219 16.9603 20.1166C17.255 20.4113 17.6547 20.5768 18.0714 20.5768H19.6429C20.0596 20.5768 20.4593 20.4113 20.754 20.1166C21.0487 19.8219 21.2143 19.4222 21.2143 19.0054V17.434C21.2143 17.0172 21.0487 16.6175 20.754 16.3228C20.4593 16.0281 20.0596 15.8625 19.6429 15.8625H18.0714C17.6547 15.8625 17.255 16.0281 16.9603 16.3228C16.6656 16.6175 16.5 17.0172 16.5 17.434Z"
            stroke="currentColor"
            stroke-opacity="0.7"
            stroke-width="1.71429"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_1093_6077">
          <rect
            width="22"
            height="22"
            fill="white"
            transform="translate(0 0.148193)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export function ComponentIcon(props: IconProps): JSXElement {
  return (
    <svg
      class={props.class}
      classList={props.classList}
      width="22"
      height="23"
      viewBox="0 0 22 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Menu icon for proto" clip-path="url(#clip0_1093_9864)">
        <path
          id="Vector"
          d="M20.259 12.9812H13.659C13.4402 12.9812 13.2303 13.0433 13.0756 13.1538C12.9209 13.2643 12.834 13.4142 12.834 13.5705V20.6419C12.834 20.7982 12.9209 20.9481 13.0756 21.0586C13.2303 21.1691 13.4402 21.2312 13.659 21.2312H20.259C20.4778 21.2312 20.6876 21.1691 20.8423 21.0586C20.9971 20.9481 21.084 20.7982 21.084 20.6419V13.5705C21.084 13.4142 20.9971 13.2643 20.8423 13.1538C20.6876 13.0433 20.4778 12.9812 20.259 12.9812Z"
          stroke="currentColor"
          stroke-opacity="0.7"
          stroke-width="1.71429"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          id="Vector_2"
          d="M20.259 1.0647H13.659C13.4402 1.0647 13.2303 1.20908 13.0756 1.46609C12.9209 1.72309 12.834 2.07167 12.834 2.43513V7.94427C12.834 8.30773 12.9209 8.6563 13.0756 8.91331C13.2303 9.17031 13.4402 9.3147 13.659 9.3147H20.259C20.4778 9.3147 20.6876 9.17031 20.8423 8.91331C20.9971 8.6563 21.084 8.30773 21.084 7.94427V2.43513C21.084 2.07167 20.9971 1.72309 20.8423 1.46609C20.6876 1.20908 20.4778 1.0647 20.259 1.0647Z"
          stroke="currentColor"
          stroke-opacity="0.7"
          stroke-width="1.71429"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          id="Vector_3"
          d="M8.34102 1.0647H1.74102C1.52221 1.0647 1.31237 1.12678 1.15765 1.2373C1.00293 1.34781 0.916016 1.49769 0.916016 1.65398V8.72541C0.916016 8.8817 1.00293 9.03159 1.15765 9.1421C1.31237 9.25261 1.52221 9.3147 1.74102 9.3147H8.34102C8.55982 9.3147 8.76966 9.25261 8.92438 9.1421C9.0791 9.03159 9.16602 8.8817 9.16602 8.72541V1.65398C9.16602 1.49769 9.0791 1.34781 8.92438 1.2373C8.76966 1.12678 8.55982 1.0647 8.34102 1.0647Z"
          stroke="currentColor"
          stroke-opacity="0.7"
          stroke-width="1.71429"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          id="Vector_4"
          d="M8.34102 12.9812H1.74102C1.52221 12.9812 1.31237 13.1256 1.15765 13.3826C1.00293 13.6396 0.916016 13.9882 0.916016 14.3516V19.8608C0.916016 20.2242 1.00293 20.5728 1.15765 20.8298C1.31237 21.0868 1.52221 21.2312 1.74102 21.2312H8.34102C8.55982 21.2312 8.76966 21.0868 8.92438 20.8298C9.0791 20.5728 9.16602 20.2242 9.16602 19.8608V14.3516C9.16602 13.9882 9.0791 13.6396 8.92438 13.3826C8.76966 13.1256 8.55982 12.9812 8.34102 12.9812Z"
          stroke="currentColor"
          stroke-opacity="0.7"
          stroke-width="1.71429"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1093_9864">
          <rect
            width="22"
            height="22"
            fill="white"
            transform="translate(0 0.148193)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export function SecretsIcon(props: IconProps): JSXElement {
  return (
    <svg
      class={props.class}
      classList={props.classList}
      width="22"
      height="23"
      viewBox="0 0 22 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Menu icon for proto" clip-path="url(#clip0_1093_10056)">
        <g id="padlock-square-1--combination-combo-lock-locked-padlock-secure-security-shield-keyhole">
          <path
            id="Vector"
            d="M17.2854 8.79102H4.71401C4.29724 8.79102 3.89754 8.95658 3.60284 9.25128C3.30814 9.54598 3.14258 9.94568 3.14258 10.3624V19.791C3.14258 20.2078 3.30814 20.6075 3.60284 20.9022C3.89754 21.1969 4.29724 21.3624 4.71401 21.3624H17.2854C17.7022 21.3624 18.1019 21.1969 18.3966 20.9022C18.6913 20.6075 18.8569 20.2078 18.8569 19.791V10.3624C18.8569 9.94568 18.6913 9.54598 18.3966 9.25128C18.1019 8.95658 17.7022 8.79102 17.2854 8.79102Z"
            stroke="currentColor"
            stroke-opacity="0.7"
            stroke-width="1.71429"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Vector_2"
            d="M16.5 8.79098V6.43384C16.5 4.97515 15.9205 3.5762 14.8891 2.54475C13.8576 1.5133 12.4587 0.933838 11 0.933838C9.54131 0.933838 8.14236 1.5133 7.11091 2.54475C6.07946 3.5762 5.5 4.97515 5.5 6.43384V8.79098"
            stroke="currentColor"
            stroke-opacity="0.7"
            stroke-width="1.71429"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Vector_3"
            d="M11.0006 15.8622C11.2089 15.8622 11.4088 15.7794 11.5561 15.6321C11.7035 15.4847 11.7863 15.2849 11.7863 15.0765C11.7863 14.8681 11.7035 14.6683 11.5561 14.5209C11.4088 14.3736 11.2089 14.2908 11.0006 14.2908C10.7922 14.2908 10.5923 14.3736 10.445 14.5209C10.2976 14.6683 10.2148 14.8681 10.2148 15.0765C10.2148 15.2849 10.2976 15.4847 10.445 15.6321C10.5923 15.7794 10.7922 15.8622 11.0006 15.8622Z"
            stroke="currentColor"
            stroke-opacity="0.7"
            stroke-width="1.71429"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_1093_10056">
          <rect
            width="22"
            height="22"
            fill="white"
            transform="translate(0 0.148193)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export function ShowWatIcon(props: IconProps): JSXElement {
  return (
    <div class={props.class} classList={props.classList}>
      <svg
        class="relative top-0"
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="align-back-1--back-design-layer-layers-pile-stack-arrange-square">
          <path
            id="Vector"
            d="M6.28627 0.933838H19.6434C20.0602 0.933838 20.4599 1.0994 20.7546 1.3941C21.0493 1.6888 21.2148 2.0885 21.2148 2.50527V15.8624C21.2148 16.2792 21.0493 16.6789 20.7546 16.9736C20.4599 17.2683 20.0602 17.4338 19.6434 17.4338H6.28627C5.8695 17.4338 5.46981 17.2683 5.17511 16.9736C4.88041 16.6789 4.71484 16.2792 4.71484 15.8624V2.50527C4.71484 2.0885 4.88041 1.6888 5.17511 1.3941C5.46981 1.0994 5.8695 0.933838 6.28627 0.933838Z"
            stroke="currentColor"
            stroke-opacity="0.7"
            stroke-width="1.57143"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Vector_2"
            d="M5.5 1.14819C5.08323 1.14819 1.75496 4.31375 1.46026 4.60845C1.16556 4.90315 1 5.30285 1 5.71962V19.0768C1 19.4935 1.16556 19.8932 1.46026 20.1879C1.75496 20.4826 2.15466 20.6482 2.57143 20.6482H15.9286C16.3453 20.6482 16.745 20.4826 17.0397 20.1879C17.3344 19.8932 21 17.065 21 16.6482"
            stroke="currentColor"
            stroke-opacity="0.7"
            stroke-width="1.57143"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </svg>
      <svg
        class="relative -top-[1.15rem] left-[0.45rem]"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Signal Loading">
          <path
            id="Vector"
            d="M3.11686 8.14314L0.973999 6.00028L3.11686 3.85742"
            stroke="currentColor"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Vector_2"
            d="M8.88312 8.14314L11.026 6.00028L8.88312 3.85742"
            stroke="currentColor"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Vector 2432"
            d="M6.79858 3.01953L5.20138 8.98037"
            stroke="currentColor"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </svg>
    </div>
  );
}

export function OpenIcon(props: IconProps): JSXElement {
  return (
    <svg
      class={props.class}
      classList={props.classList}
      width="22"
      height="23"
      viewBox="0 0 22 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Menu icon" clip-path="url(#clip0_1093_10561)">
        <g id="add-square--square-remove-cross-buttons-add-plus-button-+-mathematics-math">
          <path
            id="Vector"
            d="M11 6.43384V15.8624"
            stroke="currentColor"
            stroke-opacity="0.7"
            stroke-width="1.57143"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Vector_2"
            d="M6.28516 11.1482H15.7137"
            stroke="currentColor"
            stroke-opacity="0.7"
            stroke-width="1.57143"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Vector_3"
            d="M16.4994 0.933838H5.49944C4.24914 0.933838 3.05004 1.43052 2.16594 2.31462C1.28184 3.19872 0.785156 4.39782 0.785156 5.64812V16.6481C0.785156 17.8984 1.28184 19.0975 2.16594 19.9816C3.05004 20.8657 4.24914 21.3624 5.49944 21.3624H16.4994C17.7497 21.3624 18.9488 20.8657 19.8329 19.9816C20.717 19.0975 21.2137 17.8984 21.2137 16.6481V5.64812C21.2137 4.39782 20.717 3.19872 19.8329 2.31462C18.9488 1.43052 17.7497 0.933838 16.4994 0.933838Z"
            stroke="currentColor"
            stroke-opacity="0.7"
            stroke-width="1.57143"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_1093_10561">
          <rect
            width="22"
            height="22"
            fill="white"
            transform="translate(0 0.148193)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export function GenerateSbomIcon(props: IconProps): JSXElement {
  return (
    <svg
      class={props.class}
      classList={props.classList}
      width="22"
      height="23"
      viewBox="0 0 22 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Menu icon" clip-path="url(#clip0_1093_10397)">
        <g id="new-file--empty-common-file-content">
          <path
            id="Vector"
            d="M19.6431 19.791C19.6431 20.2077 19.4776 20.6074 19.1829 20.9021C18.8882 21.1968 18.4885 21.3624 18.0717 21.3624H3.92885C3.51208 21.3624 3.11238 21.1968 2.81768 20.9021C2.52298 20.6074 2.35742 20.2077 2.35742 19.791V2.50527C2.35742 2.0885 2.52298 1.6888 2.81768 1.3941C3.11238 1.0994 3.51208 0.933838 3.92885 0.933838H14.1431L19.6431 6.43384V19.791Z"
            stroke="currentColor"
            stroke-opacity="0.7"
            stroke-width="1.57143"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Vector 2529"
            d="M13.3574 0.933838V7.21955H19.6431"
            stroke="currentColor"
            stroke-opacity="0.7"
            stroke-width="1.57143"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <path
          id="Vector_3"
          d="M7 10.1482H14.8571"
          stroke="currentColor"
          stroke-opacity="0.7"
          stroke-width="1.57143"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          id="Vector_4"
          d="M7 14.0767H14.8571"
          stroke="currentColor"
          stroke-opacity="0.7"
          stroke-width="1.57143"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          id="Vector_5"
          d="M7 18.0054H11.7143"
          stroke="currentColor"
          stroke-opacity="0.7"
          stroke-width="1.57143"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1093_10397">
          <rect
            width="22"
            height="22"
            fill="white"
            transform="translate(0 0.148193)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export function EnvIcon(props: IconProps): JSXElement {
  return (
    <div class="flex items-center">
      <svg
        width="7"
        height="21"
        viewBox="0 0 7 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="vector 2099"
          d="M5.71805 0.928711H5.12032C4.71069 0.928711 4.31784 1.09144 4.02819 1.38109C3.73854 1.67074 3.57582 2.06359 3.57582 2.47322V6.7515C3.57599 7.2694 3.44595 7.77903 3.19765 8.23352C2.94935 8.68801 2.59076 9.07279 2.15487 9.35245L0.913086 10.1479L2.15332 10.9433C2.58951 11.2228 2.9484 11.6075 3.19697 12.062C3.44554 12.5165 3.57582 13.0262 3.57582 13.5442V17.8225C3.57582 18.2322 3.73854 18.625 4.02819 18.9147C4.31784 19.2043 4.71069 19.367 5.12032 19.367H5.7165"
          stroke="currentColor"
          stroke-opacity="0.7"
          stroke-width="1.71429"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <svg
        class={props.class}
        classList={props.classList}
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Delete 1">
          <path
            id="Vector"
            d="M8.14989 1.80444L1.45703 8.4973"
            stroke="currentColor"
            stroke-opacity="0.7"
            stroke-width="1.71429"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Vector_2"
            d="M1.45703 1.80444L8.14989 8.4973"
            stroke="currentColor"
            stroke-opacity="0.7"
            stroke-width="1.71429"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </svg>
      <svg
        width="7"
        height="21"
        viewBox="0 0 7 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="vector 2100"
          d="M1.10938 0.928711H1.70555C2.11518 0.928711 2.50803 1.09144 2.79768 1.38109C3.08734 1.67074 3.25006 2.06359 3.25006 2.47322V6.7515C3.24989 7.2694 3.37993 7.77903 3.62823 8.23352C3.87653 8.68801 4.23511 9.07279 4.67101 9.35245L5.91279 10.1479L4.67101 10.9433C4.23511 11.223 3.87653 11.6077 3.62823 12.0622C3.37993 12.5167 3.24989 13.0263 3.25006 13.5442V17.8225C3.25006 18.2322 3.08734 18.625 2.79768 18.9147C2.50803 19.2043 2.11518 19.367 1.70555 19.367H1.10938"
          stroke="currentColor"
          stroke-opacity="0.7"
          stroke-width="1.71429"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
}

export function WasmIcon(props: IconProps): JSXElement {
  return (
    <svg
      class={props.class}
      classList={props.classList}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 612 612"
    >
      <path
        fill="#654ff0"
        d="M376 0v3.3c0 38.76-31.42 70.17-70.17 70.17-38.76 0-70.17-31.42-70.17-70.17V0H0v612h612V0z"
      />
      <path
        fill="#fff"
        d="M142.16 329.81h40.56l27.69 147.47h.5l33.28-147.47h37.94l30.06 149.28h.59l31.56-149.28h39.78L332.43 546.5h-40.25l-29.81-147.47h-.78L229.68 546.5h-41zm287.69 0h63.94l63.5 216.69h-41.84l-13.81-48.22H428.8l-10.66 48.22h-40.75zm24.34 53.41-17.69 79.5h55.06l-20.31-79.5z"
      />
    </svg>
  );
}


export function TriangleDownIcon(props: IconProps): JSXElement {
  return (
    <svg
      class={props.class}
      classList={props.classList}
      stroke-width="0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
    >
      <path d="M2 5.56 2.413 5h11.194l.393.54L8.373 11h-.827L2 5.56z" />
    </svg>
  );
}

export function TriangleUpIcon(props: IconProps): JSXElement {
  return (
    <svg
      class={props.class}
      classList={props.classList}
      stroke-width="0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
    >
      <path d="m14 10.44-.413.56H2.393L2 10.46 7.627 5h.827L14 10.44z" />
    </svg>
  );
}

export function FileIcon(props: IconProps): JSXElement {
  return (
    <svg
      class={twMerge("fill-none w-7 h-7", props.class)}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          d="M15 1.66699H7C6.33696 1.66699 5.46884 2.19815 5 2.66699C4.53116 3.13583 4 4.00395 4 4.66699V24.667C4 25.33 4.53116 25.1982 5 25.667C5.46884 26.1358 6.33696 26.667 7 26.667H22C22.663 26.667 22.5312 26.1358 23 25.667C23.4688 25.1982 24 25.33 24 24.667V10.667L15 1.66699Z"
          class="stroke-neutral stroke-[0.083rem]"
          stroke-opacity="0.7"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15 1.66699V10.667H24"
          class="stroke-neutral stroke-[0.083rem]"
          stroke-opacity="0.7"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  );
}

export function RepositoryIcon(props: IconProps): JSXElement {
  return (
    <svg
      class={twMerge("fill-current stroke-0 h-6 w-6 overflow-visible", props.class)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M3 2.75A2.75 2.75 0 0 1 5.75 0h14.5a.75.75 0 0 1 .75.75v20.5a.75.75 0 0 1-.75.75h-6a.75.75 0 0 1 0-1.5h5.25v-4H6A1.5 1.5 0 0 0 4.5 18v.75c0 .716.43 1.334 1.05 1.605a.75.75 0 0 1-.6 1.374A3.251 3.251 0 0 1 3 18.75ZM19.5 1.5H5.75c-.69 0-1.25.56-1.25 1.25v12.651A2.989 2.989 0 0 1 6 15h13.5Z"></path>
      <path d="M7 18.25a.25.25 0 0 1 .25-.25h5a.25.25 0 0 1 .25.25v5.01a.25.25 0 0 1-.397.201l-2.206-1.604a.25.25 0 0 0-.294 0L7.397 23.46a.25.25 0 0 1-.397-.2v-5.01Z"></path>
    </svg>
  );
}

export function GithubIcon(props: IconProps): JSXElement {
  return (
    <svg
      class={twMerge("fill-none stroke-0 h-6 w-6 overflow-visible", props.class)}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.2782 0C5.04701 0 0 5.04701 0 11.2782C0 16.2688 3.22839 20.4841 7.71149 21.9785C8.2754 22.0771 8.48687 21.7388 8.48687 21.4427C8.48687 21.1749 8.47277 20.2867 8.47277 19.3422C5.63912 19.8638 4.90603 18.6514 4.68047 18.017C4.55359 17.6927 4.00377 16.6918 3.52445 16.4239C3.12971 16.2125 2.5658 15.6908 3.51035 15.6767C4.39851 15.6626 5.03291 16.4944 5.24438 16.8328C6.25942 18.5386 7.88066 18.0593 8.52916 17.7632C8.62785 17.0301 8.9239 16.5367 9.24815 16.2548C6.73874 15.9728 4.11655 15 4.11655 10.6861C4.11655 9.45962 4.55359 8.44458 5.27257 7.6551C5.15979 7.37314 4.76505 6.21712 5.38536 4.66637C5.38536 4.66637 6.32991 4.37032 8.48687 5.82239C9.38913 5.56863 10.3478 5.44175 11.3064 5.44175C12.2651 5.44175 13.2237 5.56863 14.126 5.82239C16.2829 4.35622 17.2275 4.66637 17.2275 4.66637C17.8478 6.21712 17.4531 7.37314 17.3403 7.6551C18.0593 8.44458 18.4963 9.44552 18.4963 10.6861C18.4963 15.0141 15.86 15.9728 13.3506 16.2548C13.7594 16.6072 14.1119 17.2839 14.1119 18.3412C14.1119 19.8497 14.0978 21.0621 14.0978 21.4427C14.0978 21.7388 14.3093 22.0912 14.8732 21.9785C19.3281 20.4841 22.5565 16.2548 22.5565 11.2782C22.5565 5.04701 17.5095 0 11.2782 0Z"
        class="fill-neutral"
        fill-opacity="0.7"
        fill-rule="evenodd"
        clip-rule="evenodd"
      />
    </svg>
  );
}

export function DocumentationIcon(props: IconProps): JSXElement {
  return (
    <svg
      class={twMerge("fill-none stroke-0 h-6 w-6 overflow-visible", props.class)}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.1663 9.16634V13.7497C20.1663 18.333 18.333 20.1663 13.7497 20.1663H8.24967C3.66634 20.1663 1.83301 18.333 1.83301 13.7497V8.24967C1.83301 3.66634 3.66634 1.83301 8.24967 1.83301H12.833"
        class="stroke-neutral stroke-[0.094rem]"
        stroke-opacity="0.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M20.1663 9.16634H16.4997C13.7497 9.16634 12.833 8.24967 12.833 5.49967V1.83301L20.1663 9.16634Z"
        class="stroke-neutral stroke-[0.094rem]"
        stroke-opacity="0.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.41699 11.917H11.917"
        class="stroke-neutral stroke-[0.094rem]"
        stroke-opacity="0.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.41699 15.583H10.0837"
        class="stroke-neutral stroke-[0.094rem]"
        stroke-opacity="0.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export function HomepageIcon(props: IconProps): JSXElement {
  return (
    <svg
      class={twMerge("fill-none stroke-0 h-6 w-6 overflow-visible", props.class)}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.7412 16.0413H15.1254C17.8937 16.0413 20.167 13.7772 20.167 10.9997C20.167 8.23134 17.9029 5.95801 15.1254 5.95801H13.7412"
        class="stroke-neutral stroke-[0.094rem]"
        stroke-opacity="0.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.24967 5.95801H6.87467C4.09717 5.95801 1.83301 8.22217 1.83301 10.9997C1.83301 13.768 4.09717 16.0413 6.87467 16.0413H8.24967"
        class="stroke-neutral stroke-[0.094rem]"
        stroke-opacity="0.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.33301 11H14.6663"
        class="stroke-neutral stroke-[0.094rem]"
        stroke-opacity="0.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}