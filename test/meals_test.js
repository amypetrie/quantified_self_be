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

  // it('GET api/v1/meals returns all meals', done => {
  it('GET api/v1/meals returns all meals', () => {
  chai.request(server)
  .get('/api/v1/meals')
  .end((err, response) => {
    response.should.have.status(200);
    console.log(response.body);
    response.should.be.json;
    // console.log(response);
    eval(pry.it);
    response.body.should.be.a('array');
    response.body.length.should.equal(12);
    response.body[0].should.have.property('id');
    response.body[0].should.have.property('type');
    response.body[0].should.have.property('foods');
    response.body[0].foods.should.be.a('array');
    response.body[0].foods[0].should.have.property('id');
    response.body[0].foods[0].should.have.property('name');
    response.body[0].foods[0].should.have.property('calories');
    // done();
    });
  });

});
