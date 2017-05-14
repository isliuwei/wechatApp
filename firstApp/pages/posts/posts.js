var posts = require('../../data/posts-data.js');
var videos = require('../../data/video-data.js');
var app = getApp();
var util = require('../../utils/util.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        copydata: posts.copyInfo
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        this.setData({
            postData: posts.postList,
            videoData: videos.videoData
        });

    },

    onShow: function() {
        // console.log(app.globalData.g_collnum);
        this.setData({
            collnum: wx.getStorageSync('postCollctedNum_storage')
        });
    },

    toDetail: function(event) {
        var postId = event.currentTarget.dataset.postid;
        wx.navigateTo({
            url: '/pages/posts/post-detail/post-detail?postid=' + postId
        })
    },

    toIndex: function() {
        wx.redirectTo({
            url: '/pages/welcome/welcome',
        })
    },

    onReady: function(res) {
        this.videoContext = wx.createVideoContext('myVideo');
    },
    inputValue: '',
    bindInputBlur: function(e) {
        this.inputValue = e.detail.value;
    },
    bindSendDanmu: function() {
        this.videoContext.sendDanmu({
            text: this.inputValue,
            color: util.getRandomColor()
        })
    }



})