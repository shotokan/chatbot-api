'use strinct'

/**
 * author: ivan sabido
 * date: 28/06/2018
 * email: <isc_86@hotmail.com>
 * description: Controlador para poder realizar health check del servicio.
 */

const debug = require('debug')('soldai:api:controller:ping')
const chalk = require('chalk')

class PingController {
  async pong (req, res, next) {
    debug(`Ping: ${chalk.green('checking api health')}`)
    res.send({ message: 'pong' })
  }
}

module.exports = new PingController()
