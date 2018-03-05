// pages/my-gu/my-gu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'isEdit': false,
    'niuguData': [
      { 'name': '贵州茅台', 'code': '600519', 'priceNow': '1.8', 'profit': '+11.2%', 'type': '酒业' },
      { 'name': '科大讯飞', 'code': '600519', 'priceNow': '2.49', 'profit': '+11.2%', 'type': '人工智能' },
      { 'name': '老白干酒', 'code': '600519', 'priceNow': '45.00', 'profit': '+11.2%', 'type': '酒业' },
      { 'name': '一品红', 'code': '600519', 'priceNow': '16.78', 'profit': '0%', 'type': '医药' },
      { 'name': '横店影视', 'code': '600519', 'priceNow': '747.00', 'profit': '-5.0%', 'type': '影视' },
      { 'name': '新华保险', 'code': '600519', 'priceNow': '3256.00', 'profit': '+11.2%', 'type': '保险' },
      { 'name': '新华保险', 'code': '600519', 'priceNow': '3256.00', 'profit': '+11.2%', 'type': '保险' },
      { 'name': '新华保险', 'code': '600519', 'priceNow': '3256.00', 'profit': '+11.2%', 'type': '保险' },
      { 'name': '新华保险', 'code': '600519', 'priceNow': '3256.00', 'profit': '+11.2%', 'type': '保险' },
      { 'name': '新华保险', 'code': '600519', 'priceNow': '3256.00', 'profit': '+11.2%', 'type': '保险' },

      { 'name': '新华保险', 'code': '600519', 'priceNow': '3256.00', 'profit': '+11.2%', 'type': '保险' },
      { 'name': '新华保险', 'code': '600519', 'priceNow': '3256.00', 'profit': '+11.2%', 'type': '保险' },
      { 'name': '新华保险', 'code': '600519', 'priceNow': '3256.00', 'profit': '+11.2%', 'type': '保险' },
      { 'name': '新华保险', 'code': '600519', 'priceNow': '3256.00', 'profit': '+11.2%', 'type': '保险' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.data.niuguData.forEach(function (item) {
    //   parseInt(item.priceNow) > 0 ? item.priceType = 'red' : item.priceType = 'green'
    // });
    this.data.niuguData.forEach(function (item) {
      let profitNum = parseInt(item.profit);
      if (profitNum > 0)
      {
        item.profitType = 'red'
      }
      else if (profitNum == 0)
      {
        item.profitType = ''
      }
      else{
        item.profitType = 'green'
      }
    });
    this.setData({
      niuguData: this.data.niuguData
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  /**
   * 个股编辑切换
   */
  changeEdit: function(e){
    let that = this;

    that.setData({
      isEdit: !that.data.isEdit
    })
  },
  /**
   * 个股删除
   */
  deleteStock: function(e){
    let that = this;
    let param = [];
    let index = e.currentTarget.dataset.index;
      param = this.data.niuguData.splice(index, 1);
    that.setData({
      niuguData: this.data.niuguData
    })
  }
})