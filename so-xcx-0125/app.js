//app.js
App({
  onLaunch: function () {
    // test api
    wx.request({
      url: 'http://192.168.1.180:53001/api/Gallery/QueryImageListByES',
      method: 'POST',
      data: {
        key: '风景 美丽',
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("res.data====", res.data.data.List[0].ImageUrl)
      }
    })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log("2222222222222222222222222")
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log("33333333333333333333")
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})