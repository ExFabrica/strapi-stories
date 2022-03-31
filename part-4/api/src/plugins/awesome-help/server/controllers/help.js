'use strict';

module.exports = ({ strapi }) => {
  const helpService = strapi.plugin("awesome-help").service("helpService");
  const findMany = async (ctx) => {
    try {
      const entities = await helpService.findMany(ctx.query);
      ctx.body = entities;
    }
    catch (exp) {
      throw exp;
    }
  };
  return { findMany };
};
