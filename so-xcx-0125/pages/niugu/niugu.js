// pages/niugu/niugu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'banner': '../../images/niugu-banner.jpg',
    'isPay': true,
    'showDate': -1,
    'showStock': -1,
    'niuguData': [
      { 'name': 'ST贵州茅台', 'code': '600519', 'priceNow': '747.00', 'priceLook': '15.20', 'profit': '+11.2%', 'type': '酒业' },
      { 'name': '科大讯飞', 'code': '600519', 'priceNow': '-11.80', 'priceLook': '15.20', 'profit': '+11.2%', 'type': '人工智能' },
      { 'name': '老白干酒', 'code': '600519', 'priceNow': '747.00', 'priceLook': '15.20', 'profit': '+11.2%', 'type': '酒业酒业酒业' },
      { 'name': '一品红', 'code': '600519', 'priceNow': '-747.00', 'priceLook': '15.20', 'profit': '+11.2%', 'type': '医药' },
      { 'name': '横店影视', 'code': '600519', 'priceNow': '747.00', 'priceLook': '15.20', 'profit': '-5.0%', 'type': '影视' },
      { 'name': '新华保险', 'code': '600519', 'priceNow': '747.00', 'priceLook': '15.20', 'profit': '+11.2%', 'type': '保险' }
    ],
    'imgUp': '../../images/icon-slideup.png',
    'imgDown': '../../images/icon-slidedown.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.data.niuguData.forEach(function (item) {
      parseInt(item.priceNow) > 0 ? item.priceType = 'red' : item.priceType = 'green'

    });
    this.setData({
      niuguData: this.data.niuguData
    });
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
   * 点击展开，显示列表详情
   */
  showDetail: function (e) {
    let that = this;
    let initIndex = -1; // 数据列表计数从0开始，故取值-1
    // 避免股票详情和日期详情参数重合混乱，增加参数判断
    // 往日股票列表按日期展开详情
    if (e.currentTarget.dataset.show != undefined)
    {
      let index = e.currentTarget.dataset.show;
      index == this.data.showDate ? initIndex = -1 : initIndex = index;
      this.setData({
        'showDate': initIndex
      });
    }
    // 股票列表显示详情
    else if (e.currentTarget.dataset.index != undefined) {
      let index = e.currentTarget.dataset.index;
      index == this.data.showStock ? initIndex = -1 : initIndex = index;
      this.setData({
        'showStock': initIndex
      });
    }
  }
})