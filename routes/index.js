var express = require('express');
var router = express.Router();

const items = [
  {
    _id: 'a',
    content: 'hello',
  },
  {
    _id: 'b',
    content: 'world',
  },
]

router.get('/items', (req, res) => {
  res.json({
    status: 'success',
    items,
  })
})

router.post('/items', (req, res) => {
  console.log(req)
  res.end()
})

module.exports = router;
