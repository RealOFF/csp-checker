import { createSandbox } from "./sandbox";
import {
  createResourceFactory,
  ResourceType,
  DocumentWithDefaultView,
} from "./resources";

export const createChecker = (cspConfiguration: string) => {
  const createResource = createResourceFactory();

  return (url: string, resourceType: ResourceType) => {
    const sandbox = createSandbox(cspConfiguration);
    document.body.appendChild(sandbox);

    if (!sandbox.contentWindow) {
      throw new Error("contentWindow is not defined");
    }

    createResource(resourceType)(
      sandbox.contentWindow.document as DocumentWithDefaultView,
      url,
    );
  };
};
