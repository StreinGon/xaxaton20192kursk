'use strict';

/**
 * User.js controller
 *
 * @description: A set of functions called "actions" for managing `User`.
 */

module.exports = {
  setAvatar: async ctx => {
    if (ctx.query._q) {
      return strapi.services.thememessage.search(ctx.query);
    } else {
      return strapi.services.thememessage.fetchAll(ctx.query);
    }
  }
};
