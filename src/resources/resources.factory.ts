import {
  ResourceFactory,
  DocumentWithDefaultView,
  DEFAULT_MAX_RESOURCE_LOADING_TIME,
  ResourceType,
  BaseResourceFactoryOptions,
} from "./resources.domain";
import { configureElement, createCspError } from "./resource.util";

const createCommonFactory =
  (tag: "script" | "img" | "audio" | "iframe" | "video"): ResourceFactory =>
  (
    document: DocumentWithDefaultView,
    url: string,
    options?: BaseResourceFactoryOptions,
  ): Promise<void> =>
    new Promise((resolve, reject) => {
      const element = document.createElement(tag);
      element.src = url;

      configureElement({
        resolve,
        reject,
        element,
        document,
        maxResourceLoadingTime: options?.maxResourceLoadingTime,
      });
    });

const fetchFactory: ResourceFactory = (
  document: DocumentWithDefaultView,
  url: string,
  options?: BaseResourceFactoryOptions,
): Promise<void> =>
  new Promise((resolve, reject) => {
    document.defaultView.fetch(url);
    setTimeout(
      resolve,
      options?.maxResourceLoadingTime || DEFAULT_MAX_RESOURCE_LOADING_TIME,
    );

    document.defaultView.addEventListener("securitypolicyviolation", () =>
      reject(createCspError()),
    );
  });

const webSocketFactory: ResourceFactory = (
  document: DocumentWithDefaultView,
  url: string,
  options?: BaseResourceFactoryOptions,
): Promise<void> =>
  new Promise((resolve, reject) => {
    const ws = new document.defaultView.WebSocket(url);
    setTimeout(
      resolve,
      options?.maxResourceLoadingTime || DEFAULT_MAX_RESOURCE_LOADING_TIME,
    );

    ws.addEventListener("open", () => resolve());
    ws.addEventListener("error", () => reject(createCspError()));
  });

const styleFactory: ResourceFactory = (
  document: DocumentWithDefaultView,
  url: string,
  options?: BaseResourceFactoryOptions,
): Promise<void> =>
  new Promise((resolve, reject) => {
    const element = document.createElement("link");
    element.rel = "stylesheet";
    element.href = url;

    configureElement({
      resolve,
      reject,
      element,
      document,
      maxResourceLoadingTime: options?.maxResourceLoadingTime,
    });
  });

const fontFactory: ResourceFactory = (
  document: DocumentWithDefaultView,
  url: string,
  options?: BaseResourceFactoryOptions,
): Promise<void> =>
  new Promise((resolve, reject) => {
    const element = document.createElement("style");
    element.textContent = `@font-face { font-family: 'CspCheckerFont'; src: url('${url}'); }`;

    configureElement({
      resolve,
      reject,
      element,
      document,
      maxResourceLoadingTime: options?.maxResourceLoadingTime,
    });
  });

export const createResourceFactory = () => {
  const factories = {
    [ResourceType.AUDIO]: createCommonFactory("audio"),
    [ResourceType.FETCH]: fetchFactory,
    [ResourceType.FONT]: fontFactory,
    [ResourceType.IFRAME]: createCommonFactory("iframe"),
    [ResourceType.IMAGE]: createCommonFactory("img"),
    [ResourceType.SCRIPT]: createCommonFactory("script"),
    [ResourceType.STYLE]: styleFactory,
    [ResourceType.VIDEO]: createCommonFactory("video"),
    [ResourceType.WEB_SOCKET]: webSocketFactory,
  };

  return (resourceType: ResourceType) => factories[resourceType];
};
