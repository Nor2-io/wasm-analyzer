import { JSXElement } from "solid-js";
import { twMerge } from "tailwind-merge";
import { SolidMarkdown } from "solid-markdown";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import rehypeHighlight from "rehype-highlight";
import { Link } from "./Link";
import { H1 } from "./H1";
import { H2 } from "./H2";
import { H3 } from "./H3";
import { TClassList } from "./types";

export interface MarkdownProps {
  markdown?: string;
  class?: string;
  classList?: TClassList;
}

export function Markdown(props: MarkdownProps): JSXElement {
  return (
    <div
      class={twMerge("w-full text-neutral pb-8", props.class)}
      classList={props.classList}
    >
      <SolidMarkdown
        children={props.markdown}
        linkTarget={"_blank"}
        transformLinkUri={(href: string) => href}
        remarkPlugins={[[remarkGfm]]}
        rehypePlugins={[[rehypeHighlight(), { detect: true }]]}
        skipHtml={false}
        transformImageUri={(src: string) => src}
        unwrapDisallowed={true}
        components={{
          h1(props) {
            return <H1>{props.children}</H1>;
          },
          h2(props) {
            return (
              <H2 class="border-b mb-6 pb-2 border-neutral-40">
                {props.children}
              </H2>
            );
          },
          h3(props) {
            return <H3>{props.children}</H3>;
          },
          a(props) {
            return (
              <Link class={props.class} classList={props.classList}>
                {props.children}
              </Link>
            );
          },
          hr(props) {
            return <hr class="my-6 border-2 border-neutral-40" />;
          },
          ul(props) {
            return <ul class="list-disc ml-8 my-4">{props.children}</ul>;
          },
          li(props) {
            return <li class="my-2">{props.children}</li>;
          },
        }}
      />
    </div>
  );
}
