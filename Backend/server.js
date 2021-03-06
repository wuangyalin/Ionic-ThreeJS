var express = require('express'),
    app = express();
var request = require("request")

//var Session = require('./mongodb_files/createSchema');
var fs = require("fs");
var baseUrl = "http://www.omdbapi.com/?";
//var url = "http://www.omdbapi.com/?s=SuperMan&y=&plot=full&r=json";
var urld = "http://www.omdbapi.com/?i=tt0348150&tomatoes=true&plot=short&r=json";

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/sessions', function(req,res){
 /* fs.readFile(__dirname+"/routes/"+"sessions.json","utf8", function(err,data){
    console.log(data);
    res.end(data);
  });
*/
  console.log("visited1"); 
  //var searchName=req.params.movieName;
  searchName="IP Man";
  request({
    url: baseUrl+'s='+searchName+'&y=&plot=full&r=json',
    json: true
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
    //  body = JSON.parse(body);
     //   console.log("visited1"); // Print the json response

        res.send(body.Search);
    }
  })

});

app.get('/sessions/:sessionImdbID', function(req,res){
  console.log("visited2");
   var imdbID = req.params.sessionImdbID;
   console.log(imdbID);
  request({
    url: baseUrl+'i='+imdbID+'&tomatoes=true&plot=short&r=json',
    json: true
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
    //  body = JSON.parse(body);
    //    console.log("visited1"); // Print the json response

        res.send(body);
    }
  })
 /*      var author = req.params.author;
       Session.findOne({author: author}, function(err,session){
        if(err) throw err;

        //session = JSON.parse(session);
        //object of the user
        console.log(session);
        res.send(session);
      });
*/
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