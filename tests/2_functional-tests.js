/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  
    suite('POST /api/issues/{project} => object with issue data', function() {
      
      test('Every field filled in', function(done) {
       chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isDefined(res.body.issue_title);
          assert.isDefined(res.body.issue_text);
          assert.isDefined(res.body.created_by);
          assert.isDefined(res.body.assigned_to);
          assert.isDefined(res.body.status_text);          
          done();
        });
      });
      
      test('Required fields filled in', function(done) {
        chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isDefined(res.body.issue_title);
          assert.isDefined(res.body.issue_text);
          assert.isDefined(res.body.created_by);
          assert.isDefined(res.body.created_on);
          assert.isTrue(res.body.open);
          done();
        });
      });
      
      test('Missing required fields', function(done) {
        chai.request(server)
          .post('/api/issues/test')
          .send({
            issue_title: null,
            issue_text: null,
            created_by: null
          })
          .end((err,res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "Missing required information!")
            done();
          }); 
      });
    })
    
    suite('PUT /api/issues/{project} => text', function() {
      
      test('No body', function(done) {
        chai.request(server)
          .put('/api/issues/test')
          .send({
            _id: null
          })
          .end(function(err,res){
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "_id is required to update issue.");
            done();
          })
      });
      
      test('One field to update', function(done) {
        chai.request(server)
          .put('/api/issues/test')
          .send({
            _id: "5c3231529200224b7acbd9b8",
            status_text: "updating status text"
          })
          .end(function(err,res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.updateMessage, "successfully updated");
            done();
          })
      });
      
      test('Multiple fields to update', function(done) {
        chai.request(server)
          .put('/api/issues/test')
          .send({
            _id: "5c3231529200224b7acbd9b8",
            status_text: "multiple field test update",
            assigned_to: "multi-field test",
            issue_text: "testing that multiple fields can be updated"
          })
          .end((err,res)=>{
            assert.equal(res.status, 200);
            assert.equal(res.body.updateMessage, "successfully updated");
            done();
          })
      });
      
    });
    
    suite('GET /api/issues/{project} => Array of objects with issue data', function() {
      
      test('No filter', function(done) {
        chai.request(server)
        .get('/api/issues/test')
        .query({})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
      });
      
      test('One filter', function(done) {
        chai.request(server)
          .get('/api/issues/test')
          .query({issue_text: 'text'})
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.isTrue(res.body.every(d=>d.issue_text == 'text'));
            done();
        })
      });
      
      test('Multiple filters (test for multiple fields you know will be in the db for a return)', function(done) {
        chai.request(server)
          .get('/api/issues/test')
          .query({open: true, issue_title: 'Title', created_by: 'Functional Test - Every field filled in'})
          .end((err,res)=>{
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.isTrue(res.body.every(d=>d.open === true));
            assert.isTrue(res.body.every(d=>d.issue_title === 'Title'));
            assert.isTrue(res.body.every(d=>d.created_by === 'Functional Test - Every field filled in'));
            done();
          })
      });
      
    });
    
    suite('DELETE /api/issues/{project} => text', function() {
      
      test('No _id', function(done) {
        chai.request(server)
          .delete('/api/issues/test')
          .query({})
          .end((err,res)=>{
            assert.equal(res.status, 200);
            assert.equal(res.body.error, '_id error');
            done();
          })
      });
      
      test('Valid _id', function(done) {
          chai.request(server)
          .delete('/api/issues/test')
          .query({_id: ''})
          .end((err,res)=>{
            assert.equal(res.status, 200);
            //assert.equal(res.body.success, 'deleted ');
            done();
          })
      });
      
    });

});
