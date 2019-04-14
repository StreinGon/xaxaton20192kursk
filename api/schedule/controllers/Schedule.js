"use strict";

/**
 * Schedule.js controller
 *
 * @description: A set of functions called "actions" for managing `Schedule`.
 */

module.exports = {
  /**
   * Retrieve schedule records.
   *
   * @return {Object|Array}
   */

  find: async ctx => {
    if (ctx.query._q) {
      return strapi.services.schedule.search(ctx.query);
    } else {
      return strapi.services.schedule.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a schedule record.
   *
   * @return {Object}
   */

  findOne: async ctx => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.schedule.fetch(ctx.params);
  },

  /**
   * Count schedule records.
   *
   * @return {Number}
   */

  count: async ctx => {
    return strapi.services.schedule.count(ctx.query);
  },

  /**
   * Create a/an schedule record.
   *
   * @return {Object}
   */

  create: async ctx => {
    return strapi.services.schedule.add(ctx.request.body);
  },

  /**
   * Update a/an schedule record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.schedule.edit(ctx.params, ctx.request.body);
  },

  /**
   * Destroy a/an schedule record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.schedule.remove(ctx.params);
  },
  getSchedule: async ctx => {
    if (ctx.request.query.num === 1) {
      return [
        {
          group: 21,
          week: [
            {
              day: 1,
              classes: [
                {
                  class: "ОТГ",
                  lecturer: "Воробьёв Н.Н"
                },
                {
                  class: "ОТГ",
                  lecturer: "Воробьёв Н.Н"
                },
                {
                  class: "ОТГ",
                  lecturer: "Воробьёв Н.Н"
                }
              ]
            },
            {
              day: 2,
              classes: [
                {
                  class: "ОТГ",
                  lecturer: "Воробьёв Н.Н"
                },
                {
                  class: "ОТГ",
                  lecturer: "Воробьёв Н.Н"
                },
                {
                  class: "ОТГ",
                  lecturer: "Воробьёв Н.Н"
                }
              ]
            },
            {
              day: 3,
              classes: [
                {
                  class: "ОТГ",
                  lecturer: "Воробьёв Н.Н"
                },
                {
                  class: "ОТГ",
                  lecturer: "Воробьёв Н.Н"
                },
                {
                  class: "ОТГ",
                  lecturer: "Воробьёв Н.Н"
                }
              ]
            },
            {
              day: 4,
              classes: [
                {
                  class: "ОТГ",
                  lecturer: "Воробьёв Н.Н"
                },
                {
                  class: "ОТГ",
                  lecturer: "Воробьёв Н.Н"
                },
                {
                  class: "ОТГ",
                  lecturer: "Воробьёв Н.Н"
                }
              ]
            },
            {
              day: 5,
              classes: [
                {
                  class: "ОТГ",
                  lecturer: "Воробьёв Н.Н"
                },
                {
                  class: "ОТГ",
                  lecturer: "Воробьёв Н.Н"
                },
                {
                  class: "ОТГ",
                  lecturer: "Воробьёв Н.Н"
                }
              ]
            },
            {
              day: 6,
              classes: [
                {
                  class: "ОТГ",
                  lecturer: "Воробьёв Н.Н"
                },
                {
                  class: "ОТГ",
                  lecturer: "Воробьёв Н.Н"
                },
                {
                  class: "ОТГ",
                  lecturer: "Воробьёв Н.Н"
                }
              ]
            }
          ]
        },
        {
          group: 24,
          week: [
            {
              day: 1,
              classes: [
                {
                  class: "ОТГ",
                  lecturer: "Воробьёв Н.Н"
                },
                {
                  class: "ОТГ",
                  lecturer: "Воробьёв Н.Н"
                },
                {
                  class: "ОТГ",
                  lecturer: "Воробьёв Н.Н"
                }
              ]
            },
            {
              day: 2,
              classes: [
                {
                  class: "ОТГ",
                  lecturer: "Воробьёв Н.Н"
                },
                {
                  class: "ОТГ",
                  lecturer: "Воробьёв Н.Н"
                },
                {
                  class: "ОТГ",
                  lecturer: "Воробьёв Н.Н"
                }
              ]
            },
            {
              day: 3,
              classes: [
                {
                  class: "ОТГ",
                  lecturer: "Воробьёв Н.Н"
                },
                {
                  class: "ОТГ",
                  lecturer: "Воробьёв Н.Н"
                },
                {
                  class: "ОТГ",
                  lecturer: "Воробьёв Н.Н"
                }
              ]
            },
            {
              day: 4,
              classes: [
                {
                  class: "ОТГ",
                  lecturer: "Воробьёв Н.Н"
                },
                {
                  class: "ОТГ",
                  lecturer: "Воробьёв Н.Н"
                },
                {
                  class: "ОТГ",
                  lecturer: "Воробьёв Н.Н"
                }
              ]
            },
            {
              day: 5,
              classes: [
                {
                  class: "ОТГ",
                  lecturer: "Воробьёв Н.Н"
                },
                {
                  class: "ОТГ",
                  lecturer: "Воробьёв Н.Н"
                },
                {
                  class: "ОТГ",
                  lecturer: "Воробьёв Н.Н"
                }
              ]
            },
            {
              day: 6,
              classes: [
                {
                  class: "ОТГ",
                  lecturer: "Воробьёв Н.Н"
                },
                {
                  class: "ОТГ",
                  lecturer: "Воробьёв Н.Н"
                },
                {
                  class: "ОТГ",
                  lecturer: "Воробьёв Н.Н"
                }
              ]
            }
          ]
        }
      ];
    }
    return [
      {
        group: 11,
        week: [
          {
            day: 1,
            classes: [
              {
                class: "ОТГ",
                lecturer: "Воробьёв Н.Н"
              },
              {
                class: "ОТГ",
                lecturer: "Воробьёв Н.Н"
              },
              {
                class: "ОТГ",
                lecturer: "Воробьёв Н.Н"
              }
            ]
          },
          {
            day: 2,
            classes: [
              {
                class: "ОТГ",
                lecturer: "Воробьёв Н.Н"
              },
              {
                class: "ОТГ",
                lecturer: "Воробьёв Н.Н"
              },
              {
                class: "ОТГ",
                lecturer: "Воробьёв Н.Н"
              }
            ]
          },
          {
            day: 3,
            classes: [
              {
                class: "ОТГ",
                lecturer: "Воробьёв Н.Н"
              },
              {
                class: "ОТГ",
                lecturer: "Воробьёв Н.Н"
              },
              {
                class: "ОТГ",
                lecturer: "Воробьёв Н.Н"
              }
            ]
          },
          {
            day: 4,
            classes: [
              {
                class: "ОТГ",
                lecturer: "Воробьёв Н.Н"
              },
              {
                class: "ОТГ",
                lecturer: "Воробьёв Н.Н"
              },
              {
                class: "ОТГ",
                lecturer: "Воробьёв Н.Н"
              }
            ]
          },
          {
            day: 5,
            classes: [
              {
                class: "ОТГ",
                lecturer: "Воробьёв Н.Н"
              },
              {
                class: "ОТГ",
                lecturer: "Воробьёв Н.Н"
              },
              {
                class: "ОТГ",
                lecturer: "Воробьёв Н.Н"
              }
            ]
          },
          {
            day: 6,
            classes: [
              {
                class: "ОТГ",
                lecturer: "Воробьёв Н.Н"
              },
              {
                class: "ОТГ",
                lecturer: "Воробьёв Н.Н"
              },
              {
                class: "ОТГ",
                lecturer: "Воробьёв Н.Н"
              }
            ]
          }
        ]
      },
      {
        group: 14,
        week: [
          {
            day: 1,
            classes: [
              {
                class: "ОТГ",
                lecturer: "Воробьёв Н.Н"
              },
              {
                class: "ОТГ",
                lecturer: "Воробьёв Н.Н"
              },
              {
                class: "ОТГ",
                lecturer: "Воробьёв Н.Н"
              }
            ]
          },
          {
            day: 2,
            classes: [
              {
                class: "ОТГ",
                lecturer: "Воробьёв Н.Н"
              },
              {
                class: "ОТГ",
                lecturer: "Воробьёв Н.Н"
              },
              {
                class: "ОТГ",
                lecturer: "Воробьёв Н.Н"
              }
            ]
          },
          {
            day: 3,
            classes: [
              {
                class: "ОТГ",
                lecturer: "Воробьёв Н.Н"
              },
              {
                class: "ОТГ",
                lecturer: "Воробьёв Н.Н"
              },
              {
                class: "ОТГ",
                lecturer: "Воробьёв Н.Н"
              }
            ]
          },
          {
            day: 4,
            classes: [
              {
                class: "ОТГ",
                lecturer: "Воробьёв Н.Н"
              },
              {
                class: "ОТГ",
                lecturer: "Воробьёв Н.Н"
              },
              {
                class: "ОТГ",
                lecturer: "Воробьёв Н.Н"
              }
            ]
          },
          {
            day: 5,
            classes: [
              {
                class: "ОТГ",
                lecturer: "Воробьёв Н.Н"
              },
              {
                class: "ОТГ",
                lecturer: "Воробьёв Н.Н"
              },
              {
                class: "ОТГ",
                lecturer: "Воробьёв Н.Н"
              }
            ]
          },
          {
            day: 6,
            classes: [
              {
                class: "ОТГ",
                lecturer: "Воробьёв Н.Н"
              },
              {
                class: "ОТГ",
                lecturer: "Воробьёв Н.Н"
              },
              {
                class: "ОТГ",
                lecturer: "Воробьёв Н.Н"
              }
            ]
          }
        ]
      }
    ];
  }
};
