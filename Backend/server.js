var express = require('express'),
    app = express();
var fs = require("fs");

	/*
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({
		    extended: true
		}));
		app.use(methodOverride());      // simulate DELETE and PUT
*/	
// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

//app.get('/sessions', sessions.findAll);

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
	  // 	console.log("sessions.length:   "+sessions.length);
	  // 	console.log("sessions[0].author:  "+sessions[0].author);
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
