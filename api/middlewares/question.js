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

const asyncQuestionMiddleware = async (req, res, next) => {
  debug(`QuestionMiddleware: Consultando a soldai...`)
  const question = req.query.question
  let url = config.apiSoldai.url
  let key = config.apiSoldai.key
  let path = `?key=${key}&log=1&question=${question}`
  let soldaiResp = null
  try {
    soldaiResp = await axios.get(encodeURI(`${url}${path}`))
    // Se crea una propiedad en el objeto request y se le asigna la respuesta de soldai
    if (!soldaiResp.data) {
      throw Error('No se obtuvo una respuesta.')
    }
    req.soldaiAnswer = soldaiResp.data
    next()
  } catch (err) {
    debug(`QuestionMiddleware Error: ${chalk.red(err.message)}`)
    return next(Error('Me disculpo pero he tenido un problema al consultar tu pregunta. Intenta de nuevo mas tarde.'))
  }
}

module.exports = asyncQuestionMiddleware
