'use strict'

const debug = require('debug')('soldai:api:db')

module.exports = {
  apiSoldai: {
    production: {
      key: process.env.SOLDAI_KEY,
      url: process.env.SOLDAI_URL || 'http://beta.soldai.com/bill-cipher/askquestion'
    },
    testing: {
      key: process.env.SOLDAI_KEY || '86f6bf7d2adf9e57dfec35b5b27359ab0b5c84fa',
      url: process.env.SOLDAI_URL || 'http://beta.soldai.com/bill-cipher/askquestion',
      logging: s => debug(s)
    },
    developing: {
      key: process.env.SOLDAI_KEY || '86f6bf7d2adf9e57dfec35b5b27359ab0b5c84fa',
      url: process.env.SOLDAI_URL || 'http://beta.soldai.com/bill-cipher/askquestion'
    }
  },
  pokeApi: {
    url: process.env.POKE_URL || 'https://pokeapi.co/api/v2/'
  },
  server: {
    port: 3000
  }
}
