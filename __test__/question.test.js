const request = require('supertest')

const app = require('../api/app')

describe('Probar nuestro mini servidor de express, con query.', () => {
  test('Debe responder al método Get', done => {
    request(app).get('/v1/query').then(response => {
      console.log(response.body)
      expect(response.statusCode).toBe(200)
      done()
    })
  })
})
