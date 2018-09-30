'use strict'

 /**
 * author: ivan sabido
 * date: 28/09/2018
 * email: <isc_86@hotmail.com>
 * description: Rutas para la obtener la respuesta a una pregunta.
 */

const asyncQuestionMiddleware = require('../../middlewares/question')

const SoldaiController = require('../../controllers/soldai')

module.exports = (app) => {
  app.get('/v1/query', asyncQuestionMiddleware, SoldaiController.query)
}
