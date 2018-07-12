const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'BDM11';

module.exports = {
  save : function(object , cb){
    console.log("Inside save");
    console.log("object received: user id " + object.id + " username " + object.username);

    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
      if (err) throw err;
      var dbo = db.db("BDM11");
      
      dbo.collection("Users").insertOne(object, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted " + res);
        cb(null,res.result);
        db.close();
      });
    });
   
    
  } ,
  find : function(object, cb){
    console.log("Inside find " + object);
    //Create the user
    /*
    User fields
    id 
    username
    password
    groups: []
    */
   /*
    var user = {};
    user.id = 1;
    user.username="osorito";
    user.password = "kitten$123";
    user.groups = [];
*/

    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
      if (err) throw err;
      console.log(object)
      var i = parseInt(object)
      var dbo = db.db("BDM11");
      var query = { id: i};
      console.log("My object value inside mongodb connect is " + object);
      dbo.collection("Users").find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log("my result " + result);
        cb(null,result);
        db.close();
      });
    });

   
    


    //cb(null,user);
  },
  update : function(object , cb){
    console.log("Inside UPDATE");
    console.log("object received: user id " + object.id + " username " + object.username);

    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
      if (err) throw err;
      var dbo = db.db("BDM11");
      //var i = parseInt(object.id);
      var user = object.usename;
      console.log("The user id in object is " + i + " name is " + object.username + ' password is ' + object.password);
      var myquery = { usename : i };
      var newvalues = { $set: {username: object.username, password: object.password} };
      dbo.collection("Users").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log(res.result);
        cb(null,res.result);
        db.close();
      });
    });

    //cb(null,object);
  },
  delete : function(object , cb){
    console.log("INSIDE DELETE");  
    

    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
      if (err) throw err;
      var dbo = db.db("BDM11");
      var _username = object;//parseInt(object);
      console.log("Passed username " + _username);
      var myquery = { username: _username };
      console.log('username to search is ' + _username);
      dbo.collection("Users").deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        console.log("1 document deleted" + obj);
        var deletedUser = {};
        deletedUser.id = object.id;
        deletedUser.Message="User Deleted";
        cb(null,deletedUser);
        db.close();
      });
    });

    
    
  },
  findall : function(cb){ 
    console.log("Inside ALL");
    //var result = {};
    
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
      if (err) throw err;
      var dbo = db.db("BDM11");
      dbo.collection("Users").find().toArray(function(err, result) {
        if (err) throw err;
        console.log("my result " + result);
        cb(null,result);
        db.close();
      });
    });


    //cb(null,result);
  }
}
