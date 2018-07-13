var express = require('express');
var router = express.Router();

router.get('/items', (req, res) => {
  res.json({
    status: 'success',
    items: [
      {
        _id: 'a',
        content: 'hello',
      },
      {
        _id: 'b',
        content: 'world',
      },
      ],
  })
})

module.exports = router;
