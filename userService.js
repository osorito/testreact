var express = require("express");
var app = express();
var cors = require("cors");
var path = require("path");
app.use(cors());

var userDAO = require("./userDAO.js");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

//SECURE THE API
var https = require("https");
var fs = require("fs");
const basicAuth = require('express-basic-auth');
var privatekey = fs.readFileSync("./keys/localhost.key");
var certificate = fs.readFileSync("./keys/localhost.cert");
var credentials = {key: privatekey,cert:certificate};
var httpsServer = https.createServer(credentials,app);

/*
app.use(basicAuth({
  users: { 'admin': 'admin'}
}));
*/

app.use(bodyParser.json());
//static files
app.use(express.static(path.join(__dirname,'public')));

app.use(basicAuth({
  //users: { 'admin': 'admin' },
  authorizer: myAsyncAuthorizer,
  authorizeAsync: true,
  challenge: true,
  realm: 'Imb4T3st4pp',
  unauthorizedResponse: getUnauthorizedResponse
}));

function myAsyncAuthorizer(username, password, cb) {
  if (username=="admin" && password=="admin")
      return cb(null, true)
  else
      return cb(null, false)
}

function getUnauthorizedResponse(req) {
  return req.auth
      ? ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected')
      : 'No credentials provided'
}

function isEmpty(obj) {
  for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
          return false;
  }

  return JSON.stringify(obj) === JSON.stringify({});
}

/*
User fields
id 
username
password
groups: []
*/


//Note to self. Get has no body
app.get("/user/:id",function(request,response){
  var userid = request.params.id;
  console.log(userid);
  if(isNaN(userid) ){
    response.setHeader("content-type", "application/json");
    console.log("NOT A NUMBER");
    var error = {};
    error.errorCode =1;
    error.errorMessage = "Invalid user ID,User ID must be a number";
    console.log(error.errorMessage);
    response.end(JSON.stringify(error));
    
  }
  else{
    console.log("The user id pass on parameters is " + userid);
    userDAO.find(userid,function(err, result){
      response.setHeader("content-type", "application/json");
      if(err){
        var errror = {};
        error.errorCode =1;
        error.errorMessage = "No such user";
        console.log(error.errorMessage);
        response.end(JSON.stringify(error));
      }else{
        response.end(JSON.stringify(result));
      }
    });
  }

  
  
  //userDAO.find()
});

app.post("/user",jsonParser,function(request,response){
  var user =  request.body;
  console.log("Passed  user is " + user);
  if(isEmpty(user)){
    console.log("User is empty");
    var error = {};
    error.errorCode =2;
    error.errorMessage = "Invalid user!,User must not be empty";
    console.log(error.errorMessage);
    response.end(JSON.stringify(error));
  }else{
    console.log(user);
    console.log("Inside post");
    console.log("user id is " + user.id + " username is " + user.username);
    userDAO.save(user,function(err,result){
      response.setHeader("content-type", "application/json");
      if(err){
        var error = {};
        error.errorCode = 2;
        error.errorMessage = "User creation failed";
        response.end(JSON.stringify(error));
        console.log(error.errorMessage);
        response.end(JSON.stringify(error));
      }else{
        console.log("user creation");
        response.end(JSON.stringify(result));
        
      }
    });
  }
  


});

app.put("/user",jsonParser,function(request,response){
  var user = request.body;
  if(isEmpty(user)){
    console.log("User is empty");
    var error = {};
    error.errorCode =3;
    error.errorMessage = "Invalid user!,User must not be empty";
    console.log(error.errorMessage);
    response.end(JSON.stringify(error));
  }else{
    console.log(user);
    console.log("Inside PUT");
    console.log("user id is " + user.id + " username is " + user.username);
    userDAO.update(user,function(err,result){
      response.setHeader("content-type", "application/json");
      if(err){
        var error = {};
        error.errorCode = 3;
        error.errorMessage = "User update failed";
        response.end(JSON.stringify(error));
        console.log(error.errorMessage);
        response.end(JSON.stringify(error));
      }else{
        console.log("user updated");
        response.end(JSON.stringify(result));
      }
    });
  }
  
});

app.delete("/user/:username",function(request,response){
  var username = request.params.username;
  console.log("DELETE API " + username);
  if(/*isNaN(userid)||*/username==null){
    response.setHeader("content-type", "application/json");
    console.log("Empty User Name");
    var error = {};
    error.errorCode =1;
    error.errorMessage = "Empty UserName " + username;
    console.log(error.errorMessage);
    response.end(JSON.stringify(error));
    
  }else{
    console.log("The username passed on parameters is " + username);
    userDAO.delete(username,function(err,result){
      response.setHeader("content-type", "application/json");
      if(err){
        var error = {};
        error.errorCode = 4;
        error.errorMessage = "User deletion failed";
        response.end(JSON.stringify(error));
        console.log(error.errorMessage);
        response.end(JSON.stringify(error));
      }else{
        console.log("user deleted " + JSON.stringify(result));
        response.end(JSON.stringify(result));
      }
    });
  }
  
});

app.get("/users",function(request,response){
  console.log("Inside ALL");
  userDAO.findall(function(err,result){
    response.setHeader("content-type", "application/json");
    if(err){
      var error = {};
      error.errorCode = 5;
      error.errorMessage = "Get All users failed";
      response.end(JSON.stringify(error));
      console.log(error.errorMessage);
      response.end(JSON.stringify(error));
    }else{
      console.log("All Users");
      response.end(JSON.stringify(result));
    }
  });
});

app.use("/*",function(request,response){
  response.setHeader("content-type", "application/json");
  console.log("Default Error");
  var error = {};
      error.errorCode = 6;
      error.errorMessage = "Default Error";
      response.end(JSON.stringify(error));
      console.log(error.errorMessage);
      response.end(JSON.stringify(error));
});
/*
httpsServer.listen("5443",function(){

});

*/
app.listen(4000,()=>console.log("Server started, port: 4000" ));