var app=require('express')()
var http=require('http').Server(app)
var admin = require("firebase-admin");

var serviceAccount = require("./google_firebase_json_file.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://database_url.com"
});

app.get('/',function(req,res){
console.log('hello')
var new_time=new Date()
console.log(new_time)
var msg={Sender:'Kiss',
type:'open',
Badge:'urgent',
title:'Hello message',
message:'Test message from server',
Time:new_time.toString()
}
admin.database().ref('messages').push(msg);

var res1=admin.database().ref('number').push({1:[]});
console.log(res1)
})

http.listen(3000)
