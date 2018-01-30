var express = require('express');
var app = express();
var route = express.Router();
var fs = require('fs');
var path = require('path');
var port = process.env.PORT || 7777;

route.use(express.static(__dirname+'/'));
app.get('/', function(req,res){
    res.sendFile(__dirname+'/index.html');
});

app.get('/resultPath/*', function(req,res){
    var fpath = req.params;
    res.sendFile(__dirname+'/'+fpath[0]);
});

app.listen(port, function(){
    console.log('Starting node.js on port '+port);
})