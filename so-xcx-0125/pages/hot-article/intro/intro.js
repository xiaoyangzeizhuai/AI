// pages/hot-subject/hot-subject.js
var wxCharts = require('../../../utils/wxChart/wxcharts.js');
var app = getApp();
var columnChart = null;
var chartData = {
    main: {
        title: '',
        data: [15, 20, 45, 37],
        categories: ['18/1/10', '18/1/11', '18/1/12', '18/1/13']
    }
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
      showModalStatus: false   //默认弹窗和遮罩层关闭
  },

  backToMainChart: function () {
      this.setData({
          chartTitle: chartData.main.title,
          isMainChartDisplay: true
      });
      columnChart.updateData({
          categories: chartData.main.categories,
          series: [{
              name: '成交量',
              data: chartData.main.data,
              format: function (val, name) {
                  return val.toFixed(2) + '万';
              }
          }]
      });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
      var windowWidth = 320;
      try {
          var res = wx.getSystemInfoSync();
          windowWidth = res.windowWidth;
      } catch (e) {
          console.error('getSystemInfoSync failed!');
      }

      columnChart = new wxCharts({
          canvasId: 'columnCanvas',
          type: 'column',
          animation: true,
          width: windowWidth,
          height: 200,
          legend:false,
          categories: chartData.main.categories,
          dataLabel: false,
          series: [{
              name: '趋势',
              data: chartData.main.data,
              format: function (val, name) {
                  return val.toFixed(2);
              }
          }],
          yAxis: {
              format: function (val) {
                  return val;
              },
              min: 0
          },
          xAxis: {
              disableGrid: false,
              type: 'calibration'
          },
          extra: {
              column: {
                  width: 15
              }
          },
      });
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
* 点击展开，显示列表详情
*/
  showDetail: function (e) {
      let that = this;
      let initIndex = -1; // 数据列表计数从0开始，故取值-1
      // 关联原因列表展开详情
      let index = e.currentTarget.dataset.show;
      index == this.data.showDate ? initIndex = -1 : initIndex = index;
      this.setData({
          'showDate': initIndex
      });
  }
})