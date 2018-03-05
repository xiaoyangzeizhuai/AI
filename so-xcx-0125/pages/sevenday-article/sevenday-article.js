// pages/sevenday-article/sevenday-article.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        scrollTop: {
            scroll_top: 0,
            goTop_show: false
        },
        selected: true,  //tab切换
        selected1: false, //tab切换
        flag: true,
        index: 0,  //tab导航样式
        "isHidden": false,
        array: ['全部自选股', '科大讯飞', '科大讯飞', '科大讯飞'],
        objectArray: [
            {
                id: 0,
                name: '全部自选股'
            },
            {
                id: 1,
                name: '科大讯飞'
            },
            {
                id: 2,
                name: '科大讯飞'
            },
            {
                id: 3,
                name: '科大讯飞'
            }
        ],
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
    bindPickerChange: function (e) {
        this.setData({
            index: e.detail.value
        })
    },

    /**
     * 生命周期函数--监听页面加载
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
   * 滑动切换tab
   */
    bindChange: function (e) {

        var that = this;
        that.setData({ currentTab: e.detail.current });
        if (e.detail.current == "1") {
            that.setData({
                flag: false
            })

        } else {
            that.setData({
                flag: true
            })
        }
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
        if (e.detail.current == "1") {
            that.setData({
                flag: false
            })

        } else {
            that.setData({
                flag: true
            })
        }
    },
    scrollTopFun: function (e) {
        if (e.detail.scrollTop > 300) {//触发gotop的显示条件  
            this.setData({
                'scrollTop.goTop_show': true
            });
        } else {
            this.setData({
                'scrollTop.goTop_show': false
            });
        }
    },
    goTopFun: function (e) {
        var _top = this.data.scrollTop.scroll_top;//发现设置scroll-top值不能和上一次的值一样，否则无效，所以这里加了个判断  
        if (_top == 1) {
            _top = 0;
        } else {
            _top = 1;
        }
        this.setData({
            'scrollTop.scroll_top': _top
        });
    }
})