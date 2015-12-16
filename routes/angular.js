var express = require('express');
var router = express.Router();

/**
 * 第 7章 过滤器
 */
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

/**
 * 第18 章 服务器通讯
 */
var hits = 20;
router.get('/hits' , function(req , res , next){
	res.send(200 , {hits : hits});
});

router.post('/hit' , function(req , res , next){
	hits += 1;
	res.send(200 ,{hits:hits});
});
module.exports = router;