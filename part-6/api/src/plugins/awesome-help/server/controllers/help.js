'use strict';

module.exports = ({ strapi }) => {
  const helpService = strapi.plugin("awesome-help").service("helpService");
  const settingsService = strapi.plugin("awesome-help").service("settingsService");
  const findMany = async (ctx) => {
    try {
      ctx.body = await helpService.findMany(ctx.query);
    }
    catch (exp) {
      throw exp;
    }
  };
  const findManyByContentType = async (ctx) => {
    const { slug } = ctx.params;
    const settings = await settingsService.getSettings();
    try {
      ctx.body = settings.enabled ? await helpService.findMany({
        where: {
          $and: [
            { contentType: { $eq: slug } },
            { helpContent: { $not: "" }, }
          ]
        }
      }) : [];
    }
    catch (exp) {
      throw exp;
    }
  };
  const update = async (ctx) => {
    const { body } = ctx.request;
    try {
      ctx.body = await helpService.update(body);
    }
    catch (err) {
      ctx.throw(500, err);
    }
  };
  return {
    findMany,
    findManyByContentType,
    update
  };
};
