// pages/detail/detail.js
import {fetch,login} from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookId:"",
    bookContent:{},
    isLoading: false,
  },

  onLoad: function (options) {
   this.setData({
     bookId:options.id,
     isLoading:true
   })
   this.getdata();
  },
  //拿到这本书的数据
  getdata(){
    fetch.get(`/book/${this.data.bookId}`).then(res =>{
      console.log(res.data);
      this.setData({
        bookContent:res.data,
        isLoading: false,
      });
      console.log(this.data.bookContent.isCollect)
    }).catch(err => {
      this.setData({
        isLoading: false
      })
    })

  },
  jumpRead(event){
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/menu/menu?id=${id}`,
    })
  },
  hendleCollect(){
    if(this.data.bookContent.isCollect == 0){
      fetch.post('/collection', {
        bookId: this.data.bookId
      }).then(res => {
        console.log(res)
        if (res.data.code == 200) {
          wx.showToast({
            title: '收藏成功',
            type: 'success',
            duretion: 1000
          })
          // let bookContent = this.data.bookContent;
          // bookContent.isCollect = 1
          // this.setData({
          //   bookContent: bookContent
          // })
        }
      })
    }else{
      fetch.del(`/collection/${this.data.bookId}`).then(res => {
        console.log(res)
      })
    }
   
  },
  onShareAppMessage: function () {
    return {
      title: this.data.bookContent.title,
      path: `/pages/detail/detail?id=${this.data.bookId}`,
      imageUrl: this.data.bookContent.data.img
    }
  }
})