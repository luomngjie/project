// components/slideSwiper/slideSwiper.js
var app = getApp();
Component({
  data: {
    motto: 'Hello World',
    userInfo: {},
    windowWidth: wx.getSystemInfoSync().windowWidth,
    windowHeight:0,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    navData:[
        {
            text: '首页',
            typeId:0
        },
        {
            text: '手机',
            typeId:1
        },
        {
            text: '电脑办公',
            typeId:1
        },
        {
            text: '数码',
            typeId:1
        },
        {
            text: '生鲜',
            typeId:1
        },
        {
            text: '食品',
            typeId:1
        },
        {
            text: '运动',
            typeId:1
        },
        {
            text: '医药健康',
            typeId:1
        },
        {
          text: '母婴童装',
          typeId:1
        },
        {
          text:"礼品鲜花",
          typeId:1
        },
        {
          text:"酒水饮料",
          typeId:1
        }
    ],
    currentTab: 0,
    navScrollLeft: 0
},
//事件处理函数
onLoad: function () {
    if (app.globalData.userInfo) {
        this.setData({
            userInfo: app.globalData.userInfo,
            hasUserInfo: true
        })
    } else if (this.data.canIUse) {
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


    wx.getSystemInfo({
        success: (res) => {
          console.log(res)
            this.setData({
                pixelRatio: res.pixelRatio,
                windowHeight: res.windowHeight,
                windowWidth: res.windowWidth
            })
        },
    })       
},
methods:{
  switchNav(event){
    var cur = event.currentTarget.dataset.current; ;
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中                            
    this.setData({
        navScrollLeft: (cur - 2) * singleNavWidth
    })      
    if (this.data.currentTab == cur) {
        return false;
    } else {
        this.setData({
            currentTab: cur
        })
    }
  },
  stopTouchMove: function() {
    return false;
  },
  // switchTab(event){//current 改变时会触发
  //     var cur = event.detail.current;
  //     var singleNavWidth = this.data.windowWidth / 5;
  //     this.setData({
  //         currentTab: cur,
  //         navScrollLeft: (cur - 2) * singleNavWidth
  //     });
  //     console.log(cur)
  // }
}

})
 


  
  
