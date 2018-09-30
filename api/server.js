'use strict'

 /**
 * author: ivan sabido
 * date: 28/09/2018
 * email: <isc_86@hotmail.com>
 * description: Archivo que ejecuta el servidor de express.
 */

/**
 * third party libraries
 */
const bodyParser = require('body-parser')
const express = require('express')
const helmet = require('helmet')
const http = require('http')
const cors = require('cors')
const chalk = require('chalk')
const routes = require('./routes/v1')
const debug = require('debug')('soldai:api:server')

/**
 * project libraries
 */

const utils = require('./utils')
const response = require('./utils/response')

/**
 * server configuration
 */
const config = require('../config/')

// environment: development, staging, testing, production
const environment = process.env.NODE_ENV

/**
 * express application
 */
const app = express()
const server = http.Server(app)

// allow cross origin requests
// configure to only allow requests from certain origins
app.use(cors())

// secure express app
app.use(helmet({
  dnsPrefetchControl: false,
  frameguard: false,
  ieNoOpen: false
}))

// parsing the request bodys
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// routes
routes(app)

// handling errors
app.use((err, req, res, next) => {
  debug(`Error: ${chalk.red(err.message)}`)
  let uri = utils.getURI(req.protocol, req.originalUrl, req.get('host'))
  res.status(400).send(response.error('Internal Problem', 400, uri, err.message))
})

// server listening
server.listen(config.server.port, () => {
  if (environment !== 'production' &&
    environment !== 'developing' &&
    environment !== 'testing'
  ) {
    console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`)
    process.exit(1)
  }
})
