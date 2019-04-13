"use strict";

/**
 * Achives.js controller
 *
 * @description: A set of functions called "actions" for managing `Achives`.
 */

module.exports = {
  /**
   * Retrieve use achives records by email.
   *
   * @return {Array}
   */
  getAchives: async ctx => {
    if (ctx.request.query.email) {
      return strapi.plugins["users-permissions"].models.user
        .findOne({ email: ctx.request.query.email })
        .then(user => {
          if (!user) {
            return ctx.badRequest("User not found");
          }
          return Relationuserachives.find({
            user: user.id
          })
            .populate("achives")
            .then(data => {
              if (!data) {
              }
              return ctx.send({ msg: "Added", data: { user, data } });
            });
        });
    }
    return ctx.badRequest("Please provide email");
  },
  /**
   * Retrieve achives records.
   *
   * @return {Object|Array}
   */

  find: async ctx => {
    if (ctx.query._q) {
      return strapi.services.achives.search(ctx.query);
    } else {
      return strapi.services.achives.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a achives record.
   *
   * @return {Object}
   */

  findOne: async ctx => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.achives.fetch(ctx.params);
  },

  /**
   * Count achives records.
   *
   * @return {Number}
   */

  count: async ctx => {
    return strapi.services.achives.count(ctx.query);
  },

  /**
   * Create a/an achives record.
   *
   * @return {Object}
   */

  create: async ctx => {
    return strapi.services.achives.add(ctx.request.body);
  },

  /**
   * Update a/an achives record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.achives.edit(ctx.params, ctx.request.body);
  },

  /**
   * Destroy a/an achives record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.achives.remove(ctx.params);
  }
};
