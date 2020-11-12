const request = require('request'),
	  images = require('images');
let send = {
    'Error:':'请求失败',
    'code':0,
}
 
 /**
  * 去除视频水印
  * **/
let Videowm = async (req, res, next)=>{
    let { url } = req.query;
    url = httpString(url);
 
    //前端传过来的地址 进行重定向拿到 item_ids 并且返回
    let watermark = await new Promise(resolve=>{
        request(url,(error, response, body) => {
			console.log(error)
        if (!error && response.statusCode == 200) {
            let href = response.request.href;
            let id = void 0;
            try {
                id = href.match(/video\/(\S*)\/\?region/)[1];
            } catch (error) {
                res.json(send)
                return false;
            }
            resolve(`https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=${id}`);
        }else{
            res.json(send)
        }
        })
    });
    
    //拿到完整地址返回指定数据 
    request(watermark,async (error, response, body)=>{
        if (!error && response.statusCode == 200) {
            let result = JSON.parse(body);
            let data = result.item_list[0];
            //视频url解析
            let video = await videourl(data['video']["play_addr"]["url_list"][0]);
            // 拼接返回指定数据
            res.json({
				"content":data["share_info"]["share_title"],
                'title':data["share_info"]["share_title"],
                'successposter':data['video']["origin_cover"]["url_list"][0],
                'successUrl':video,
                'audio':data['music']["play_url"]["uri"],
                'code':200,
            })
        }else{
            res.json(send)
        }
    })
}
 
//解析视频
const videourl = async (url)=>{
   //截取字符串 wm
   url = url.replace(/wm/g,'');
   return await new Promise(resolve=>{
    request(url,(error, response, body) => {
        resolve(response.request.href)
    })
   })
}
 
//解析字符串里面的url
const httpString = (s) =>{
    let reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
    try {
        return s.match(reg)[0];
    } catch (error) {
        return null;
    }
}

/**
 * 缩放图像
 * @param srcImg    被缩放图像
 * @param size      缩放后图像的宽度（图像高度等比缩放）
 */
const resizeCurrentImg  = (srcImg,size) => {
	images(srcImg).resize(size).save(srcImg,{quality : 100})
};

/**
 * 缩放图像
 * @param srcImg    源图像
 * @param width     缩放后的宽度
 * @param height    缩放后的高度
 */
const resizeCurrentImgWithArgs = function(srcImg, width,height){
    images(srcImg)                     //加载源图像
        .resize(width,height)                          //设置图像宽高，如果height未指定，则根据当前宽高等比缩放
        .save(srcImg, {               //保存当前图像至srcImg，图像质量100
            quality : 100
        });
};

/**
 * 图像缩放
 * @param srcImg    源图像
 * @param dstImg    生成图像
 * @param size      生成图像宽度（高度会自适应缩放）
 */
const resizeImg = function(srcImg, dstImg,size){
    images(srcImg)                     //加载源图像
        .resize(size)                          //设置图像宽高，如果height未指定，则根据当前宽高等比缩放
        .save(dstImg, {               //保存当前图像至srcImg，图像质量100
            quality : 100
        });
};

/**
 * 图像缩放
 * @param srcImg    源图像
 * @param dstImg    生成图像
 * @param width     缩放后的宽度
 * @param height    缩放后的高度
 */
const resizeImgWithArgs = function(srcImg, dstImg,width,height){
    images(srcImg)                     //加载源图像
        .resize(width,height)                          //设置图像宽高，如果height未指定，则根据当前宽高等比缩放
        .save(dstImg, {               //保存当前图像至srcImg，图像质量100
            quality : 100
        });
};

/**
 * 添加水印
 * @param srcImg    源图
 * @param watermarkImg  水印图
 * @param x     添加水印水平位置x
 * @param y     添加水印垂直位置y
 */
const addWatermark = function(srcImg,watermarkImg,x,y){
    images(srcImg)
        .draw(watermarkImg, x, y)
        .save(srcImg, {
            quality : 100                    //保存图片到文件,图片质量为100
        });
};

/**
 * 获取图像的宽高
 * @param srcImg    源图像
 * @param callBack
 */
const ofSize = function(srcImg,callBack){
    callBack(images(srcImg)//加载源图像，获取图像大小，返回结果：{ width: 1001, height: 897 }
        .size());
};
 
module.exports = {
    Videowm
}