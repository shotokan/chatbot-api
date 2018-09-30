'use strinct'

/**
 * author: ivan sabido
 * date: 28/06/2018
 * email: <isc_86@hotmail.com>
 * description: Controlador para poder realizar health check del servicio.
 */

const debug = require('debug')('soldai:api:controller:soldai')
const chalk = require('chalk')
const queryService = require('../services/query')
const utils = require('../utils')
const response = require('../utils/response')

class SoldaiController {
  constructor (socketio) {
    this.socketio = socketio
  }

  async query (req, res, next) {
    let uri = utils.getURI(req.protocol, req.originalUrl, req.get('host'))
    try {
      debug(`Query Soldai: ${chalk.green('query to soldai api')}`)
      let message = await queryService.query(req.soldaiAnswer)
      res.send(response.success({ message }, 200, uri))
    } catch (err) {
      debug(`Query Soldai Controller Error: ${chalk.red(err.message)}`)
      res.status(400).send(response.error('Internal Problem', 400, uri, err.message))
    } 
  }
}

module.exports = new SoldaiController()
