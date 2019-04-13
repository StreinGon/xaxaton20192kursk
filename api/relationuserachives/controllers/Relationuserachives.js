"use strict";

/**
 * Relationuserachives.js controller
 *
 * @description: A set of functions called "actions" for managing `Relationuserachives`.
 */

module.exports = {
  /**
   * Retrieve relationuserachives records.
   *
   * @return {Object|Array}
   */

  find: async ctx => {
    if (ctx.query._q) {
      return strapi.services.relationuserachives.search(ctx.query);
    } else {
      return strapi.services.relationuserachives.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a relationuserachives record.
   *
   * @return {Object}
   */

  findOne: async ctx => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.relationuserachives.fetch(ctx.params);
  },

  /**
   * Count relationuserachives records.
   *
   * @return {Number}
   */

  count: async ctx => {
    return strapi.services.relationuserachives.count(ctx.query);
  },

  /**
   * Create a/an relationuserachives record.
   *
   * @return {Object}
   */

  create: async ctx => {
    return strapi.services.relationuserachives.add(ctx.request.body);
  },

  /**
   * Update a/an relationuserachives record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.relationuserachives.edit(
      ctx.params,
      ctx.request.body
    );
  },

  /**
   * Destroy a/an relationuserachives record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.relationuserachives.remove(ctx.params);
  },

  delete: async (ctx, next) => {
    return strapi.services.relationuserachives.remove(ctx.params);
  }
};
