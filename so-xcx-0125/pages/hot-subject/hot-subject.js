// pages/hot-subject/hot-subject.js

Page({

  /**
   * 页面的初始数据
   */
    data: {
        isHidden:false,
        /**
         * 页面配置
         */
        winWidth: 0,
        winHeight: 0,

        // tab切换
        currentTab: 0,

        /**
         * 滑动面板参数配置
         */
        indicatorDots: false,    // 是否显示面板指示点
        autoplay: false,    // 是否自动切换
        interval: 5000,     // 自动切换时间间隔
        duration: 1000,     // 滑动动画时长

    },

    /** 
     * 页面初始化
     * options 为页面跳转所带来的参数
     */
    onLoad: function (options) {
        var that = this;

        /**
         * 获取系统信息
         */
        wx.getSystemInfo({

            success: function (res) {
                that.setData({
                    winWidth: res.windowWidth,
                    winHeight: res.windowHeight
                });
            }

        });

    },
    onReady: function () {


    },


    /**
     * 事件处理
     * scrolltolower 自动加载更多
     */

    /**
     * 滑动切换tab
     */
    bindChange: function (e) {

        var that = this;
        that.setData({ currentTab: e.detail.current });

    },
    /**
     * 点击tab切换
     */
    swichNav: function (e) {

        var that = this;

        if (this.data.currentTab === e.currentTarget.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.currentTarget.dataset.current
            })
        }


    },
})