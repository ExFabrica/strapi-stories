'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('awesome-help')
      .service('myService')
      .getWelcomeMessage();
  },
};
