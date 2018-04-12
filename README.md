# Express Boilerplate

> Frontend boilerplate based on Bootstrap 4, Express for server routing, Nunjucks as server template engine, and finally Webpack for assets management.

## Frontend features

* HTML5 boilerplate with basic home-about-contact pages
* Bootstrap 4 beta
* Slick Carrousel
* Sweet Alert 2
* Vue.js

## Quick start

```shell
yarn
yarn start
```

Just as easy !
Web site should be accessible from localhost:3000.
Port is configurable by `.env` file settings (just copy `.env.example`).

## Structure

* `assets`
Contains frontend js and sass files, compiled by webpack and exported to public directory. Vue components are settled inside js/components directory.

* `public`
Public web root directory where assets are outputted.

* `routes`
Express routes with basic actions callbacks, it's up to you if you prefer dedicated controllers classes outside.

* `views`
Nunjucks views for HTML layout, with support of `partials`, `extend` and `block` theming.

* `app.js`
Express app initialization (routes, middlewares, etc.).

* `gulpfile.js`
Traditional Gulpfile which serve express in dev mode with server-side livereload.

* `webpack.config.js`
Webpack configuration file for all assets management.

## Development

### Commands

* `yarn build`
Start Webpack assets compilation in development mode. CSS file is extracted from JS and main vendors as loadash, jquery, vue, etc. are splitted into sperated vendor.js file. This is useful for keep them cached after each application updates for end users.

* `yarn watch`
Start Express server to development mode with server-side livereload support. Webpack watcher is enabled for recompiling when assets are updated.

* `yarn dev`
Use Webpack Dev Server with [hot module replacement](https://webpack.js.org/concepts/hot-module-replacement/) support. In this mode, CSS are bundled into the app.js file for CSS hot reload. Default Webpack dev port is 8080 and can be customized with `DEV_SERVER_PORT` variable.

* `yarn prod`
Launch Webpack assets compilation in production mode, including extraction of separated CSS file, minifying and export to dedicated `dist` public folder with chunked hash added to files for cache busting.

* `yarn start`
Start directly Express server for production environment. In this mode, Express will use optimized assets. So don't forget to compile them for production before if you want serve last updated versions of static files.

## License

This project is open-sourced software licensed under the [MIT license](https://adr1enbe4udou1n.mit-license.org).
