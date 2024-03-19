export enum ResourceType {
  SCRIPT = "script",
  IMAGE = "image",
  AUDIO = "audio",
  VIDEO = "video",
  IFRAME = "iframe",
  STYLE = "style",
  FETCH = "fetch",
  FONT = "font",
  WEB_SOCKET = "web-socket",
}

export const ResourceToDirectiveMapping: Record<ResourceType, string> = {
  [ResourceType.SCRIPT]: "script-src",
  [ResourceType.IMAGE]: "img-src",
  [ResourceType.AUDIO]: "media-src",
  [ResourceType.VIDEO]: "media-src",
  [ResourceType.IFRAME]: "frame-src",
  [ResourceType.STYLE]: "style-src",
  [ResourceType.FETCH]: "connect-src",
  [ResourceType.FONT]: "font-src",
  [ResourceType.WEB_SOCKET]: "connect-src",
} as const;

export type Directive =
  (typeof ResourceToDirectiveMapping)[keyof typeof ResourceToDirectiveMapping];

export type DocumentWithDefaultView = Document & {
  defaultView: Window & typeof globalThis;
};

export type ResourceFactory = (
  document: DocumentWithDefaultView,
  url: string,
  options?: BaseResourceFactoryOptions,
) => Promise<void>;

export const DEFAULT_MAX_RESOURCE_LOADING_TIME = 5000;

export type BaseResourceFactoryOptions = {
  maxResourceLoadingTime?: number;
};
