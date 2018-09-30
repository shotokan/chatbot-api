'use strict'

/**
 * author: ivan sabido
 * date: 28/09/2018
 * email: <isc_86@hotmail.com>
 * description: Funciones de ayuda.
 */

const _url = require('url')

function getURI (protocol, originalUrl, host) {
  return decodeURIComponent(_url.format({
    protocol: protocol,
    host: host,
    pathname: originalUrl
  }))
}

module.exports = {
  getURI: getURI
}
