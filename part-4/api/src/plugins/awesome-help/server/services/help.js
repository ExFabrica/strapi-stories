'use strict';

module.exports = ({ strapi }) => {
  const findMany = async (params, populate) => {
    let helpEntities = undefined;
    try {
      helpEntities = await query.findMany(params, populate);
    }
    catch (exp) {
      throw new Error(`Help Service: An error occured when get help: ${exp.message}`);
    }
    return helpEntities;
  };
  return {
    findMany
  }
}
