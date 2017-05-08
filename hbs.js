const hbs = require('hbs');
const manifest = require('./public/assets-manifest.json');

module.exports = (app) => {
  hbs.localsAsTemplateData(app.request);
  hbs.registerPartials(`${__dirname}/views/partials`);

  const blocks = {};

  hbs.registerHelper('extend', (name, context) => {
    let block = blocks[name];
    if (!block) {
      blocks[name] = [];
      block = blocks[name];
    }

    block.push(context.fn(this));
  });

  hbs.registerHelper('block', (name) => {
    const val = (blocks[name] || []).join('\n');

    // clear the block
    blocks[name] = [];
    return val;
  });

  hbs.registerHelper('active_route', path => (app.locals.path === path ? 'active' : ''));

  hbs.registerHelper('assets', (name) => {
    if (app.locals.production) {
      return `/${manifest[`/${name}`]}`;
    }

    return `/${name}`;
  });
};
