//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    current:"1",//点击当前项
    modalHidden: true,//控制弹窗显示
    urlContent:"",//识别出来的url
    content:"",//粘贴板的内容
    successUrl:"",//识别成功后的url
    successposter:"",//识别成功后的封面
    poster: 'http://i2.hdslb.com/bfs/archive/d2d4b055c52ccb8535df3c2b3af1b3d6aff51ada.jpg',//视频封面
    name: '听完#彭昱畅的创业思路，我感觉错过几个亿 #刘昊然  #一点就到家',//视频标题
    src: 'https://minivideo.xiu123.cn/original/cb50cd8777fd483fac334058b952d1f2/1414b152-1737975592e.mp4',//视频链接地址
  },
  onReady: function () {
    //获得popup组件
    this.popup = this.selectComponent("#popup");
  },
  onLoad: function () {
    let self = this
    wx.getClipboardData({//检测粘贴板内容 提取url
      success (res){
        self.regUrl(res.data,true)
      }
    })
  },

  /**正则验证文本内url 
   * { data } 传入的字符串 数据
   * { isToast } 是否显示模态框
  */
  regUrl(data,isToast){
    let self = this
    let urlpattern= /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;//解析出数组地址
    let reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/  //解析出数组，内容详细
    if(data.match(reg)!=null||data.match(reg)!=undefined){
      let url = data.match(reg)[0]
      if(isToast){
        wx.showModal({
          title: '是否获取剪贴板中的链接资源',
          content:url,
          success (rest) {
            if (rest.confirm) {
              self.setData({
                urlContent:url,
                content:data
              })
            } else if (rest.cancel) {
              return
            }
          }
        })
      }else{
        self.setData({
          urlContent:url,
          content:data
        })
        return url
      }
     
    }
  },

  /***获取文本框内容* */
  getTextVal(res){
    let value = res.detail.value,self=this
    if(value){
      this.regUrl(value,false)
    }

    
  },

  /**
   *1 一键去水印 
   *2 粘贴内容
   *3 赞赏作者
   */
  clearwatermark(e){
    let self = this
    const arr = [1,2,3]
    this.setData({
      current:e.currentTarget.dataset.id
    })
    if(e.currentTarget.dataset.id==1){
      this.regUrl(this.data.content,false)
      setTimeout(()=>{
        if(this.data.urlContent){
          this.http()
        }else{
          wx.showToast({
            title: '暂未识别出对应链接，请重新输入',
            icon:'none'
          })
        }
       
      },100)
    }else if(e.currentTarget.dataset.id==2){
      wx.getClipboardData({
        success(res){
          self.setData({
            content:res.data
          })
        }
      })
    }else{
      this.popup.showPopup(); 
    }
   
  },

  /**下载应用 */
  downApk(){
    wx.showToast({
      title: '暂未开通',
      icon:"none"
    })
  },

  /****b保存视频到相册 */
  saveVideo(){
    this.downloadFile('video', this.data.successUrl)
  },

  /****
   * 去水印调用接口
   */
  http(){
    let self = this
    wx.showLoading({title:"加载中..."})
    wx.request({
      url: 'http://192.168.0.195:3000/video',
      data: {url:this.data.urlContent},
      success (res) {
        //识别出来的url=> urlContent
        //粘贴板的内容 content
        //识别成功后的url => successUrl
        //识别成功后的封面 successposter
        if(res.data.code==200){
          let { successUrl } = res.data
          self.setData({
            successUrl:successUrl
          })
         
        
          wx.hideLoading()
        }else{
          wx.hideLoading()
        }
        
      }
    })
  },

  /**
 * 下载单个文件
 * @param {string} [type]
 * @param {string} url
 * @callback successCallback
 * @callback failCallback
 */
  downloadFile(type, url, successc, failc){
    let self = this
    wx.showLoading({
      title: '正在下载',
      mask: true
    })
    self.downloadSaveFile(
      type,
      url,
      () => {
        wx.hideLoading();
        wx.showToast({
          title: '下载成功',
          icon: 'none',
        })
        successc && successc();
      },
      (errMsg) => {
        wx.hideLoading();
        wx.showToast({
          title: errMsg,
          icon: 'none',
        })
        failc && failc();
      }
    );
  },

  /****下载文件 */
  downloadSaveFile(type, url, successc, failc){
    wx.downloadFile({
      url: url,
      success: res => {
        if (res.statusCode === 200) {
          if (type === 'video') {
            //类型为视频
            wx.saveVideoToPhotosAlbum({
              filePath: res.tempFilePath,
              success: res => {
                successc && successc();
              },
              fail: res => {
                failc && failc('保存失败');
              }
            })
          } else if (type === 'image') {
            //类型为图片
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: res => {
                successc && successc();
              },
              fail: res => {
                failc && failc('保存失败');
              }
            })
          }
        } else {
          failc && failc('状态码非200');
        }
      },
      fail: res => {
        failc && failc('下载失败');
      }
    })  
  },

  /**前去赞助 */
  modalConfirm(){
    this.setData({
      modalHidden: true
    })
  },

  /**我再想想 */
  modalCandel: function() {
    // do something
    this.setData({
      modalHidden: true
    })
  },
})
