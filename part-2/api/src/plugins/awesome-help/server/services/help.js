'use strict';

module.exports = ({ strapi }) => {
  const query = strapi.db.query('plugin::awesome-help.help');
  const findMany = async (params, populate) => {
    let helpEntities = undefined;
    try {
      helpEntities = query.findMany(params, populate);
    }
    catch (exp) {
      throw new Error(`Help Service: An error occured when get help: ${exp.message}`);
    }
    return helpEntities;
  }
  return {
    findMany
  }
}
