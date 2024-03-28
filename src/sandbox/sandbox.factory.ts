const createFrameContent = (cspConfiguration: string) => `
  <head>
    <meta http-equiv="Content-Security-Policy" content=${cspConfiguration}>
  </head>
  <body></body>
`;

export const createSandbox = (cspConfiguration: string) => {
  const iframe = document.createElement("iframe");
  iframe.setAttribute("sandbox", "allow-scripts allow-same-origin");
  iframe.style.display = "none";
  iframe.src = "about:blank";

  iframe.addEventListener("load", () => {
    if (iframe.contentWindow === null) {
      throw new Error("contentWindow is not defined");
    }

    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(createFrameContent(cspConfiguration));
    iframe.contentWindow.document.close();
  });

  return iframe;
};
