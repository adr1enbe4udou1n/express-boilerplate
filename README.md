# Express Boilerplate

> Frontend boilerplate based on Bootstrap for pure showcase/prototype sites

## Install

```shell
yarn
npm start
```

Done !

Web site should be accessible from localhost:3000, port is configurable by `.env` file settings (just copy `.env.example`).

## Structure

1. `assets` -> Contain frontend js and sass files, compiled by webpack and exported to public directory
2. `public` -> Web root directory
3. `routes` -> Express routes
3. `views` -> Handlebars views for HTML layout

## Development

> Assets compilations are now entirely managed by 100% Webpack 2, no need for grunt/gulp/brunch/rollup anymore !

There is 5 command launch type :

1. `npm run dev` -> Just start Webpack compilation only in development mode, CSS and JS are bundled to one big JS file
2. `npm run watch` -> Same as `dev` with Webpack watching enabled for all assets
3. `npm run serve` -> Start directly Express server to development mode, to use jointly with `dev` or `watch` commands
4. `npm run hot` -> Same as `watch` with seamless integration with Express server for hot js and css reloading support enabled
5. `npm run production` -> Launch Webpack compilation in production mode, including export to dedicated `dist` public folder with chunked hash added to files for cache busting, separate JS and CSS, and minifying
6. `npm start` -> Start directly Express server to production mode

## License

This project is open-sourced software licensed under the [MIT license](https://adr1enbe4udou1n.mit-license.org).
