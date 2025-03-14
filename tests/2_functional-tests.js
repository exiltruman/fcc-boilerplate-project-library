/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  suite('Routing tests', function() {
    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai.request(server)
          .post('/api/books')
          .send({title: 'a'})
          .end(function(err, res){
            assert.equal(res.body.title, 'a');
            done();
          });
      });
      
      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
        .post('/api/books')
        .end(function(err, res){
          assert.isString(res.body);
          done();
        });
      });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai.request(server)
        .get('/api/books')
        .end(function(err, res){
          assert.isArray(res.body);
          done();
        });
      });      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server)
        .get('/api/books/1')
        .end(function(err, res){
          assert.isString(res.body);
          done();
        });
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai.request(server)
          .post('/api/books')
          .send({title: 'a'})
          .then(function(res){
            return chai.request(server)
            .get('/api/books/' + res.body._id)
            .then((res) => {
              assert.equal(res.body.title, 'a')
              done()
            })
          });
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        chai.request(server)
          .post('/api/books')
          .send({title: 'a'})
          .then(function(res){
            return chai.request(server)
            .post('/api/books/' + res.body._id)
            .send({comment: 'asd'})
            .then((res) => {
              assert.equal(res.body.comments[0], 'asd')
              assert.isDefined(res.body._id)
              done()
            })
          });
      });

      test('Test POST /api/books/[id] without comment field', function(done){
        chai.request(server)
          .post('/api/books')
          .send({title: 'a'})
          .then(function(res){
            return chai.request(server)
            .post('/api/books/' + res.body._id)
            .then((res) => {
              assert.isString(res.body)
              done()
            })
          });
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        chai.request(server)
            .post('/api/books/1')
            .send({comment: 'asd'})
            .then((res) => {
              assert.isString(res.body)
              done()
            })
      });
      
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        chai.request(server)
          .post('/api/books')
          .send({title: 'a'})
          .then(function(res){
            return chai.request(server)
            .delete('/api/books/' + res.body._id)
            .then((res) => {
              assert.isString(res.body)
              done()
            })
          });
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        chai.request(server)
            .delete('/api/books/1')
            .then((res) => {
              assert.isString(res.body)
              done()
            })
      });

    });

  });

});
