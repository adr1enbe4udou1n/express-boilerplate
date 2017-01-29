# Express Boilerplate

> Frontend boilerplate based on Bootstrap for pure showcase/prototype sites, based on Express for server routing, Handlebars for views templating with support of extend and block notions, and finally Webpack 2 for assets management.

### Frontend basic features

1. HTML5 boilerplate with basic home-about-contact pages
1. Bootstrap Sass 3
2. Slick Carrousel
3. Sweet Alert 2

## Quick start

```shell
yarn
npm start
```

Just as easy !  
Web site should be accessible from localhost:3000  
Port is configurable by `.env` file settings (just copy `.env.example`).

## Structure

1. `assets`  
Contains frontend js and sass files, compiled by webpack and exported to public directory.

2. `public`  
Public web root directory. Assets are outputted inside this directory.

3. `routes`  
Express routes with basic actions callbacks, it's up to you if you prefer dedicated controllers classes outside
4. `views`  
Handlebars views for HTML layout, with support of `partials`, `extend` and `block` theming

5. `app.js`  
Express app initialization (routes, middlewares, etc.)

6. `hbs.js`  
Handlerbars settings with his helpers (extend, block, active_route, etc.), feel free to add everything you want

7. `gulpfile.js`  
Traditional Gulpfile, now only used for server-side livereload support, which can only working with good reliability thanks to Gulp. Assets are now entirely managed by Webpack

8. `webpack.config.js`  
And of course Webpack configuration file for all assets management, with dev and production environment support

## Development

### Launcher commands

1. `npm run dev`  
Just start Webpack assets compilation in development mode. CSS and JS are bundled into one super heavy JS file.

2. `npm run watch`  
Same as `dev` but with Webpack watcher enabled for frontend assets.

3. `npm run serve`  
Start Express server to development mode with Gulp for server-side livereload support. So don't forget to install it globally before with `npm i -g gulp`. You should use this `serve` command in conjunction with `dev` or `watch` in order to include assets reloading.

4. `npm run hot`  
Same as `serve` but with seamless webpack integration with Express server in order to support [hot module replacement](https://webpack.js.org/concepts/hot-module-replacement/).

5. `npm run production`  
Launch Webpack assets compilation in production mode, including extraction of separated CSS file, minifying and export to dedicated `dist` public folder with chunked hash added to files for cache busting.

6. `npm start`  
Start directly Express server for production environment. In this mode, Express will use optimized assets. So don't forget to compile them for production before if you want serve last updated versions of static files. 

### Assets management

Because assets bundling are now only managed by Webpack, all configuration take place in the traditional `webpack.config.js` file. Feel free to edit this file as you want.

Current used main loaders and plugins :
1. `babel-loader` for ES2015 transpilation
2. `copy-webpack-plugin` for fonts and images vendors copy
3. `extract-text-webpack-plugin` for CSS file extraction, only used in production mode in order to keep HMR working for CSS while developing
4. `postcss-loader` with `autoprefixer`
5. `sass-loader`

## License

This project is open-sourced software licensed under the [MIT license](https://adr1enbe4udou1n.mit-license.org).
