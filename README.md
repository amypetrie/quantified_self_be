# 📱 Quantified Self

> A food calorie goal API.

The Quantified Self API is responsible for storing and returning calorie-related information to the client app. The app uses a JavaScript/Express environment with knex access to a PostgreSQL database.

## ⚙️ Initial Setup

OS X & Linux Command Line:

```sh
npm install

```

## 🕹 How to Use

All data returned is in standardized JSON format.
GET request query parameters should be supplied in PARAMS.
POST and DELETE parameters should be supplied in the request body.

GET /api/v1/foods
Returns all foods in the database with their calories.

GET api/v1/foods/:id
Returns the food matching the supplied ID.

DELETE /api/v1/foods/:id
Deletes the food matching the supplied ID.

POST /api/v1/foods
Adds a food when supplying food info in the following format:
{ 'name': 'Pizza', 'calories': '200' }

PUT /api/v1/foods/:id
Edits a food when supplying food info in the following format:
{ 'name': 'Pizza', 'calories': '215' }

GET /api/v1/meals
Returns all meals in the database with their associated foods.

GET /api/v1/meals/:id/foods
Returns all foods associated with the meal matching the supplied ID.

## 🚧 Known Issues

The app does not yet give the client the ability to add, edit, or delete meals or meal data.

## 📊 How to Run Tests

OS X & Linux:

```sh
mocha --exit
```

## 🏗 Tech Stack List

- JavaScript
- Node v10.15.0
- NPM 6.4.1
- Express 4.16.4
- chai 4.2.0,
- chai-http 4.2.1,
- mocha 5.2.0
- knex 0.16.3

## 📥 How To Contribute

1. Fork this repo
2. Create your feature branch (`git checkout -b feature/thingamajig`)
3. Commit your changes (`git commit -am 'Added a cool doodad!'`)
4. Push to the branch (`git push origin feature/thingamajig`)
5. Create a new Pull Request

## 🚀 Core Contributors

**Amy Petrie**
Github:[https://github.com/amypetrie](https://github.com/amypetrie)

**Norm Schultz**
Github:[https://github.com/normanrs](https://github.com/normanrs/)
Web:[http://www.normanrschultz.com](http://www.normanrschultz.com)
