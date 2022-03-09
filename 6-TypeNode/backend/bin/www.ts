#!/usr/bin/env node

/**
 * Module dependencies.
 */

let app = require('../app')
const fs = require('fs')
const http = require('http')
const https = require('https')

const credentials = {
  key: fs.readFileSync('ssl/localhost.key'),
  cert: fs.readFileSync('ssl/localhost.crt')
}

/**
 * Get port from environment and store in Express.
 */

let port = normalizePort(process.env.PORT || '5002')
app.set('port', port)

/**
 * Create https server.
 */

 let httpServer = http.createServer(app)
 let httpsServer = https.createServer(credentials, app)

/**
 * Listen on provided port, on all network interfaces.
 */

 httpServer.listen('5003')
 httpsServer.listen(port)
 httpsServer.on('error', onError)
 httpsServer.on('listening', onListening)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  let port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for https server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for https server "listening" event.
 */

function onListening() {
  let addr = httpsServer.address()
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  console.log(`Listening on ${bind} ☕`)
  console.log(`Serving running at https://localhost:5002/api`)
  console.log(`                Or  http://localhost:5003/api`)
}
