var assert = require('assert'); 
var Session = require('./createSchema');
var fs = require("fs");

fs.readFile(__dirname+"/../routes/"+"sessions.json","utf8", function(err,data){
//fs.readFile("http://www.omdbapi.com/?s=SuperMan&y=&plot=full&r=json","utf8", function(err,data){
	data = JSON.parse(data);
	Session.collection.insertMany(data,function(err,r){
		assert.equal(null,err);
		assert.equal(5,r.insertedCount);
	})
});

