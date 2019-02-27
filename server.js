var express = require('express')
var app = express()

var server = require('http').createServer(app)

var serveIndex = require('serve-index')

app.use(express.static('./www/'))
app.use(serveIndex('./www/'))

server.listen(80)
