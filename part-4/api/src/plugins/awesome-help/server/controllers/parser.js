'use strict';

module.exports = ({ strapi }) => {
  const parserService = strapi.plugin("awesome-help").service("parserService");
  const parse = async (ctx) => {
    try {
      const entities = await parserService.parse(ctx.query);
      ctx.body = entities;
    }
    catch (exp) {
      throw exp;
    }
  };
  return { parse };
};
