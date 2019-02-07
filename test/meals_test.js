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

  xit('POST /api/v1/meals/:meal_id/foods/:id adds food to meal', done => {
  chai.request(server)
  .post('/api/v1/meals/:meal_id/foods/:id')
  .send({ 'name': 'Pizza', 'calories': '200' })
  .end((err, response) => {
    response.should.have.status(201);
    response.body.should.be.a('object');
    response.body.should.have.property('id');
    response.body.id.should.equal(13);
    response.body.should.have.property('name');
    response.body.name.should.equal('Pizza');
    response.body.should.have.property('calories');
    response.body.calories.should.equal(200);
    done();
    });
  });

  xit('POST api/v1/foods does not post if required param name is missing', done => {
  chai.request(server)
  .post('/api/v1/foods')
  .send({ 'calories': '200' })
  .end((err, response) => {
    response.should.have.status(422);
    response.body.should.be.a('object');
    response.body.should.have.property('error');
    done();
    });
  });

});
