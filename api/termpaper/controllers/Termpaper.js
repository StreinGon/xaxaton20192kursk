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
  /**
   * Create new Term paper.
   *
   * @return {Object}
   */
  createNewTP: async ctx => {
    if (!ctx.state.user) {
      return ctx.badRequest("Auth error");
    }
    return strapi.plugins["users-permissions"].models.user
      .findOne({ email: ctx.state.user.email })
      .then(user => {
        if (!user) {
          return ctx.badRequest("Auth error");
        }
        return Termpaper.create({
          ...ctx.request.body,
          accepted: false
        }).then(tp => {
          if (!tp) {
            return ctx.badRequest("Term paper create error");
          }
          return Availabletp.create({ user: user.id, termpaper: tp.id }).then(
            avTP => {
              if (!avTP) {
                return ctx.badRequest("Term paper create error");
              }
              return ctx.send({ msg: "Added", tp });
            }
          );
        });
      });
  },
  /**
   * Accept Temp paper via theme.
   *
   * @return {Object}
   */
  takeTP: async ctx => {
    if (!ctx.state.user) {
      return ctx.badRequest("Auth error");
    }
    return strapi.plugins["users-permissions"].models.user
      .findOne({ email: ctx.state.user.email })
      .then(user => {
        if (!user) {
          return ctx.badRequest("Auth error");
        }
        return Termpaper.findOne({
          theme: ctx.request.body.theme
        }).then(tp => {
          if (!tp) {
            return ctx.badRequest("Term paper take error");
          }
          return Activetp.create({ user: user.id, temppaper: tp.id }).then(
            aTP => {
              if (!aTP) {
                return ctx.badRequest("Term paper create error");
              }
              tp.accepted = true;
              tp.save();
              return ctx.send({ msg: "Accepted", tp });
            }
          );
        });
      });
  },
  /**
   * Get all available TP.
   *
   * @return {Object}
   */
  getAvTP: async ctx => {
    console.log("fasf");
    if (!ctx.state.user) {
      return ctx.badRequest("Auth error");
    }
    return strapi.plugins["users-permissions"].models.user
      .findOne({ email: ctx.state.user.email })
      .then(user => {
        if (!user) {
          return ctx.badRequest("Auth error");
        }

        return Availabletp.find({ accepted: false })
          .populate("termpaper")
          .then(avTP => {
            if (!avTP) {
              return ctx.badRequest("Term paper getAvTP error");
            }
            return ctx.send({ msg: "Termpapers: ", temppapers: avTP });
          });
      });
  },
  /**
   * Get all accepted TP.
   *
   * @return {Object}
   */
  getAcTP: async ctx => {
    if (!ctx.state.user) {
      return ctx.badRequest("Auth error");
    }
    return strapi.plugins["users-permissions"].models.user
      .findOne({ email: ctx.state.user.email })
      .then(user => {
        if (!user) {
          return ctx.badRequest("Auth error");
        }

        return Activetp.find({ user: user.id })
          .populate("termpaper")
          .then(avTP => {
            if (!avTP) {
              return ctx.badRequest("Term paper getAvTP error");
            }
            return ctx.send({ msg: "Termpapers: ", temppapers: avTP });
          });
      });
  },
  /**
   * Get all  TP for lecturer.
   *
   * @return {Object}
   */
  getLecturerTP: async ctx => {
    if (!ctx.state.user) {
      return ctx.badRequest("Auth error");
    }
    return strapi.plugins["users-permissions"].models.user
      .findOne({ email: ctx.state.user.email })
      .then(user => {
        if (!user) {
          return ctx.badRequest("Auth error");
        }

        return Availabletp.find({ user: user.id })
          .populate(["termpaper", "user"])
          .then(avTP => {
            if (!avTP) {
              return ctx.badRequest("Term paper getAvTP error");
            }
            return ctx.send({ msg: "Termpapers: ", temppapers: avTP });
          });
      });
  }
};
