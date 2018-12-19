declare module "@rocu/development" {
  export interface FileWatchFlag {
    filename: string;
  }
}

declare module "@rocu/cli" {
  import { FileWatchFlag } from "@rocu/development";
  export interface Options {
    outDir?: string;
    watcher?: FileWatchFlag;
  }
}

declare module "@rocu/component" {
  export type ElementNames = keyof JSX.IntrinsicElements;
  export type Component = {};
  export type Option = {};
}

declare module "@rocu/page" {
  export interface TwitterMeta {
    "twitter:card"?: "summary" | "summary_large_image";
    "twitter:site"?: string;
  }

  export interface OGP {
    "og:title"?: string;
    "og:description"?: string;
    "og:url"?: string;
    "og:image"?: string;
  }

  export interface HtmlMetaData extends OGP, TwitterMeta {
    lang?: string;
    description?: string;
    keywords?: string;
    title?: string;
    og?: { [key: string]: string };
    twitter?: { [key: string]: string };
    scripts?: string[];
    stylesheets?: string[];
    layout?: string;
    copyright?: string;
    author?: string;
  }

  export interface PageElement {
    content: string;
    metaData: HtmlMetaData;
    ext: string;
    filename: string;
    name: string;
    raw: string;
    layoutJSX?: string;
  }

  export interface RenderedStaticPage {
    name: PageElement["name"];
    html: string;
  }

  export interface Source {
    dirname: string;
    pages: PageElement[];
  }
}
