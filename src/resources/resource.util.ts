import {
  DocumentWithDefaultView,
  DEFAULT_MAX_RESOURCE_LOADING_TIME,
} from "./resources.domain";

type ConfigureElementParams = {
  resolve: () => void;
  reject: (error: CspError) => void;
  element: HTMLElement;
  document: DocumentWithDefaultView;
  maxResourceLoadingTime?: number;
};

export const configureElement = ({
  resolve,
  reject,
  element,
  document,
  maxResourceLoadingTime = DEFAULT_MAX_RESOURCE_LOADING_TIME,
}: ConfigureElementParams) => {
  setTimeout(resolve, maxResourceLoadingTime);
  document.addEventListener("securitypolicyviolation", () =>
    reject(createCspError()),
  );

  document.appendChild(element);
};

const CSP_ERROR_MESSAGE = "CSP_ERROR_MESSAGE";

type CspError = {} & Error;

export const createCspError = (): CspError => new Error(CSP_ERROR_MESSAGE);

export const isCspError = (error: Error): error is CspError =>
  error.message === CSP_ERROR_MESSAGE;
