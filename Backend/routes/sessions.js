var sessions = [
    {author:"Luke", idd:0, title:"Introduction to Ionic", speaker:"CHRISTOPHE COENRAETS", time:"9:40am", room:"Ballroom A", description: "In this session, you'll learn how to build a native-like mobile application using the Ionic Framework, AngularJS, and Cordova."},
    {author:"Maya", idd:1 ,title:"AngularJS in 50 Minutes", speaker:"LISA SMITH", time:"10:10am", room:"Ballroom B", description: "In this session, you'll learn everything you need to know to start building next-gen JavaScript applications using AngularJS."},
    {author:"Bob", idd:2 ,title:"Contributing to Apache Cordova", speaker:"JOHN SMITH", time:"11:10am", room:"Ballroom A", description: "In this session, John will tell you all you need to know to start contributing to Apache Cordova and become an Open Source Rock Star."},
    {author:"Tom", idd:3 , title:"Mobile Performance Techniques", speaker:"JESSICA WONG", time:"3:10Pm", room:"Ballroom B", description: "In this session, you will learn performance techniques to speed up your mobile application."},
    {author:"Jack", idd:4 ,title:"Building Modular Applications", speaker:"LAURA TAYLOR", time:"2:00pm", room:"Ballroom A", description: "Join Laura to learn different approaches to build modular JavaScript applications."}
];

exports.findAll = function (req, res, next) {
    res.send(sessions);
};

exports.findAuthor = function (req, res, next) {
    var author = req.params.author;
    for(i=0;i<sessions.length;i++){
    	if(sessions[i].author == author){
    		res.send(sessions[i]);
    	}
    }
};