'use strict';

module.exports = ({ strapi }) => {
  const parserService = strapi.plugin("awesome-help").service("parserService");
  const parse = async (ctx) => {
    try {
      await parserService.parse(ctx.query);
      ctx.body = { done: true };
    }
    catch (exp) {
      throw exp;
    }
  };
  const check = async (ctx) => {
    try {
      const result = await parserService.checkStructureHasChanged(ctx.query);
      ctx.body = { structureHasChanged: result };
    }
    catch (exp) {
      throw exp;
    }
  };
  return {
    parse,
    check
  };
};
