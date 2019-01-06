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
          var query = req.query;
          query.project = project;
          Issue.find(query, (err,arr)=>{
            if (err) return res.send(err)
            console.log(arr)
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
          console.log("put");
          var project = req.params.project;
          if (req.body._id === null){
            return res.json({error: "_id is required to update issue."})
          }
        
          var updateFields = {project: project, updated_on: new Date()}
          
          if (req.body.issue_title){
            updateFields.issue_title = req.body.issue_title;
          }
          if (req.body.issue_text){
            updateFields.issue_text = req.body.issue_text;
          }
          if (req.body.created_by){
            updateFields.created_by = req.body.created_by;
          }
          if (req.body.assigned_to){
            updateFields.assigned_to = req.body.assigned_to;
          }
          if (req.body.status_text){
            updateFields.status_text = req.body.status_text;
          }
          
          if (Object.keys(updateFields).length === 2){
            return res.json({error: "no update field sent"});
          }
        
          Issue.findOneAndUpdate({_id: req.body._id}, updateFields, {new: true}, (err, issue) => {
            console.log(issue);
            if (err) return res.json({error: err})
            if (!issue) return res.json({error: "could not update " + req.body._id})
            res.json({updateMessage: 'successfully updated'});
          })
        })
    
        .delete(function (req, res){
          var project = req.params.project;
      
        });
    };
