// handy
const fs = require('fs')
const path = require('path')
// server
const express = require('express')
const app = express()

// server
var http = require('http').Server(app)

app.all('*', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'X-Requested-With')
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
	res.header('Access-Control-Allow-Credentials', 'true')
	next()
})

app.use(express.static(__dirname))

http.listen(80, function() {
	console.log('listening on *:80')
})
