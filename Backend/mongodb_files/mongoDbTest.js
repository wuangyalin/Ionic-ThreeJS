// new
var User = require('./user');
/*
//create a new user called chris
var chris = new User({
  name: 'chris',
  username: 'sevilayha',
  password: 'password'
});
//call the custom method. This will just add -dude to his name
//user will now be Chris-dude
chris.dudify(function(err,name){
  if(err) throw err;
  console.log("Your new name is "+ name);
});

//call the build-in save method to save to the database
chris.save(function(err){
  if(err) throw err;
  console.log('User saved successfully!');
})
*/
/*
var newUser = User({
  name: 'Peter Quill',
  username: 'starlord55',
  password: 'password',
  admin: true
});

newUser.save(function(err){
  if(err) throw err;

  console.log('User Created!');
});
*/
/*
// get all the users
User.find({},function(err,users){
  if(err) throw err;

  //object of all the users
  console.log(users);
});

//find one user
User.find({username: 'sevilayha'}, function(err,user){
  if(err) throw err;

  //object of the user
  console.log(user);
});
*/
/*
//find by ID
User.findById(1, function(err,user){
  if(err) throw err;

  //object of the user
  console.log(user);
});
*/
//---------Query-----------
// get any admin that was created in the past month

// get the date 1 month ago
var monthAgo = new Date();
monthAgo.setMonth(monthAgo.getMonth() - 1 );

User.find({admin: true}).where('created_at').gt(monthAgo).exec(function(err,users){
  if(err) throw err;

  //show the admins in the past month
  console.log(users);
});

//----------Update-------------
//get a user with ID of 1

















