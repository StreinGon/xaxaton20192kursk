"use strict";

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
  },
  setAchive: async ctx => {
    if (ctx.request.body.achiveTitle && ctx.request.body.email) {
      return Achives.findOne({ title: ctx.request.body.achiveTitle }).then(
        achive => {
          if (!achive) {
            return ctx.badRequest("ERROR2");
          }
          return strapi.plugins["users-permissions"].models.user
            .findOne({ email: ctx.request.body.email })
            .then(user => {
              if (!user) {
                return ctx.badRequest("ERROR3");
              }
              if (!user.achives) {
                user.achives = [];
              }
              if (!achive.users) {
                achive.users = [];
              }
              achive.users.push(user);
              achive.save();
              user.achives.push(achive);
              user.save();
              return ctx.send({ msg: "Added", user });
            });
        }
      );
    }
    return ctx.badRequest("ERROR");
  },
  getMyAchives: async ctx => {
    if (ctx.state.user) {
      return strapi.plugins["users-permissions"].models.user
        .findOne({ email: ctx.state.user.email })
        .populate("achives")
        .then(user => {
          console.log(user);
          if (user) {
            return ctx.send({
              msg: "Achives:",
              achives: user.achives
            });
          }
          return ctx.badRequest("User not found");
        });
    }
    return ctx.badRequest("You should login");
  },
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
              if (!user.achives) {
                return ctx.badRequest("User dont have any achives");
              }
              console.log(achive);
              if (!achive.users) {
                return ctx.badRequest("Achives error");
              }
              achive.users = achive.users.filter(
                element => element.id !== user.id
              );
              user.achives = user.achives.filter(
                element => element.id !== achive.id
              );
              user.save();
              achive.save();
              return ctx.send({ msg: "Deleted", user });
            });
        }
      );
    }
    return ctx.badRequest("ERROR");
  }
};
