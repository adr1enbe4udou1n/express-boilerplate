# Express Boilerplate

> Frontend boilerplate based on Bootstrap for pure showcase/prototype sites. It's based on Express for server routing, Handlebars as template engine with support of `extend` and `block` helpers for flexible layout design, and finally Webpack 2 for assets management.

## Frontend sample features

* HTML5 boilerplate with basic home-about-contact pages
* Bootstrap Sass 3
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
Handlebars views for HTML layout, with support of `partials`, `extend` and `block` theming.

* `app.js`  
Express app initialization (routes, middlewares, etc.).

* `hbs.js`  
Handlerbars settings with his helpers (extend, block, active_route, etc.), feel free to add any custom helpers.

* `gulpfile.js`  
Traditional Gulpfile for specific development tasks as launch webpack and serve express dev mode. Assets are entirely managed by Webpack.

* `webpack.config.js`  
And of course Webpack configuration file for all assets management, with dev and production environment support.

## Development

Though there are pure npm scripts for webpack assets compilations, Gulp is still essential in order to launch Express with livereload support. Install it globally with `npm i -g gulp`.

### Commands

* `npm run dev`, alias `gulp dev`  
Start Webpack assets compilation in development mode. CSS file is extracted from JS and main vendors as loadash, jquery, vue, etc. are splitted into sperated vendor.js file. This is useful for keep them cached after each application updates for end users.

* `npm run watch`, alias `gulp watch`  
Same as `dev` but with Webpack watcher enabled for frontend assets.

* `gulp serve`  
Start Express server to development mode with server-side livereload support. Webpack watcher is also launched for autoreloading when assets are updated.  

* `gulp bs`  
Same as above but with additional Browsersync server for synchronization across multiple devices and CSS injection support. Default dev port is 7000 and is configurable with environment file by BROWSERSYNC_PORT variable.

* `gulp hmr`  
Serve Express server through Webpack Dev Server with [hot module replacement](https://webpack.js.org/concepts/hot-module-replacement/) support. This is very useful for vue components which can be hot reloaded without losing client state.  
CSS are bundled into the app.js file in order to include CSS hot reload. Browsersync is used as a superset of Webpack Dev Server. Default Webpack dev port is 5000 and can be customized with WEBPACKDEVSERVER_PORT variable.

* `npm run production`, alias `gulp production`  
Launch Webpack assets compilation in production mode, including extraction of separated CSS file, minifying and export to dedicated `dist` public folder with chunked hash added to files for cache busting.

* `npm start`  
Start directly Express server for production environment. In this mode, Express will use optimized assets. So don't forget to compile them for production before if you want serve last updated versions of static files.

### Assets management

Because assets bundling are now only managed by Webpack, all configuration take place in the traditional `webpack.config.js` file. Feel free to edit this file as you want.

Current used main loaders and plugins :
* `babel-loader` for ES2015 transpilation
* `extract-text-webpack-plugin` for CSS file extraction, only used in production mode in order to keep HMR working for CSS while developing
* `postcss-loader` with `autoprefixer`
* `sass-loader`
* `vue-loader` for vue components compilations with HMR support

## License

This project is open-sourced software licensed under the [MIT license](https://adr1enbe4udou1n.mit-license.org).
