'use strict';

const { Model } = require('objection');

class Meal extends Model {
  static get tableName() {
    return 'meals';
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      foods: {
        relation: Model.ManyToManyRelation,
        // The related model. This can be either a Model subclass constructor or an
        // absolute file path to a module that exports one.
        modelClass: Food,
        join: {
          from: 'meals.id',
          through: {
            from: 'mealfoods.meal_id',
            to: 'mealfoods.food_id'
          },
          to: 'foods.id'
        }
      }
    };
  }
}

module.exports = Meal;
