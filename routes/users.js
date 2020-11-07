var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/login', function(req, res, next) {
  let {username,password} = req.body;
  res.send({msg:"成功",code:1,data:req.body})
});

module.exports = router;
