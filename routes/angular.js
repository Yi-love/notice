var express = require('express');
var router = express.Router();

router.post('/check/username', function(req, res, next) {
   console.log(req.body);
   var flg = parseInt(Math.random()*10)%2 == 0 ? true : false;
   res.send({isUnique:flg});
});
router.post('/signup', function(req, res, next) {
   console.log(req.body);
   res.send(req.body);
});

router.get('/check/username', function(req, res, next) {
   res.send('api is ok');
});
module.exports = router;