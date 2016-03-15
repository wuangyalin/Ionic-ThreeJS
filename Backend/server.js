var express = require('express'),
    app = express();

var Session = require('./mongodb_files/createSchema');
var fs = require("fs");

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/sessions', function(req,res){
/*  fs.readFile(__dirname+"/routes/"+"sessions.json","utf8", function(err,data){
    //console.log(data);
    res.end(data);
  });
*/
    Session.find({},function(err,sessions){
      if(err) throw err;

      //sessions = JSON.parse(sessions);
      //object of all the users
      console.log(sessions);
      res.send(sessions);
    });
});

app.get('/sessions/:author', function(req,res){
       var author = req.params.author;
       Session.findOne({author: author}, function(err,session){
        if(err) throw err;

        //session = JSON.parse(session);
        //object of the user
        console.log(session);
        res.send(session);
      });
});

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

/*
var fs = require("fs");

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});


app.get('/sessions', function(req,res){
	fs.readFile(__dirname+"/routes/"+"sessions.json","utf8", function(err,data){
		//console.log(data);
		res.end(data);
	});
})
app.get('/sessions/:author', function(req,res){
	fs.readFile(__dirname+"/routes/"+"sessions.json","utf8", function(err,data){
	   var author = req.params.author;
	   var sessions = JSON.parse(data);
	     for(i=0;i<sessions.length;i++){
      	if(sessions[i].author == author){
      		res.send(sessions[i]);
      	}
      }
	});
})


//app.get('/sessions/:author', sessions.findAuthor);

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
*/