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

const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});


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
          db.collection("issues").insertOne({
            issue_title: req.body.issue_title,
            issue_text: req.body.issue_text,
            created_by: req.body.created_by,
            assigned_to: req.body.assigned_to,
            status_text: req.body.status_text
          }, (err, issue) => {
            if (err){
              return res.json(err)
            }
            console.log(issue);
            res.json(issue);
          })
        })
    
        .put(function (req, res){
          var project = req.params.project;
      
        })
    
        .delete(function (req, res){
          var project = req.params.project;
      
        });
    }})
};
