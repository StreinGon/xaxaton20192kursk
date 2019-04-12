"use strict";

/**
 * Termpaper.js controller
 *
 * @description: A set of functions called "actions" for managing `Termpaper`.
 */

module.exports = {
  /**
   * Retrieve termpaper records.
   *
   * @return {Object|Array}
   */

  find: async ctx => {
    if (ctx.query._q) {
      return strapi.services.termpaper.search(ctx.query);
    } else {
      return strapi.services.termpaper.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a termpaper record.
   *
   * @return {Object}
   */

  findOne: async ctx => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.termpaper.fetch(ctx.params);
  },

  /**
   * Count termpaper records.
   *
   * @return {Number}
   */

  count: async ctx => {
    return strapi.services.termpaper.count(ctx.query);
  },

  /**
   * Create a/an termpaper record.
   *
   * @return {Object}
   */

  create: async ctx => {
    return strapi.services.termpaper.add(ctx.request.body);
  },

  /**
   * Update a/an termpaper record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.termpaper.edit(ctx.params, ctx.request.body);
  },

  /**
   * Destroy a/an termpaper record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.termpaper.remove(ctx.params);
  },
  createNewTP: async ctx => {
    return strapi.plugins["users-permissions"].models.user
      .findOne({ email: ctx.state.user.email })
      .then(user => {
        if (!user) {
          return ctx.badRequest("Auth error");
        }
        return strapi.services.termpaper
          .add({
            ...ctx.request.body,
            lecturer: ctx.state.user.id
          })
          .then(tp => {
            if (!tp) {
              return ctx.badRequest("Term paper create error");
            }
            if (!user.availableTermPapers) {
              user.availableTermPapers = [];
            }
            user.availableTermPapers.push(tp);
            user.save();
            return ctx.send({ msg: "Added", tp });
          });
      });
  },
  takeTP: async ctx => {
    return strapi.plugins["users-permissions"].models.user
      .findOne({ email: ctx.state.user.email })
      .then(user => {
        if (!user) {
          return ctx.badRequest("Auth error");
        }
        return Termpaper.findOne({
          theme: ctx.request.body.tpTheme
        })
          .populate("lecturer")
          .then(tp => {
            if (!tp) {
              return ctx.badRequest("Term paper take error");
            }
            return strapi.plugins["users-permissions"].models.user
              .findOne({ email: tp.lecturer.email })
              .then(lecturer => {
                if (!lecturer) {
                  return ctx.badRequest("Term paper take error2");
                }
                if (!user.ActiveTermPapers) {
                  user.activeTermPapers = [];
                }
                lecturer.availableTermPapers = lecturer.availableTermPapers.filter(
                  element => element.id != tp.id
                );
                tp.students = ctx.state.user.id;
                tp.save();
                lecturer.save();
                user.activeTermPapers.push(tp);
                user.save();
                return ctx.send({ msg: "Taken", tp });
              });
          });
      });
  }
};
