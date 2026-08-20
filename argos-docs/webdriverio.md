# WebdriverIO

Integrating Argos with your [WebdriverIO](https://webdriver.io/) tests to enable visual testing on your application.

### Get started

Please refer to our [Quickstart guide](webdriverio-quickstart.md) to get started with Argos and WebdriverIO.

### API Overview

#### argosScreenshot(browser, name\[, options])

* `browser` - A `WebdriverIO.Browser` instance
* `name` - The screenshot name; must be unique. If it ends with `.png` it is treated as a path.
* `options` - Options
  * `options.mask` - Specify areas that should be masked when the screenshot is taken. Masked elements will be overlaid with a pink box #FF00FF (customizable with `maskColor`) that completely covers its bounding box.
  * `options.maskColor` - Specify the color of the overlay box for masked elements, in CSS color format. Default color is pink `#FF00FF`.

### Additional Resources

* [Quickstart with Argos + WebdriverIO](webdriverio-quickstart.md)
* [@argos-ci/webdriverio on GitHub](https://github.com/argos-ci/argos-javascript/tree/main/packages/webdriverio)
* [@argos-ci/webdriverio on npm](https://www.npmjs.com/package/@argos-ci/webdriverio)
