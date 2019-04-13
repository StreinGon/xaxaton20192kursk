'use strict';

/**
 * Availabletp.js controller
 *
 * @description: A set of functions called "actions" for managing `Availabletp`.
 */

module.exports = {

  /**
   * Retrieve availabletp records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.availabletp.search(ctx.query);
    } else {
      return strapi.services.availabletp.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a availabletp record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.availabletp.fetch(ctx.params);
  },

  /**
   * Count availabletp records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.availabletp.count(ctx.query);
  },

  /**
   * Create a/an availabletp record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.availabletp.add(ctx.request.body);
  },

  /**
   * Update a/an availabletp record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.availabletp.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an availabletp record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.availabletp.remove(ctx.params);
  }
};
