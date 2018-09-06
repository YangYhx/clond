//index.js
//获取应用实例

import {
  fetch,
  login
} from '../../utils/util.js';
const app = getApp()

Page({
  data: {

    swiperData: [],
    mainContent: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    isLoading: false,
    pn: 1,
    hasMore: true
  },
  onLoad() {
    login()
    this.getData()
    this.getcontent()
  },
  //获取轮播图数据
  getData() {
    return new Promise((resolve, reject) => {
      this.setData({
        isLoading: true
      })
      fetch.get('/swiper').then(res => {
        resolve()
        this.setData({
          swiperData: res.data.data,
          isLoading: false
        })
      }).catch(err => {
        reject()
        this.setData({
          isLoading: false
        })
      })
    })

  },
  //获取按照分类书籍信息
  getcontent() {
    return new Promise((resolve, reject) => {
      this.setData({
        isLoading: true
      })
      fetch.get('/category/books').then(res => {
        this.setData({
          mainContent: res.data.data,
          isLoading: false
        })
      })
    })
  },
  getMorecontent() {
    return new Promise(resolve => {
      fetch.get('/category/books', {
        pn: this.data.pn
      }).then(res => {
        let newArr = [...this.data.mainContent, ...res.data.data]
        this.setData({
          mainContent: newArr
        })
        resolve(res)
      })
    })

  },
  //点击事件
  jump(e) {
    console.log("....")
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
  },
  onPullDownRefresh() {
    this.setData({
      pn: 1,
      hasMore: true
    })
    //在两个数据都加载完场才会触发
    Promise.all([this.getData(), this.getcontent()]).then(() => {
      wx.stopPullDownRefresh();
    })
  },
  onReachBottom() {
    if (this.data.hasMore) {
      this.setData({
        pn: this.data.pn + 1
      })
      this.getMorecontent().then(res => {
        if (res.data.data.length < 2) {
          this.setData({
            hasMore: false
          })
        }
      })
    }
  },
  onShareAppMessage(){
    
  }
})