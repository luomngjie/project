// components/indexComponent/indexComponent.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    pages:[],
    background: [{
      url:"//m.360buyimg.com/mobilecms/s700x280_jfs/t1/116088/38/3943/194946/5eab086fE3f314a75/062254f477d543bf.jpg!cr_1125x445_0_171!q70.jpg.dpg"
    },{
      url:"//m.360buyimg.com/mobilecms/s700x280_jfs/t1/87305/35/15561/121624/5e72e178E4fb07cbc/68de1f3bd96889dc.jpg!cr_1125x445_0_171!q70.jpg.dpg"
    },{
      url:"//m.360buyimg.com/mobilecms/s700x280_jfs/t1/72754/37/848/351440/5cf153beE6917c64d/a4c8524b11633750.jpg!cr_1125x445_0_171!q70.jpg.dpg"
    }],
    iconUrl:[
      {
        url:'../../pages/images/1.png',
        title:"天猫精品",
        id:0
      },
      {
        url:'../../pages/images/2.png',
        title:"今日爆款",
        id:0
      },
      {
        url:'../../pages/images/3.png',
        title:"天猫国际",
        id:0
      },
      {
        url:'../../pages/images/4.png',
        title:"天猫超市",
        id:0
      },
      {
        url:'../../pages/images/5.png',
        title:"饿了么",
        id:0
      },
      {
        url:'../../pages/images/6.png',
        title:"天猫超市",
        id:0
      },
      {
        url:'../../pages/images/7.png',
        title:"充值中心",
        id:0
      },
      {
        url:'../../pages/images/8.png',
        title:"金币家园",
        id:0
      },
      {
        url:'../../pages/images/7.png',
        title:"充值中心",
        id:0
      },
      {
        url:'../../pages/images/8.png',
        title:"金币家园",
        id:0
      },
      {
        url:'../../pages/images/7.png',
        title:"充值中心",
        id:0
      },
      {
        url:'../../pages/images/8.png',
        title:"金币家园",
        id:0
      },
      {
        url:'../../pages/images/7.png',
        title:"充值中心",
        id:0
      },
      {
        url:'../../pages/images/8.png',
        title:"金币家园",
        id:0
      },
    ],
    shops:[
      {
        title:"瑞士达光米P6迷你投影仪家用巨无霸",
        img:"../../pages/images/tooopen_sy_143912755726.jpg",
        price:58,
        content:"找相似"
      },
    ],
    indicatorDots: true,
    isonSwiper:false,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500
  },
  attached (){
      const pages = [];
      this.data.iconUrl.forEach((item,index)=>{
        const page = Math.floor(index/10);
        if(!pages[page]){
          pages[page]=[];
        }
        pages[page].push(item)
      })
      this.setData({
        pages:pages
      })
      console.log(this.data.pages)
     //return pages;
  
  },
  /**
   * 组件的方法列表
   */
  methods: {

  },

  
})
