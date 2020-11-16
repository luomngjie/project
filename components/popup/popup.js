// components/popup/popup.js
Component({
  /**
   * 组件的属性列表
   * 参数列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showPopup:false,
    url:"../../pages/image/1.jpg",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //隐藏弹框
    hidePopup: function () {
      this.setData({
        showPopup: !this.data.showPopup
      })
    },
     //展示弹框
    showPopup(){
      this.setData({
        showPopup: !this.data.showPopup
      })
    }
  }
})
