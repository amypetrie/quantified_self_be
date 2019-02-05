'use strict';

const { Model } = require('objection');

class MealFood extends Model {
  static get tableName() {
    return 'mealfoods';
  }

  static get relationMappings() {
    return {
      meal: {
        relation: Model.BelongsToOneRelation,
        modelClass: Meal,
        join: {
          from: 'mealfoods.meal_id',
          to: 'meals.id'
        }
      },
      food: {
        relation: Model.BelongsToOneRelation,
        modelClass: Food,
        join: {
          from: 'mealfoods.food_id',
          to: 'foods.id'
        }
      }
    };
  }
}

module.exports = MealFood;
