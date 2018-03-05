// pages/zhengu/zhengu.js

//图表插件
var wxCharts = require('../../utils/wxChart/wxcharts.js');
var storage = require('../../utils/wxChart/storage');
var kl = require('../../utils/wxChart/k-line');
var app = getApp();
var ringChart = null;
var columnChart = null;
//柱状图
var chartData = {
    main: {
        title: '',
        data: [15, 20, 45, 37],
        categories: ['18/1/10', '18/1/11', '18/1/12', '18/1/13']
    }
};
//K线图
var getOptionKline1 = function (type) {
    return {
        name: type || 'dk',
        width: 'auto',
        height: 160,
        average: [5, 10, 20],
        axis: {
            row: 4,
            col: 5,
            showX: false,
            showY: true,
            showEdg: true,
            paddingTop: 0,
            paddingBottom: 1,
            paddingLeft: 0,
            paddingRight: 0,
            color: '#cdcdcd'
        },
        xAxis: {
            data: [],
            averageLabel: []
        },
        yAxis: [],
        callback: function (time) {
            var page = getCurrentPages();
            page = page[page.length - 1];
            page.setData({
                kl1RenderTime: time
            });
        }
    };
};
var getOptionKline2 = function (type) {
    return {
        name: type || 'dk',
        width: 'auto',
        height: 80,
        average: [5, 10, 20],
        axis: {
            row: 1,
            col: 5,
            showX: false,
            showY: true,
            showEdg: true,
            paddingTop: 0,
            paddingBottom: 14,
            paddingLeft: 0,
            paddingRight: 0,
            color: '#cdcdcd'
        },
        xAxis: {
            times: [],
            data: [],
            averageLabel: []
        },
        yAxis: [],
        callback: function (time) {
            var page = getCurrentPages();
            page = page[page.length - 1];
            page.setData({
                kl2RenderTime: time
            });
        }
    };
};
var kLine, kLineB;
var ma5Arr, ma10Arr, ma20Arr,
    ma5bArr, ma10bArr, ma20bArr;


Page({

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        //获取设备信息
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    winWidth: res.windowWidth,
                    winHeight: res.windowHeight
                });
            }

        });
        //K线图
        this.tabChart({
            target: {
                dataset: {
                    type: 'dk'
                }
            }
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 页面的初始数据
     */

    //K线图
    data: {
        isHidden: false,
        isHiddenn: false,
        "datevalue": "2018-01-24",
        open: false,     //默认输入下拉框隐藏
        selected: true,  //tab切换
        selected1: false, //tab切换

        //K线图数据
        ma5: '',
        ma10: '',
        ma20: '',
        ma5b: '',
        ma10b: '',
        ma20b: '',
        tabName: '',
        stock: '',
        code: '',
        time: '',
        yc: '',
        kl1RenderTime: 0,
        kl2RenderTime: 0,
        minIndex: 3,
        minArray: ['5分钟', '15分钟', '30分钟', '60分钟'],

        /**
          * 页面配置
          */
        winWidth: 0,
        winHeight: 0,
    },
    //输入框获取和失去焦点
    showSearch: function (e) {
        this.setData({
            open: !this.data.open,
            isChecked: true
        })
    },
    hiddenSearch: function (e) {
        this.setData({
            open: false,
            isChecked: false
        })
    },
    //日期
    bindDateChange: function (e) {
        this.setData({
            datevalue: e.detail.value
        })
    },
    //K线图
    tabChart: function (e) {
        var type = e.target.dataset.type;
        var getDataByType = function (type) {
            return {
                'dk': function () {
                    return storage.getDkData();
                }
            }[type]();
        };
        var data = getDataByType(type);
        this.setData({
            tabName: type,
            stock: data.name,
            code: data.code,
            time: data.info.time,
            yc: data.info.yc
        });
        this.draw(data, type);
    },
    tabMinChart: function (e) {
        var type = 'mink';
        var index = e.detail.value;
        index = index === '' ? 3 : index;
        var getDataByType = function (type) {
            return {
                'mink-5': function () {
                    return storage.getMin5Data();
                },
                'mink-15': function () {
                    return storage.getMin15Data();
                },
                'mink-30': function () {
                    return storage.getMin30Data();
                },
                'mink-60': function () {
                    return storage.getMin60Data();
                }
            }[type]();
        };
        var typeList = [5, 15, 30, 60];
        var minType = type + '-' + typeList[index];
        var data = getDataByType(minType);
        this.setData({
            tabName: type,
            minIndex: index,
            stock: data.name,
            code: data.code,
            time: data.info.time,
            yc: data.info.yc
        });
        this.draw(data, minType);
    },
    draw: function (data, type) {
        kLine = kl('k-line').init(getOptionKline1(type));
        kLine.metaData1(data, getOptionKline1(type));
        kLine.draw();

        kLineB = kl('k-line-b').init(getOptionKline2(type));
        kLineB.metaData2(data, getOptionKline2(type));
        kLineB.draw();

        var yAxis1 = kLine.options.yAxis;
        var yAxis2 = kLineB.options.yAxis;
        ma5Arr = yAxis1[1].dataShow;
        ma10Arr = yAxis1[2].dataShow;
        ma20Arr = yAxis1[3].dataShow;
        ma5bArr = yAxis2[1].dataShow;
        ma10bArr = yAxis2[2].dataShow;
        ma20bArr = yAxis2[3].dataShow;
        this.showLastAverage();
    },
    showLastAverage: function () {
        this.setData({
            ma5: ma5Arr[ma5Arr.length - 1],
            ma10: ma10Arr[ma10Arr.length - 1],
            ma20: ma20Arr[ma20Arr.length - 1],
            ma5b: ma5bArr[ma5bArr.length - 1],
            ma10b: ma10bArr[ma10bArr.length - 1],
            ma20b: ma20bArr[ma20bArr.length - 1]
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function (e) {
        //环形图
        var windowWidth = 320;
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }

        ringChart = new wxCharts({
            animation: true,
            canvasId: 'ringCanvas',
            type: 'ring',
            extra: {
                ringWidth: 25,
                pie: {
                    offsetAngle: -45
                }
            },

            series: [{
                name: '凤凰网',
                data: 15,
                stroke: true
            }, {
                name: '凤凰网',
                data: 35,
                stroke: true
            }, {
                name: '凤凰网',
                data: 78,
                stroke: true
            }, {
                name: '凤凰网',
                data: 63,
                stroke: true
            }],
            disablePieStroke: true,
            width: windowWidth,
            height: 200,
            dataLabel: true,
            legend: true,
            background: '#ffffff',
            padding: 0
        });
        ringChart.addEventListener('renderComplete', () => {
            console.log('renderComplete');
        });
        setTimeout(() => {
            ringChart.stopAnimation();
        }, 500);

        columnChart = new wxCharts({
            canvasId: 'columnCanvas',
            type: 'column',
            animation: true,
            width: windowWidth,
            height: 200,
            legend: false,
            categories: chartData.main.categories,
            dataLabel: false,
            series: [{
                //   name: '趋势',
                data: chartData.main.data,
                format: function (val, name) {
                    return val.toFixed(2);
                }
            }],
            yAxis: {
                format: function (val) {
                    return val;
                },
                min: 0,
                max: 15
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

    //tab选项卡
    selected: function (e) {
        this.setData({
            selected1: false,
            selected: true
        })
    },
    selected1: function (e) {
        this.setData({
            selected: false,
            selected1: true
        })
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

})