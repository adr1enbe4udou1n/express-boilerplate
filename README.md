# Express Boilerplate

> Frontend boilerplate based on Bootstrap for pure showcase/prototype sites. It's based on Express for server routing, Handlebars as rendering views engine with support of `extend` and `block` helpers for flexible layout design, and finally Webpack 2 for assets management.

## Frontend sample features

* HTML5 boilerplate with basic home-about-contact pages
* Bootstrap Sass 3
* Slick Carrousel
* Sweet Alert 2

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
Contains frontend js and sass files, compiled by webpack and exported to public directory.

* `public`  
Public web root directory. Assets are outputted inside this directory.

* `routes`  
Express routes with basic actions callbacks, it's up to you if you prefer dedicated controllers classes outside.

* `views`  
Handlebars views for HTML layout, with support of `partials`, `extend` and `block` theming.

* `app.js`  
Express app initialization (routes, middlewares, etc.).

* `hbs.js`  
Handlerbars settings with his helpers (extend, block, active_route, etc.), feel free to add everything you want.

* `gulpfile.js`  
Traditional Gulpfile, now only used for server-side livereload support, which can only working with good reliability thanks to Gulp. Assets are now entirely managed by Webpack.

* `webpack.config.js`  
And of course Webpack configuration file for all assets management, with dev and production environment support.

## Development

### Launcher commands

* `npm run dev`  
Just start Webpack assets compilation in development mode. CSS and JS are bundled into one super heavy JS file.

* `npm run watch`  
Same as `dev` but with Webpack watcher enabled for frontend assets.

* `npm run serve`  
Start Express server to development mode with Gulp for server-side livereload support. So don't forget to install it globally before with `npm i -g gulp`. You should use this `serve` command in conjunction with `dev` or `watch` in order to include assets reloading.

* `npm run hot`  
Same as `serve` but with seamless webpack integration with Express server in order to support [hot module replacement](https://webpack.js.org/concepts/hot-module-replacement/).

* `npm run production`  
Launch Webpack assets compilation in production mode, including extraction of separated CSS file, minifying and export to dedicated `dist` public folder with chunked hash added to files for cache busting.

* `npm start`  
Start directly Express server for production environment. In this mode, Express will use optimized assets. So don't forget to compile them for production before if you want serve last updated versions of static files. 

### Assets management

Because assets bundling are now only managed by Webpack, all configuration take place in the traditional `webpack.config.js` file. Feel free to edit this file as you want.

Current used main loaders and plugins :
* `babel-loader` for ES2015 transpilation
* `copy-webpack-plugin` for fonts and images vendors copy
* `extract-text-webpack-plugin` for CSS file extraction, only used in production mode in order to keep HMR working for CSS while developing
* `postcss-loader` with `autoprefixer`
* `sass-loader`

## License

This project is open-sourced software licensed under the [MIT license](https://adr1enbe4udou1n.mit-license.org).
