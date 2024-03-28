# CSP Checker Library

## Overview

The CSP Checker Library is designed to assist in testing and validating Content Security Policy (CSP). By dynamically loading resources and observing the resulting behaviors, the library helps in identifying whether the CSP settings are correctly enforced. It supports various resource types, including scripts, images, audio, video, iframes, styles, fetch requests, fonts, and WebSockets, offering a comprehensive testing suite for CSP configurations.

## Features

- **Comprehensive Resource Support**: Test a wide range of resource types (e.g., script, image, audio, video, iframe, style, fetch, font, WebSocket).
- **Customizable Loading Time**: Configure maximum resource loading time to simulate different network conditions.
- **CSP Violation Detection**: Automatically detect and report CSP violations using built-in error handling.
- **Sandboxing**: Utilize iframe-based sandboxing to isolate tests and ensure clean testing environments.

## Installation

To integrate the CSP Checker Library into your project, copy the provided source files into your project's directory structure. Ensure the source files are correctly referenced within your project to enable seamless integration.

## Usage

### Creating a CSP Checker

```javascript
const cspConfiguration =
  "default-src 'self'; img-src 'self' https://example.com;";
const check = createChecker(cspConfiguration);
```

### Testing Resource Loading

```javascript
// Define the URL and resource type to test
const url = "https://example.com/test-image.jpg";
const resourceType = ResourceType.IMAGE;

// Optional: Define additional check options
const options = {
  maxResourceLoadingTime: 3000, // milliseconds
};

// Perform the check
check(url, resourceType, options)
  .then((isAllowed) => {
    if (isAllowed) {
      console.log(
        "Resource can be loaded under the current CSP configuration.",
      );
    } else {
      console.log("Resource cannot be loaded due to CSP restrictions.");
    }
  })
  .catch((error) => {
    console.error("Error occurred during the check:", error);
  });
```

## Supported Resource Types

The library supports testing the following resource types:

- SCRIPT
- IMAGE
- AUDIO
- VIDEO
- IFRAME
- STYLE
- FETCH
- FONT
- WEB_SOCKET

## Contributing

We welcome contributions to the CSP Checker Library! Whether it's adding new features, improving existing ones, or reporting bugs, your input is valuable. Please follow the standard GitHub pull request process to submit your contributions.

## License

The CSP Checker Library is open-source software licensed under the [MIT license](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute it as per the license terms.
