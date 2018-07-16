var express = require('express');
var router = express.Router();

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/the_irate_dev', {
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

module.exports = router
