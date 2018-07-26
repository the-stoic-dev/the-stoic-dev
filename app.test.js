const app = require('./app')
const request = require('supertest')

describe('app', () => {
  describe('404 route', () => {
    it('should return JSON', () => {
      return request(app)
        .get('/wtfmate')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .then(response => {
          expect(response.body).toMatchObject({
            status: 'error',
            message: 'not found',
          })
        })
    })
  })
})
