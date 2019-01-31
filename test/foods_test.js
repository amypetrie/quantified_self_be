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

describe('foods API interraction', () => {
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

  it('GET api/v1/foods returns all foods', done => {
  chai.request(server)
  .get('/api/v1/foods')
  .end((err, response) => {
    response.should.have.status(200);
    response.should.be.json;
    response.body.should.be.a('array');
    response.body.length.should.equal(12);
    response.body[0].should.have.property('name');
    response.body[0].name.should.equal('Kiwi');
    response.body[0].should.have.property('calories');
    response.body[0].calories.should.equal(45);
    response.body[11].name.should.equal('Almonds');
    response.body[11].calories.should.equal(120);
    done();
    });
  });

  it('GET api/v1/foods/:id returns a food by its ID', done => {
  chai.request(server)
  .get('/api/v1/foods/1')
  .end((err, response) => {
    response.should.have.status(200);
    response.should.be.json;
    response.body.should.be.a('array');
    response.body.length.should.equal(1);
    response.body[0].should.have.property('name');
    response.body[0].name.should.equal('Kiwi');
    response.body[0].should.have.property('calories');
    response.body[0].calories.should.equal(45);
    done();
    });
  });

  it('GET api/v1/foods/:id does not returns a food if ID is invalid', done => {
  chai.request(server)
  .get('/api/v1/foods/20')
  .end((err, response) => {
    response.should.have.status(404);
    done();
    });
  });

  it('POST api/v1/foods returns new food if successful', done => {
  chai.request(server)
  .post('/api/v1/foods')
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

  it('POST api/v1/foods does not post if required param name is missing', done => {
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

  it('POST api/v1/foods does not post if required param calories is missing', done => {
  chai.request(server)
  .post('/api/v1/foods')
  .send({ 'name': 'bananas' })
  .end((err, response) => {
    response.should.have.status(422);
    response.body.should.be.a('object');
    response.body.should.have.property('error');
    done();
    });
  });

  it('PATCH api/v1/foods/:id updates an existing food', done => {
  chai.request(server)
  .patch('/api/v1/foods/1')
  .send({ 'name': 'Peaches', 'calories': '50' })
  .end((err, response) => {
    response.should.have.status(202);
    response.body.should.be.a('object');
    response.body.should.have.property('id');
    response.body.id.should.equal(1);
    response.body.should.have.property('name');
    response.body.name.should.equal('Peaches');
    response.body.should.have.property('calories');
    response.body.calories.should.equal(50);
    done();
    });
  });

});
