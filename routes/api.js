/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
var mongoose = require('mongoose');

const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

const issueSchema = new mongoose.Schema({
  project: {type: String, required: true},
  issue_title: {type: String, required: true},
  issue_text: {type: String, required: true},
  created_by: {type: String, required: true},
  assigned_to: {type: String, required: false},
  status_text: {type: String, required: false},
  created_on: {type: Date, default: new Date()},
  updated_on: {type: Date},
  open: {type: Boolean, default: true}
})

const Issue = mongoose.model('Issue', issueSchema);

module.exports = function (app) {
  MongoClient.connect(CONNECTION_STRING, function(err, db) {
    if (err) {
      console.log("Database connection error");
    }
      console.log("Database connection successful")
      app.route('/api/issues/:project')
        .get(function (req, res){
          var project = req.params.project;
          
        })
    
        .post(function (req, res){
          console.log("post")
          var newIssue = new Issue({
            project: req.params.project,
            issue_title: req.body.issue_title,
            issue_text: req.body.issue_text,
            created_by: req.body.created_by,
            assigned_to: req.body.assigned_to,
            status_text: req.body.status_text
          })
          console.log(newIssue);
          newIssue.save((err,data)=>{
            if (err) {
              return res.send(err)
            }
            console.log(data)
            res.json(data);
          })
        })
    
        .put(function (req, res){
          var project = req.params.project;
      
        })
    
        .delete(function (req, res){
          var project = req.params.project;
      
        });
    })
};
