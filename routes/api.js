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
          db.collection("projects").findOne({project}, (err, project) => {
            if (err) return res.json({error: err});
            if (!project){
              db.collection("projects").insertOne({
                project, issues: [{issue_title: req.body.issue_title}]
              }, (err, doc)=>{
                if (err) return res.json({error: err})
                res.json(doc);
              })
            }
          })
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
