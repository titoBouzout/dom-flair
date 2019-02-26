var express = require('express')
var app = express()

var server = require('http').createServer(app)

app.use(express.static('./'))

server.listen(80)
