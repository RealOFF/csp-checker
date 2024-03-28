import { createSandbox } from "./sandbox";
import {
  createResourceFactory,
  ResourceType,
  DocumentWithDefaultView,
  BaseResourceFactoryOptions,
  isCspError,
} from "./resources";

type CheckOptions = BaseResourceFactoryOptions;

export const createChecker = (cspConfiguration: string) => {
  const createResource = createResourceFactory();

  return async (
    url: string,
    resourceType: ResourceType,
    options: CheckOptions,
  ) => {
    const sandbox = createSandbox(cspConfiguration);
    document.body.appendChild(sandbox);

    if (!sandbox.contentWindow) {
      throw new Error("contentWindow is not defined");
    }

    try {
      await createResource(resourceType)(
        sandbox.contentWindow.document as DocumentWithDefaultView,
        url,
        options,
      );

      return true;
    } catch (error: unknown) {
      if (!(error instanceof Error)) {
        throw error;
      }

      if (isCspError(error)) {
        return false;
      } else {
        throw error;
      }
    }
  };
};
