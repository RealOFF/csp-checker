import { describe, it, expect } from "vitest";
import { createSandbox } from "./sandbox.factory";

describe("createSandbox Tests", () => {
  it("returns an iframe element", () => {
    const iframe = createSandbox('default-src "self"');

    expect(iframe.tagName).toBe("IFRAME");
  });

  it("sets sandbox attributes correctly", () => {
    const iframe = createSandbox('default-src "self"');

    expect(iframe.getAttribute("sandbox")).toBe(
      "allow-scripts allow-same-origin",
    );
  });

  it("hides the iframe using display style", () => {
    const iframe = createSandbox('default-src "self"');

    expect(iframe.style.display).toBe("none");
  });
});
