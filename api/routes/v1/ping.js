'use strict'
/**
 * author: ivan sabido
 * date: 28/06/2018
 * email: <isc_86@hotmail.com>
 * description: Rutas con sus respectivos controadores para el path ping.
 */

const PingController = require('../../controllers/ping')

module.exports = app => {
  app.get('/v1/ping', PingController.pong)
}
