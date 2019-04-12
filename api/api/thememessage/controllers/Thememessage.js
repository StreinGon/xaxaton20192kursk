"use strict";

/**
 * Thememessage.js controller
 *
 * @description: A set of functions called "actions" for managing `Thememessage`.
 */

module.exports = {
  /**
   * Retrieve thememessage records.
   *
   * @return {Object|Array}
   */

  find: async ctx => {
    if (ctx.query._q) {
      return strapi.services.thememessage.search(ctx.query);
    } else {
      return strapi.services.thememessage.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a thememessage record.
   *
   * @return {Object}
   */

  findOne: async ctx => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.thememessage.fetch(ctx.params);
  },

  /**
   * Count thememessage records.
   *
   * @return {Number}
   */

  count: async ctx => {
    return strapi.services.thememessage.count(ctx.query);
  },

  /**
   * Create a/an thememessage record.
   *
   * @return {Object}
   */

  create: async ctx => {
    return strapi.services.thememessage.add(ctx.request.body);
  },

  /**
   * Update a/an thememessage record.
   *
   * @return {Object}
   */

  update: async ctx => {
    return strapi.services.thememessage.edit(ctx.params, ctx.request.body);
  },

  /**
   * Destroy a/an thememessage record.
   *
   * @return {Object}
   */

  destroy: async ctx => {
    return strapi.services.thememessage.remove(ctx.params);
  }
};
