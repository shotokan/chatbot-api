'use strict'
/**
 * author: ivan sabido
 * date: 28/06/2018
 * email: <isc_86@hotmail.com>
 * description: Rutas con sus respectivos controadores para el path ping.
 */
const asyncQuestionMiddleware = require('../../middlewares/question')

const SoldaiController = require('../../controllers/soldai')

module.exports = (app) => {
  app.get('/v1/query', asyncQuestionMiddleware, SoldaiController.query)
}
