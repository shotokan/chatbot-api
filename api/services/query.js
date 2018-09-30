'use strict'

/**
 * author: ivan sabido
 * date: 28/09/2018
 * email: <isc_86@hotmail.com>
 * description: Se encuentran las funciones para realizar la comunicación con la api de pokemon, y la lógica para regresar
 * los datos
 */

const debug = require('debug')('soldai:api:services')
const chalk = require('chalk')
const axios = require('axios')
const config = require('../../config/')

class QueryService {
  async query(soldaiResp={}) {
    debug(`Service: ${chalk.green('quering soldai')}`)
    let pok = config.pokeApi.url
    // Valida el patrón de respuesta asignado en soldai para cuando se tiene un elemento válido
    if (soldaiResp.current_response.message.indexOf("::") !== -1) {

      // Si el patrón existe se hace un split para dividir y tener en el índice 0 el número asignado a un pokemon
      // y el índice 1 para la característica.
      let data = soldaiResp.current_response.message.split("::")
      if (data.length < 1) {
        console.log('Ha habido un problema.')
        return 'Por el momento no puedo darte la información. Intenta de nuevo mas tarde.'
      }

      let pokResp = null
      // Se realiza la consulta a la api pokemon
      try {
        pokResp = await axios.get(`${pok}/pokemon/${data[0]}`)
      } catch(err) {
        return 'Me disculpo pero he tenido un problema al consultar tu pregunta. Intenta de nuevo mas tarde.'
      }
      let message = ''

      // Dependiendo de la catacteristica se genera una cadena con los datos a devolver.
      switch (data[1].trim()) {
        case 'types':
          message = this.getTypes(pokResp.data.types)
          break
        case 'abilities':
          message = this.getAbilities(pokResp.data.abilities)
          break
        case 'moves':
          message = this.getMoves(pokResp.data.moves)
          break
        case 'weight':
          message = `Su peso es ${pokResp.data.weight}`
          break
        case 'stats':
          message = this.getStats(pokResp.data.stats)
          break
        default:
          // Si el usuario pregunta por un número, se le devuelve el nombre del pokemon y un link de su imagen
          if (data[1].trim() !== "") {
            message = `${data[1].trim()}, puedes ver su imagen en el siguiente link: ${pokResp.data.sprites.back_default}`
          } else {
            // Si no se ha obtenido una caracteristica válida por algún error, se devuelve una respuesta por default.
            message = 'No he encontrado la respuesta, intenta con otra pregunta.'
          }
      }
      if (message !== '') {
        return message
      } else {
        return 'Una disculpa, pero por el momento no podré darte la información. Intenta mas tarde.'
      }
      
    }
    // En caso de que no exista el patrón del elemento en soldai, se devuelve la respuesta del hermes.
    return soldaiResp.current_response.message
  }

  getTypes(data) {
    let posiblesSingularAnswers = [
      'Es tipo',
      'Tipo',
      'El tipo de pokemon es',
      'Si no mal recuerdo es de tipo',
      'Según recuerdo es de tipo',
      'Estoy seguro que su tipo es',
      'Es de tipo'
    ]
    let answerIndex = Math.floor(Math.random() * 7)
    let resp = posiblesSingularAnswers[answerIndex]
    const typesAmount = data.length
    let counter = 0
    data.forEach(obj => {
      counter++
      resp += ` ${obj.type.name}`
      if (counter === typesAmount-1) {
        console.log('ultimo')
        resp += ' y'
      } else if (typesAmount > 1 && counter !== typesAmount) {
        resp += ','
      }
      console.log(obj.type.name)
    })
    if (counter > 0) resp += '.'
    return resp
  }

  getAbilities(data) {
    let resp = ''
    let posiblesPluralAnswers = [
      'Sus habilidades son los siguientes:',
      'Las habilidades pueden ser:',
      'Habilidades:',
      'Sus técnicas son:',
      'Sus habilidades son:',
      'Aqui tienes los habilidades que puede realizar:'
    ]
    let posiblesSingularAnswers = [
      'Su habilidad es la siguiente:',
      'La habilidad puede ser:',
      'Habilidad:',
      'Su habilidad es:',
      'Su técnica es:',
      'Aqui tienes su habilidad:'
    ]
    let answerIndex = Math.floor(Math.random() * 6)
    const typesAmount = data.length
    let counter = 0
    if (typesAmount > 1) {
      resp += posiblesPluralAnswers[answerIndex]
    } else {
      resp += posiblesSingularAnswers[answerIndex]
    }
    data.forEach(obj => {
      counter++
      resp += ` ${obj.ability.name}`
      if (counter === typesAmount-1) {
        resp += ' y'
      } else if (typesAmount > 1 && counter !== typesAmount) {
        resp += ','
      }
    })
    if (counter > 0) resp += '.'
    return resp
  }

  getMoves(data) {
    let posiblesPluralAnswers = [
      'Sus movimientos son los siguientes:',
      'Los movimientos pueden ser:',
      'Movimientos:',
      'Sus desplazamientos o movimientos son:',
      'Aqui tienes los movimientos que puede realizar:'
    ]
    let posiblesSingularAnswers = [
      'Su movimiento es el siguiente:',
      'El movimiento puede ser:',
      'Movimiento:',
      'Su desplazamiento o movimiento es:',
      'Aqui tienes el movimiento que puede realizar:'
    ]
    let answerIndex = Math.floor(Math.random() * 5)
    let resp = ''
    console.log(answerIndex)
    const typesAmount = data.length
    let counter = 0
    if (typesAmount > 1) {
      resp += posiblesPluralAnswers[answerIndex]
    } else {
      resp += posiblesSingularAnswers[answerIndex]
    }
    data.forEach(obj => {
      counter++
      resp += ` ${obj.move.name}`
      if (counter === typesAmount-1) {
        resp += ' y'
      } else if (typesAmount > 1 && counter !== typesAmount) {
        resp += ','
      }
    })
    if (counter > 0) resp += '.'
    return resp
  }

  getStats(data) {
    let posiblesPluralAnswers = [
      'Sus estadísticas son las siguientes:',
      'Aqui puedes ver sus estadísticas->',
      'Estadísticas:',
      'Aquí te paso las estadísticas, espero sean de utilidad->',
      'Te presento las estadísticas:',
      'Aqui puedes observas las estadísticas:',
      'Aqui puedes ver algunos de sus números->'
    ]
    let answerIndex = Math.floor(Math.random() * 7)
    let resp = ''
    const typesAmount = data.length
    let counter = 0
    resp += posiblesPluralAnswers[answerIndex]
    data.forEach(obj => {
      counter++
      resp += ` ${obj.stat.name}: ${obj.base_stat}%`
      if (counter === typesAmount-1) {
        resp += ' y'
      } else if (typesAmount > 1 && counter !== typesAmount) {
        resp += ','
      }
    })
    if (counter > 0) resp += '.'
    return resp
  }
}

module.exports = new QueryService()
