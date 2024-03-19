import {
  DocumentWithDefaultView,
  DEFAULT_MAX_RESOURCE_LOADING_TIME,
} from "./resources.domain";

type ConfigureElementParams = {
  resolve: () => void;
  reject: (event: SecurityPolicyViolationEvent) => void;
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
  document.addEventListener("securitypolicyviolation", reject);

  document.appendChild(element);
};
