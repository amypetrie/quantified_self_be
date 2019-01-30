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

describe('API GET Routes', () => {
  before((done) => {
    database.migrate.latest()
      .then(() => done())
      .catch(error => {
        throw error;
      });
    });
  // before((done) => {
  //   database.seed.run()
  //     .then(() => done())
  //     .catch(error => {
  //       throw error;
  //     });
  // });

  it('should return the homepage with text', done => {
  chai.request(server)
  .get('/')
  .end((err, response) => {
    response.should.have.status(200);
    response.should.be.html;
    response.res.text.should.equal('Hello, Quantified Self');
    done();
    });
  });


});
