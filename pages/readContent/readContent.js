// pages/readContent/readContent.js
import {
  fetch
} from "../../utils/util.js"
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleId: "",
    article: {},
    title: "",
    isLoading: false,
    catalog: [],
    isShow: false,
    bookId: "",
    font: 40,
    index: ""
  },


  onLoad: function(options) {
    this.setData({
      articleId: options.id,
      
      bookId: options.bookId,
    })
    this.getData();
    this.getCatalog();
  },

  //请求markdown文件，并转换为内容

  getData() {
    fetch.get(`/article/${this.data.articleId}`).then(res => {
      this.setData({
        article: res.data.data.article.content,
        index: res.data.data.article.index,
        title: res.data.data.title,
        isLoading: false
      })
    }).catch(err => {
      this.setData({
        isLoading: false
      })
    })
  },
  getCatalog() {
    fetch.get(`/titles/${this.data.bookId}`).then(res => {
      console.log(res.data.data)
      this.setData({
        isLoading: true,
        catalog: res.data.data,
      })
    })
  },
  toggleCatalog() {
    let isShow = !this.data.isShow;
    this.setData({
      isShow
    })
  },
  handleGet(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({
      articleId: id,
      isShow: !this.data.isShow
    })
    this.getData()
  },
  //字体大小的缩减
  handleAdd() {
    if (this.data.font >= 60) {
      wx.showModal({
        title: '已经够大了',
        content: '请注意保护眼睛视力',
      })
    } else {
      this.setData({
        font: this.data.font + 2
      })
    }
  },
  handleReduce() {
    if (this.data.font <= 20) {
      wx.showModal({
        title: '已经够小了',
        content: '请注意保护眼睛视力',
      })
    } else {
      this.setData({
        font: this.data.font - 2
      })
    }
  },
  //章节的跳转
  articleNext() {
    let catalog = this.data.catalog;
    if (this.data.index + 1 >= catalog.length) {
      wx.showModal({
        title: '提示',
        content: '已经是后一张了',
      })
    } else {
      let id = catalog[this.data.index + 1]._id;
      this.setData({
        articleId: id
      })
      this.getData();
    }


  },
  articleback() {
    let catalog = this.data.catalog;
    if (this.data.index - 1 <= 0) {
      wx.showModal({
        title: '提示',
        content: '已经到第一章了',
      })
    } else {
      let id = catalog[this.data.index - 1]._id;
      this.setData({
        articleId: id
      })
      this.getData();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})