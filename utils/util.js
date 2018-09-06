
const baseUrl = "https://m.yaojunrong.com"

const fetch = {
  http(url, method, data) {
    return new Promise((resolve, reject) => {
      let token = wx.getStorageSync('token');
       let header = {
        'content-type': 'application/json'
      }
      if(token){
        header.token = token
      }
      wx.request({
        url: baseUrl + url,
        data,
        method,
        header,
        success(res) {
          resolve(res)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  },
  get(url, data) {
    return this.http(url, 'GET', data);
  },
  post(url,data){
    return this.http(url,'POST',data)
  },
  del(url){
    return this.http(url,'DELETE')
  }
}
const login = ()=>{
  wx.login({
    success(res){
      fetch.post('/login',{
        code:res.code,
        appid:'wxbad2f9e1a10c04e8',
        secret:'616e6b5c2cc3d062e15e8a325684cbaa'
      }).then(res => {
        // console.log(res)
        if(res.header.Token){
          wx.setStorageSync('token',res.header.Token )
        }
      })
    }
  })
}
exports.login = login;
exports.fetch = fetch;