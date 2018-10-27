# React Framework

*It suggests a way to work with Lazy Loadable components splitting css style for each layout breakpoint.*

## Directory Structure

This configuration has been developed in order to support multiple applications inside the `src>app` directory, each app configured in its own directory. But why? Because each app (SPA) is supposed to be deployed to a CDN (i.e. Google Firebase).

If you are building a MPA it also works if you think of every entry as an isolated app with its own runtime, main and vendors.

```text
|-/src (source code)
  |-/components (sharable components)
  |-/sass (sharable sass styles)
  |-/utils (sharable utilities)
  |-/app (applications)
    |-/app-one
      |-/components
      |-index.js
    |-/app-two
      |-/components
      |-index.js
|-/webpack (webpack configurations)
  |-/helpers
    |-htmlPlugin.js
  |-/utils
    |-paths.js
  |-apps.js (deployable applications)
  |-analyze.config.js (config to analyze prod build)
  |-dll.config.js (DLL config for dev)
  |-common.config.js (common config prod|dev)
  |-dev.config.js (dev config)
  |-prod.config.js (prod config)
```

## Production output

```text
|-/public
  |-/app1
    |-/core-js (polyfills)
    |-/vendors (i.e. React, Redux, Mobx, etc..)
    |-/runtime (App runtime inlined inside index.html)
    |-/app1 (Your main code)
    |-index.html (App entry point)
```

## Webpack configurations

### Common

This configuration contains common modules rules and plugins. This configuration is merged built to be merge with production or development configurations.

### Development

This configuration is splitted in two steps:

#### Dynamic Link Library (DLL)

The DLL is configured to expose your vendors as global variables which can be used in development in order to accelerate recompiling process. So your development configuration only handles source changes.

#### Dev Server

This configuration contains `webpack-dev-server` rules and DLL references used in apps.

### Production

This configuration contains optimizations applied for production.

### Analyze

This configuration allows you to watch how are your app chunks, minimized and gziped.

## NPM scripts

* `dll`: Builds DLL used in development mode.
* `analyze`: Runs a server which will show you how are your app chunks.
* `build:prod`: Builds production assets.
* `start`: Builds your apps for development mode.
* `deploy`: Deploys your app to Google Firebase.
* `test:prod`: Deploys your app to a simulated Google Firebase environment. Just to test your production assets.
* `flow`: Check your source code with flowtype.
