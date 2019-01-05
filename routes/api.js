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
  assigned_to: {type: String, required: false, default: ""},
  status_text: {type: String, required: false, default: ""},
  created_on: {type: Date, default: new Date()},
  updated_on: {type: Date, required: false},
  open: {type: Boolean, required: true, default: true}
})

const Issue = mongoose.model('Issue', issueSchema);

module.exports = function (app) {
      app.route('/api/issues/:project')
        .get(function (req, res){
          var project = req.params.project;
          Issue.find({project}, (err,arr)=>{
            if (err) return res.send(err)
            res.json(arr);
          })
        })
        .post(function (req, res){
          console.log("post")
          if (!req.body.issue_title || !req.body.issue_text || !req.body.created_by){
            return res.json({error: "Missing required information!"})
          }
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
          
          if (req.body._id === null){
            return res.json({error: "_id is required to update issue."})
          }
          Issue.findOneAndUpdate({_id: req.body._id}, (err, issue) => {
            issue.issue_title = req.body.issue_title,
            issue.issue_text = req.body.issue_text,
            issue.created_by = req.body.created_by,
            issue.assigned_to = req.body.assigned_to,
            issue.status_text = req.body.status_text
          })
          res.json({updateMessage: "successfully updated"});
        })
    
        .delete(function (req, res){
          var project = req.params.project;
      
        });
    };
