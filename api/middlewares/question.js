'use strict'
/**
 * author: ivan sabido
 * date: 28/09/2018
 * email: <isc_86@hotmail.com>
 * description: Middleware que consulta a la api de soldai y añade la respuesta al objeto request de express.
 */

const debug = require('debug')('soldai:api:services')
const chalk = require('chalk')
const axios = require('axios')
const config = require('../../config/')
const response = require('../utils/response')
const utils = require('../utils')

const asyncQuestionMiddleware = async (req, res, next) => {
  debug(`QuestionMiddleware: Consultando a soldai...`)
  if (!req.query.question) {
    const uri = utils.getURI(req.protocol, req.originalUrl, req.get('host'))
    const message = 'No has realizado una pregunta. Para poder brindarte información debes realizar una pregunta de las características de un pokémon.'
    return res.send(response.success({ message }, 200, uri))
  }
  const question = req.query.question
  let path = `?key=${config.apiSoldai.key}&log=1&question=${question}`
  let soldaiResp = null
  let url = `${config.apiSoldai.url}/${path}`
  try {
    soldaiResp = await axios.get(encodeURI(url))
    // Se crea una propiedad en el objeto request y se le asigna la respuesta de soldai
    if (!soldaiResp.data) {
      throw Error('No se obtuvo una respuesta.')
    }
    req.soldaiAnswer = soldaiResp.data
    next()
  } catch (err) {
    // Si no se puede realizar la comuncación o hay algún problema con la api, se regresa una respuesta genérica.
    debug(`QuestionMiddleware Error: ${chalk.red(err.message)}`)
    return next(Error('Me disculpo pero he tenido un problema al consultar tu pregunta. Intenta de nuevo mas tarde.'))
  }
}

module.exports = asyncQuestionMiddleware
