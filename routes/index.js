var express = require('express');
var router = express.Router();

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
