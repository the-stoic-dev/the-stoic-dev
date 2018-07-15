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


var kittySchema = mongoose.Schema({
  name: String
})

var Kitten = mongoose.model('Kitten', kittySchema)
var silence = new Kitten({ name: 'Silence' })

silence.save(function (err, fluffy) {
  if (err) return console.error(err)
})

const items = []

router.get('/items', (req, res) => {
  res.json({
    status: 'success',
    items,
  })
})

router.post('/items', (req, res) => {
  const { body } = req
  items.push(body)
  res.json({
    status: 'success',
    item: body,
  })
})

module.exports = router
