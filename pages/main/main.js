//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    swiperShow:false,
    list:[],
    userInfo: {},
    url:"../image/1.jpg",
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onReady: function () {
    //获得popup组件
    this.popup = this.selectComponent("#popup");
    setTimeout(()=>{
      this.setData({
        swiperShow:true
      })
    },4000)
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
     
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {   
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
   this.getManinList()
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  /**列表点击方法 */
  Allmethod(e){
    let self = this
    let id = e.currentTarget.dataset.id
    let data = this.data.list
    const ret = data.filter(item=>item.id == id)
    ret.forEach(item=>{
      if(item.id==0){
        self.togglePopup()
       return
      }
     wx.showModal({
       title:item.name,
       content:item.content
     })
    })
  },

  /**   
 * 预览图片  
 */
togglePopup: function (event) {   
  this.popup.showPopup(); 
 
  },  

  /****获取个人中心列表 */
  getManinList(){
    let self = this
    wx.showLoading()
    wx.request({
      url:'http://192.168.0.195:3000/center',
      success:res=>{
        if(res.data.code=='200'){
          self.setData({
            list:res.data.data
          })
          wx.hideLoading()
        }else{
          wx.hideLoading()
        }
       
      }
    })
  }
})
