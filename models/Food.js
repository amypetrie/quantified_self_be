'use strict';

const { Model } = require('objection');

class Food extends Model {
  static get tableName() {
    return 'foods';
  }

  static get relationMappings() {
    return {
      meals: {
        relation: Model.ManyToManyRelation,
        // The related model. This can be either a Model subclass constructor or an
        // absolute file path to a module that exports one.
        modelClass: Meal,
        join: {
          from: 'foods.id',
          through: {
            from: 'mealfoods.food_id',
            to: 'mealfoods.meal_id'
          },
          to: 'meals.id'
        }
      }
    };
  }
}

module.exports = Food;
