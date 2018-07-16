const app = require('../app')
const request = require('supertest')

describe('routes/index', () => {
  describe('/items', () => {
    describe('POSTing new items', () => {
      it('should return the new item', () => {
        return request(app)
          .post('/items')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(response => {
            console.log('body:', response.body)
            expect(response.body._id).toBeTruthy()
            // expect(response.body._id).toBeTruthy()
            // expect(response.body._id).not.toBeUndefined()
          })
      })
    })
  })
})
