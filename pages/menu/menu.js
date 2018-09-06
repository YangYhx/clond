// pages/menu/menu.js
import {fetch} from "../../utils/util.js"
Page({


  data: {
   bookId:"",
   menuList:[],
   isLoading:false
  },

  onLoad: function (options) {
    
    this.setData({
      bookId:options.id,
      isLoading:true
    })
    this.getData();
  },
  getData(){
    fetch.get(`/titles/${this.data.bookId}`).then(res => {
        console.log(res.data.data)
        this.setData({
        menuList: res.data.data,
isLoading: false
      })
    }).catch(err => {
      this.setData({
        isLoading: false
      })
    })
  },
  

  onShareAppMessage: function () {
  
  }
})