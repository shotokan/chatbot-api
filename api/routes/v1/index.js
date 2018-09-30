'use strict'

/**
 * author: ivan sabido
 * date: 28/06/2018
 * email: <isc_86@hotmail.com>
 * description: se realiza la configuración de las rutas con sus respectivos controladores.
 */

const ping = require('./ping')
const query = require('./soldai')

module.exports = (app) => {
  ping(app)
  query(app)
}
