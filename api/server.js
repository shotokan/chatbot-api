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
const app = require('./app')
const http = require('http')
const chalk = require('chalk')
const debug = require('debug')('soldai:api:server')
/**
 * server configuration
 */
const config = require('../config/')
const server = http.Server(app)

// environment: development, staging, testing, production
const environment = process.env.NODE_ENV

// server listening
server.listen(config.server.port, () => {
  debug(`Server Running on port: ${chalk.cyan(config.server.port)}`)
  if (environment !== 'production' &&
    environment !== 'developing' &&
    environment !== 'testing'
  ) {
    console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`)
    process.exit(1)
  }
})
