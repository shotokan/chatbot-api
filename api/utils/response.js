'use strict'

/**
 * author: ivan sabido
 * date: 28/09/2018
 * email: <isc_86@hotmail.com>
 * description: Funciones de ayuda para crear las respuestas de los controladores.
 */

function success (data, code, url) {
  return {
    request: (new Date()).getTime(), // timestamp
    url: url,
    data: data,
    code: code
  }
}

function error (title, status, url, message) {
  return {
    request: (new Date()).getTime(), // timestamp
    status: status,
    source: url,
    title: title,
    detail: message
  }
}

module.exports = {
  success: success,
  error: error
}
