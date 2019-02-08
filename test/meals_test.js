const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../index');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pry = require('pryjs');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('meals API interraction', () => {
  before((done) => {
    database.migrate.latest()
      .then(() => done())
      .catch(error => {
        throw error;
      });
    });
  before((done) => {
    database.seed.run()
      .then(() => done())
      .catch(error => {
        throw error;
      });
    });

  it('GET api/v1/meals returns all meals', done => {
  chai.request(server)
  .get('/api/v1/meals')
  .end((err, response) => {
    response.should.have.status(200);
    response.should.be.json;
    response.body.should.be.a('array');
    response.body.length.should.equal(8);
    response.body[0].should.have.property('id');
    response.body[0].should.have.property('name');
    response.body[0].should.have.property('foods');
    response.body[0].foods.should.be.a('array');
    response.body[0].foods[0].should.have.property('id');
    response.body[0].foods[0].should.have.property('name');
    response.body[0].foods[0].should.have.property('calories');
    done();
    });
  });

  it('GET /api/v1/meals/:meal_id/foods', done => {
  chai.request(server)
  .get('/api/v1/meals/1/foods')
  .end((err, response) => {
    response.should.have.status(200);
    response.should.be.json;
    response.body.should.be.a('array');
    response.body.length.should.equal(1);
    response.body[0].should.have.property('id');
    response.body[0].should.have.property('name');
    response.body[0].should.have.property('foods');
    response.body[0].foods.should.be.a('array');
    response.body[0].foods[0].should.have.property('id');
    response.body[0].foods[0].should.have.property('name');
    response.body[0].foods[0].should.have.property('calories');
    done();
    });
  });

  it('POST /api/v1/meals/:meal_id/foods/:id adds food to meal', done => {
  chai.request(server)
  .post('/api/v1/meals/1/foods/1')
  .end((err, response) => {
    response.should.have.status(201);
    response.body.should.be.a('object');
    response.body.should.have.property('message');
    done();
    });
  });

  it('DELETE /api/v1/meals/:meal_id/foods/:id deletes the food', done => {
  chai.request(server)
  .delete('/api/v1/meals/1/foods/1')
  .end((err, response) => {
    eval(pry.it);
    response.should.have.status(204);
    });
    done();
  });

});
