import { ResourceToDirectiveMapping, ResourceType } from "../resources";

type IsSelfDirectiveSatisfiedOptions = {
  originUrl: string;
  resourceUrl: string;
  resourceType: ResourceType;
};

export const createIsSelfDirectiveSatisfied = (cspConfiguration: string) => {
  const cspDirectives = cspConfiguration.split(";");

  return ({
    originUrl: originUrlString,
    resourceUrl: resourceUrlString,
    resourceType,
  }: IsSelfDirectiveSatisfiedOptions) => {
    try {
      const originUrl = new URL(originUrlString);
      const resourceUrl = new URL(resourceUrlString);

      const directiveToCheck = ResourceToDirectiveMapping[resourceType];

      const isSelfDirectivePresent = cspDirectives.some((directive) => {
        const [key, values] = directive.trim().split(" ");

        return key === directiveToCheck && values.includes("'self'");
      });

      if (!isSelfDirectivePresent) {
        return false;
      }

      return (
        originUrl.protocol === resourceUrl.protocol &&
        originUrl.hostname === resourceUrl.hostname &&
        originUrl.port === resourceUrl.port
      );
    } catch {
      return false;
    }
  };
};
