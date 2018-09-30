const request = require('supertest')

const app = require('../api/app')

describe('Probar nuestro mini servidor de express, con Ping.', () => {
  test('Debe responder al método Get', done => {
    request(app).get('/v1/ping').then(response => {
      expect(response.statusCode).toBe(200)
      done()
    })
  })
})
