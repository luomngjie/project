var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let http = require('http'),
    url = require('url'),
    fs = require('fs'),
	ejs = require("ejs");
	
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var vertoken=require('./config/token/token')//设置token方法
var expressJwt=require('express-jwt')//验证token是否过期并规定那些路由不需要验证 express-jwt({})

var app = express();
// view engine setup 此处使用的是jade语法，我们将其修改为html
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.set('views', path.join(__dirname, 'views'));
app.engine("html",ejs.__express);
app.set("view engine","html");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**解决前端跨域问题**/
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin","*"); //设置允许跨域的域名 * 代表所有域名
	
	res.header("Access-Control-Allow-Headers", "Origin,Content-Type,Accept,Authorization,token,X-Requested-With");//允许的header类型
	
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");//跨域允许的请求方式
	next();
});

//解析token获取用户信息
app.use(function(req, res, next) {
    var token = req.headers['authorization'];
    if(token == undefined){
        return next();
    }else{
        vertoken.getToken(token).then((data)=> {
            req.userToken = data;
            return next();
        }).catch((error)=>{
            return next();
        })
    }
});



app.use('/', indexRouter);
app.use('/user', usersRouter);

//验证token是否过期并规定那些路由不需要验证
app.use(expressJwt({
    secret:'lmj_first_token',
    algorithms:['HS256']
}).unless({
    path:['/login','/register']  //不需要验证的接口名称
}))
//token失效返回信息
app.use(function(err,req,res,next){
    if(err.status==401){
        return res.status(401).send('token失效')
         //可以设置返回json 形式  res.json({message:'token失效'})
    }
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});




//const cors = require('cors');
// // origin 可配置多个域名白名单（数组），也可配置一项域名（字符串）
//app.use(cors({credentials: false, origin: ['http://localhost:8081/'],headers:'X-Requested-With,Content-Type,username',methods:'PUT,POST,GET,DELETE,OPTIONS'}));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
