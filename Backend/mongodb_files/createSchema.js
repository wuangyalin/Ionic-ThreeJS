var mongoose = require('mongoose');
var assert = require('assert'); 
    mongoose.connect('mongodb://localhost/importJsonPrac');

var Schema = mongoose.Schema;
//create a schema
var seesionSchema = new Schema({
	author: String,
	idd: Number,
	title: String,
	speaker: String,
	time: String,
	room: String,
	description: String
});

var Session = mongoose.model('Session', seesionSchema);
module.exports = Session;