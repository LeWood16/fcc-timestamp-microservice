'use strict';
var express = require('express');
var moment = require('moment');
var app = express();
    
    

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/index.html');
});

app.get('/:string', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  
  var str = req.params.string;
  var date = moment(str, [
    "MM DD, YYYY",
    "MM-DD-YYYY", 
    "DD-MM-YYYY", 
    "MM DD, YYYY", 
    "MMMM DD, YYYY",
    "MMMM Do, YYYY",
    "X",
    "MM DD YY"
    ]);
  var natural = date.format("MMMM DD, YYYY");
  var unix = date.format("X"); 
  
  // if a parseable date object, return both properties
  if (date.isValid()){
    res.send(JSON.stringify({"unix":unix, "natural": natural}));
  }
  
  res.send(JSON.stringify({"unix":null,"natural":null}));
  
});

app.listen(process.env.PORT || 3000, function(){
  console.log('Example app listening on port ' + process.env.PORT + '!');
})