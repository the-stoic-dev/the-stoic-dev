var express = require('express');
var router = express.Router();

const mongoose = require('mongoose')
const getConnectionString = () => {
  const isTestMode = process.env.NODE_ENV === 'test'
  const database = isTestMode
    ? 'the_stoic_dev-test'
    : 'the_stoic_dev'
  return `mongodb://localhost/${database}`
}

mongoose.connect(getConnectionString(), {
  // TODO: node:52734) DeprecationWarning: current URL string parser is
  // deprecated, and will be removed in a future version. To use the new parser,
  // pass option { useNewUrlParser: true } to MongoClient.connect.
  // useNewUrlParser: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('db connection is open')
})

const itemSchema = mongoose.Schema({
  content: String,
})

const Item = mongoose.model('Item', itemSchema)

router.get('/items', (req, res) => {
  Item.find((err, items) => {
    if (err) {
      // TODO: handle error
      return console.error(err)
    }
    res.json({
      status: 'success',
      items,
    })
  })
})

router.post('/items', (req, res) => {
  const { body } = req
  const newItem = new Item(body)

  newItem.save((err, item) => {
    if (err) {
      // TODO: handle error
      return console.error(err)
    }
    res.json({
      status: 'success',
      item,
    })
  })
})

router.delete('/items/:_id', (req, res) => {
  const { _id } = req.params

  Item.findByIdAndRemove(_id, (err) => {
    if (err) {
      // TODO: handle error
      return console.error(err)
    }
    res.json({
      status: 'success',
    })
  })
})

router.put('/items/:_id', (req, res) => {
  const { _id } = req.params
  const { body } = req

    Item.findByIdAndUpdate(_id, body, (err, originalItem) => {
      if (err || !originalItem) {
        // TODO: handle error
        return console.error(err)
      }

      // TODO: Consider situation where we PUT data fields that were not saved.
      // This response is lying, seeming to have persisted the data.
      res.json({
        status: 'success',
        item: {
          ...originalItem.toJSON(),
          ...body,
        },
      })
    })
})

module.exports = router
