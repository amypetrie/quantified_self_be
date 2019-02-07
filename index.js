const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pry = require('pryjs');
const expressValidator = require('express-validator');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const knexConfig = require('./knexfile');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.set('port', process.env.PORT || 8080);
app.locals.title = 'quantified_self';
app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin",
    "*");
  response.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  response.header("Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});

app.get('/', (request, response) => {
  response.send('Hello, Quantified Self');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

app.get('/api/v1/foods', (request, response) => {
  database('foods').select()
    .then((foods) => {
      response.status(200).json(foods);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/foods/:id', (request, response) => {
  database('foods').where('id', request.params.id).select()
    .then(food => {
      if (food.length) {
        response.status(200).json(food);
      } else {
        response.status(404).json({
          error: `Could not find food with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.delete('/api/v1/foods/:id', (request, response) => {
  return database('mealfoods').where('food_id', request.params.id).del()
  .then(() => database('foods').where('id', request.params.id).del())
    .then(food => {
      response.status(204).json();
    })
  .catch(error => {
      response.status(500).json({ error });
  });
});


app.post('/api/v1/foods', (request, response) => {
  const food = request.body;
  for (let requiredParameter of ['name', 'calories']) {
    if (!food[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { name: <String>, calories: <integer> }. You're missing a "${requiredParameter}" property.` });
    }
  }
    database('foods').insert(food, ['id', 'name', 'calories'])
      .then(foods => {
        var last = foods[foods.length - 1]
        response.status(201).json(last)
      })
      .catch(error => {
        response.status(500).json({ error });
      });
});

app.put('/api/v1/foods/:id', (request, response) => {
  const updates = request.body;
  const cals = Number(updates['calories']);
  request.checkBody('name', 'Invalid name').isAlpha();
  request.checkBody('calories', 'Invalid calories').isNumeric();
  var errors = request.validationErrors();
  if (errors) {
    var errMsg = { errors: [] };
    errors.forEach(function(err) {
      errMsg.errors.push(err.msg);
    });
  }
  database('foods').where('id', request.params.id).update((updates), ['id', 'name', 'calories'])
  .then(food => {
    response.status(202).json(food[0])
   })
  .catch(error => {
    response.status(500).json({ error });
  });
});

app.get('/api/v1/meals', (request, response) => {
  database('meals')
  .join('mealfoods', 'mealfoods.meal_id', '=', 'meals.id')
  .join('foods', 'mealfoods.food_id', '=', 'foods.id')
  .select( 'meals.id AS meal_id', 'meals.type AS meal_type', 'meals.created_at AS meal_date', 'foods.id AS food_id', 'foods.name AS food_name', 'foods.calories AS food_calories')
  .then(mealsOut => {
    var tempMeals = []
    var uniqMeals = []
    mealsOut.forEach(function(element) {
      tempMeals.push(element['meal_id']);
    });
    tempMeals = [...new Set(tempMeals)];
    tempMeals.forEach(function(element) {
      var found = mealsOut.find(function(data) {
        return data['meal_id'] === element;
      });
      uniqMeals.push(
        {'id': found['meal_id'],
          'name': found['meal_type'],
          'date': found['meal_date'],
          'foods': []
        }
      );
    });
    mealsOut.forEach(function(element) {
      var found = uniqMeals.find(ml => ml['id'] == element['meal_id']);
      found['foods'].push(
        {'id': element['food_id'],
         'name': element['food_name'],
         'calories': element['food_calories']
        }
      );
    });
    response.status(200).json(uniqMeals);
  })
  .catch((error) => {
    response.status(500).json({ error });
  });
});

app.get('/api/v1/meals/:id/foods', (request, response) => {
  database('meals')
  .join('mealfoods', 'mealfoods.meal_id', '=', 'meals.id')
  .join('foods', 'mealfoods.food_id', '=', 'foods.id')
  .where('meals.id', request.params.id)
  .select( 'meals.id AS meal_id', 'meals.type AS meal_type', 'meals.created_at AS meal_date', 'foods.id AS food_id', 'foods.name AS food_name', 'foods.calories AS food_calories')
  .then(mealsOut => {
    // console.log(mealsOut);
    var tempMeals = []
    var uniqMeals = []
    mealsOut.forEach(function(element) {
      tempMeals.push(element['meal_id']);
    });
    tempMeals = [...new Set(tempMeals)];
    tempMeals.forEach(function(element) {
      var found = mealsOut.find(function(data) {
        return data['meal_id'] === element;
      });
      uniqMeals.push(
        {'id': found['meal_id'],
          'name': found['meal_type'],
          'date': found['meal_date'],
          'foods': []
        }
      );
    });
    mealsOut.forEach(function(element) {
      var found = uniqMeals.find(ml => ml['id'] == element['meal_id']);
      found['foods'].push(
        {'id': element['food_id'],
         'name': element['food_name'],
         'calories': element['food_calories']
        }
      );
    });
    response.status(200).json(uniqMeals);
  })
  .catch((error) => {
    response.status(500).json({ error });
  });
});

app.post('/api/v1/meals/:meal_id/foods/:id', (request, response) => {
  var food_in = request.params.id;
  var meal_in = request.params.meal_id;
    database('mealfoods').insert({ meal_id: meal_in, food_id: food_in })
      .then(food => {
        var msg = {"message": "Successfully added!"}
        response.status(201).json(msg)
      })
      .catch(error => {
        response.status(500).json({ error });
      });
});

module.exports = app;
