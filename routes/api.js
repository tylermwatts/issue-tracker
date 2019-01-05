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
  created_on: {type: Date, default
})

module.exports = function (app) {
  MongoClient.connect(CONNECTION_STRING, function(err, db) {
    if (err) {
      console.log("Database connection error");
    } else {
      console.log("Database connection successful");
      app.route('/api/issues/:project')
  
        .get(function (req, res){
          var project = req.params.project;
          
        })
    
        .post(function (req, res){
          var project = req.params.project;
          
        })
    
        .put(function (req, res){
          var project = req.params.project;
      
        })
    
        .delete(function (req, res){
          var project = req.params.project;
      
        });
    }})
};
