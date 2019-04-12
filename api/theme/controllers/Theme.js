'use strict';

/**
 * Theme.js controller
 *
 * @description: A set of functions called "actions" for managing `Theme`.
 */

module.exports = {

  /**
   * Retrieve theme records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.theme.search(ctx.query);
    } else {
      return strapi.services.theme.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a theme record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.theme.fetch(ctx.params);
  },

  /**
   * Count theme records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.theme.count(ctx.query);
  },

  /**
   * Create a/an theme record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.theme.add(ctx.request.body);
  },

  /**
   * Update a/an theme record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.theme.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an theme record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.theme.remove(ctx.params);
  }
};
