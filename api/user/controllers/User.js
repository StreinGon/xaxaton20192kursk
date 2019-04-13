"use strict";

/**
 * User.js controller
 *
 * @description: A set of functions called "actions" for managing `User`.
 */

module.exports = {
  /**
   * set achive to user via email and title.
   *
   * @return {Object}
   */
  setAchive: async ctx => {
    if (ctx.request.body.achiveTitle && ctx.request.body.email) {
      return Achives.findOne({ title: ctx.request.body.achiveTitle }).then(
        achive => {
          if (!achive) {
            return ctx.badRequest("Achive not found");
          }
          return strapi.plugins["users-permissions"].models.user
            .findOne({ email: ctx.request.body.email })
            .then(user => {
              if (!user) {
                return ctx.badRequest("User not found");
              }
              return Relationuserachives.create({
                user: user.id,
                achives: achive.id
              }).then(data => {
                if (!data) {
                }
                return ctx.send({ msg: "Added", data: { user, achive } });
              });
            });
        }
      );
    }
    return ctx.badRequest("Auth error");
  },
  /**
   * Receive all user achives.
   *
   * @return {Object}
   */
  getMyAchives: async ctx => {
    if (ctx.state.user) {
      return strapi.plugins["users-permissions"].models.user
        .findOne({ email: ctx.state.user.email })
        .then(user => {
          if (user) {
            return Relationuserachives.find({ user: user.id })
              .populate("achives")
              .then(achives => {
                return ctx.send({
                  msg: "Achives:",
                  achives
                });
              });
          }
          return ctx.badRequest("User not found");
        });
    }
    return ctx.badRequest("You should login");
  },
  /**
   * delete achive via title.
   *
   * @return {Object}
   */
  deleteAchive: async ctx => {
    if (ctx.request.body.achiveTitle && ctx.request.body.email) {
      return Achives.findOne({ title: ctx.request.body.achiveTitle }).then(
        achive => {
          if (!achive) {
            return ctx.badRequest("Achive  not found");
          }
          return strapi.plugins["users-permissions"].models.user
            .findOne({ email: ctx.request.body.email })
            .populate("users")
            .then(user => {
              if (!user) {
                return ctx.badRequest("user not found");
              }
              // return strapi.services.relationuserachives
              //   .remove({
              //     user: user.id,
              //     achives: achive.id
              //   })
              //   .then(achive => {
              //     return ctx.send({
              //       msg: "Deleted"
              //     });
              //   });
              return Relationuserachives.findOneAndDelete({
                user: user.id,
                achives: achive.id
              }).then(achive => {
                return ctx.send({
                  msg: "Deleted"
                });
              });
            });
        }
      );
    }
    return ctx.badRequest("ERROR");
  }
};
