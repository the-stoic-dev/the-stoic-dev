const app = require('../app')
const request = require('supertest')

describe('routes/index', () => {
  describe('/items', () => {
    describe('POSTing new items', () => {
      it('should return the new item', () => {
        const someCoolItem = { content: "blah blah" }
        return request(app)
          .post('/items')
          .send(someCoolItem)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(response => {
            // testing response form
            expect(response.body).toMatchObject({
              status: 'success',
              item: {},
            })

            const { item } = response.body
            // an id was generated
            expect(item._id).toBeTruthy()

            // comparing values we sent with what was saved
            expect(item).toMatchObject(someCoolItem)
          })
      })
    })
  })
})
