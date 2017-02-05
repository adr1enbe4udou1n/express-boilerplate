const hbs = require('hbs');

module.exports = function (app) {
  hbs.localsAsTemplateData(app.request);
  hbs.registerPartials(__dirname + '/views/partials');

  let blocks = {};

  hbs.registerHelper('extend', function (name, context) {
    let block = blocks[name];
    if (!block) {
      block = blocks[name] = [];
    }

    block.push(context.fn(this));
  });

  hbs.registerHelper('block', function (name) {
    let val = (blocks[name] || []).join('\n');

    // clear the block
    blocks[name] = [];
    return val;
  });

  hbs.registerHelper('active_route', function (path) {
    return app.locals.path === path ? 'active' : '';
  });

  hbs.registerHelper('manifest', function (name) {
    let manifest = require('./public/assets-manifest.json');
    return '/' + manifest[name];
  });
};
