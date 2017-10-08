"use strict";
const express = require("express");
var path = require('path');
let app = express();
const http = require('http').Server(app);
let io = require('socket.io')(http);
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient
let userName = [];
let db;

MongoClient.connect('mongodb://deekshitr:deekshitr123@ds123124.mlab.com:23124/chartapp', function(err, database) {
  if (err) return console.log(err)
  db = database;
	http.listen(3001, function(){
	  console.log('listening on 3001');
	});
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname,'..','/')));
app.use(express.static(path.join(__dirname,'..', 'server','/')));
app.use(express.static(path.join(__dirname, '..', 'client','/')));
app.use(express.static(path.join(__dirname , '..', 'node_modules')));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/message', function(req, res){
	res.redirect('/');
});

app.get('/api/users/:name',function(req,res){
	 var username= req.params.name;
	db.users.find({uname:username}).exec(function(err,result){
		if(!err){
			console.log('data get',result);
			res.json({data:result,succes:true});
		}
		else{
			res.json(err);
		}
		
	})
})

app.put('/api/users/:id',function(req,res){
	 var connections = req.body.connection;
	 var user = req.body.user;
	db.users.update({uname:user.name,{$set:{connected_users:connections}}}).exec(function(err,result){
		if(!err){
			console.log('data update',result);
			res.json({data:result,succes:true});
		}
		else{
			res.json(err);
		}
		
	})
})

app.post('/api/users',function(req,res){
	var user=req.body;
	db.users.find({uname:user.name}).exec(function(err,result){
		console.log('result',result);
		if(!err){
			db.users.save(user,function(err,postresult){
				if(!err){
					console.log('result',postresult);
					res.json({data:result,succes:true});
				}
				else{
					console.log('err',err);
				}
			})
		}
		else{
			console.log('err',err);
		}
	})
})

io.on('connection', function(socket){
	userName.push(socket.handshake.query.userName);
	io.emit("updateSocketList", userName);
	io.emit("addUserToSocketList",socket.handshake.query.userName);
	
	socket.on('disconnect', function(){
		let name=socket.handshake.query.userName;
		let userIndex = userName.indexOf(socket.handshake.query.userName);
		 if (userIndex != -1) {
		 	userName.splice(userIndex, 1);
			io.emit("updateSocketList", userName);
			io.emit("removeUserFromSocketList",name);
		 }
  	});

	socket.on('chatMessageToSocketServer', function(msg, func){
		func("Message recieved!",socket.handshake.query.userName);
		let name = socket.handshake.query.userName;
		let sockectObj = {name,msg}
		io.emit('broadcastToAll_chatMessage', sockectObj);
	});
});


