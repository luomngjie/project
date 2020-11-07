var express = require('express');
var router = express.Router();
const db = require("../config/api.js")
var vertoken=require('../config/token/token')//设置token方法

/* GET home page.首页 */
router.get('/', function(req, res, next) {
  //res.render('index', { title: '哈哈哈' ,content:"我是你爸爸"});//express专门渲染视图所用 数据填充到模板
	// res.send(data)//这个方法是以json对象的形式返回去
	// 对应前台的传参 let {username,password} = req.body;
	db.dbQueryAll('fa_admin','',res,next)
 
});

// 渲染注册页
router.get('/regist', function(req, res, next) {
	let {username,password} = req.body;
	vertoken.setToken("何苦",'001').then(token=>{
		res.send({msg:"注册成功",code:1,data:token})
	})
	//res.render('regist', {})
});

// 渲染登录页
router.get('/login', function(req, res, next) {
	let {username,password} = req.body;
	res.send({msg:"登录成功",code:1,data:[]})
	//res.render('login', {})
});


module.exports = router;
