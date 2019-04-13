'use strict';

/**
 * Activetp.js controller
 *
 * @description: A set of functions called "actions" for managing `Activetp`.
 */

module.exports = {

  /**
   * Retrieve activetp records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.activetp.search(ctx.query);
    } else {
      return strapi.services.activetp.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a activetp record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.activetp.fetch(ctx.params);
  },

  /**
   * Count activetp records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.activetp.count(ctx.query);
  },

  /**
   * Create a/an activetp record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.activetp.add(ctx.request.body);
  },

  /**
   * Update a/an activetp record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.activetp.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an activetp record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.activetp.remove(ctx.params);
  }
};
