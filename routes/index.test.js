const app = require('../app')
const request = require('supertest')

describe('routes/index', () => {
  describe('/items', () => {
    it('should save the item and be saved', () => {
      const someCoolItem = { content: "blah blah" }
      // Save a new item.
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
          // comparing values we sent with what was saved
          expect(item).toMatchObject(someCoolItem)
          return item
        })
      //  Now we test that we can GET the saved item.
        .then((item) => {
          return request(app)
            .get('/items')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
              // testing response form
              expect(response.body).toMatchObject({
                status: 'success',
              })

              const { items } = response.body
              expect(items).toBeTruthy()
              const savedItem = items.find(x => x._id === item._id)
              expect(savedItem).toMatchObject(item)
            })
        })
    })

    it('should save the item and delete it', () => {
      const someCoolItem = { content: "delete me, please" }
      // Save a new item.
      return request(app)
        .post('/items')
        .send(someCoolItem)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          const { item } = response.body
          return item
        })
      //  Now we test that we can GET the saved item.
        .then((item) => {
          return request(app)
            .delete(`/items/${item._id}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
              // testing response form
              expect(response.body).toMatchObject({
                status: 'success',
              })
            })
        })
    })
  })
})
