var jwt = require('jsonwebtoken');
var jwtScrect = 'lmj_first_token';  //签名

//登录接口 生成token的方法
let setToken = (user_name, user_id)=>{
	return new Promise((resolve, reject)=>{
		const token = jwt.sign({ user_name: user_name, user_id: user_id }, jwtScrect, { expiresIn: '48h' });
		resolve(token)
	})
}

//各个接口需要验证token的方法
let getToken=(token)=>{
	return new Promise((resolve,reject)=>{
		if(!token){
			console.log('token是空的')
			reject({
				error: 'token 是空的'
			})
		}else{
			var info = jwt.verify(token.split(' ')[1], jwtScrect);
			resolve(info);  //解析返回的值（sign 传入的值）
		}
	})
}

module.exports = {
	setToken,getToken
}