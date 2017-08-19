# Express Boilerplate

> Frontend boilerplate based on Bootstrap 4 (beta) for pure showcase/prototype sites. It's based on Express for server routing, Nunjucks as template engine with support of `extend` and `block` helpers for flexible layout design, and finally Webpack for assets management.

## Frontend sample features

* HTML5 boilerplate with basic home-about-contact pages
* Bootstrap 4 beta
* Slick Carrousel
* Sweet Alert 2
* Vue.js components

## Quick start

```shell
yarn
npm start
```

Just as easy !
Web site should be accessible from localhost:3000.
Port is configurable by `.env` file settings (just copy `.env.example`).

## Structure

* `assets`
Contains frontend js and sass files, compiled by webpack and exported to public directory. Vue components are settled inside js/components directory.

* `public`
Public web root directory. Assets are outputted inside this directory.

* `routes`
Express routes with basic actions callbacks, it's up to you if you prefer dedicated controllers classes outside.

* `views`
Nunjucks views for HTML layout, with support of `partials`, `extend` and `block` theming.

* `app.js`
Express app initialization (routes, middlewares, etc.).

* `hbs.js`
Nunjucks settings with his helpers (extend, block, active_route, etc.), feel free to add any custom helpers.

* `gulpfile.js`
Traditional Gulpfile for specific development tasks as launch webpack and serve express dev mode. Assets are entirely managed by Webpack.

* `webpack.config.js`
And of course Webpack configuration file for all assets management, with dev and production environment support.

## Development

NB : Though assets are fully compiled by webpack, Gulp is still used for server-side livereload support.

### Commands

* `yarn dev`
Start Webpack assets compilation in development mode. CSS file is extracted from JS and main vendors as loadash, jquery, vue, etc. are splitted into sperated vendor.js file. This is useful for keep them cached after each application updates for end users.

* `yarn watch`
Start Express server to development mode with server-side livereload support. Webpack watcher is launched for autoreloading when assets are updated.
Furthermore, Browsersync server is used for synchronization across multiple devices and CSS injection support. Default dev port is 7000 and is configurable with environment file by `BROWSERSYNC_PORT` variable.

* `yarn hot`
Serve Express server through Webpack Dev Server with [hot module replacement](https://webpack.js.org/concepts/hot-module-replacement/) support. This is very useful for vue components which can be hot reloaded without losing client state.
CSS are bundled into the app.js file in order to include CSS hot reload. Browsersync is still used as a superset of Webpack Dev Server. Default Webpack dev port is 5000 and can be customized with `WEBPACKDEVSERVER_PORT` variable.

* `yarn prod`
Launch Webpack assets compilation in production mode, including extraction of separated CSS file, minifying and export to dedicated `dist` public folder with chunked hash added to files for cache busting.

* `yarn start`
Start directly Express server for production environment. In this mode, Express will use optimized assets. So don't forget to compile them for production before if you want serve last updated versions of static files.

### Assets management

Because assets bundling are now only managed by Webpack, all configuration take place in the traditional `webpack.config.js` file. Feel free to edit this file as you want.

Current used main loaders and plugins :
* `babel-loader` for ES2015 transpilation
* `extract-text-webpack-plugin` for CSS file extraction, only used in production mode in order to keep HMR working for CSS while developing
* `sass-loader`
* `vue-loader` for vue components compilations with HMR support
* `img-loader` for image web optimization (mozjpeg, pngquant,...)

### External device sync (mobile, tablet, etc.)

You must explicitly set BROWSERSYNC_HOST variable to a valid external IP in order to support server livereload + HMR for external devices.

## License

This project is open-sourced software licensed under the [MIT license](https://adr1enbe4udou1n.mit-license.org).
