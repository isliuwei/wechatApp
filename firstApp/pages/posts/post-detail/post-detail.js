var copy = require('../../../data/posts-data.js').copyInfo;
var post = require('../../../data/posts-data.js').postList;
var app = getApp();

Page({

    
    data: {
        copydata: copy,
        isPlayingMusic: false
    },

    onLoad: function (options) {

        var postId = options.postid;
        var currentId = postId;

        this.data.currentId = currentId;
        this.data.currentData = post[postId];


        var postData = post[postId];
        this.setData({
            postDetail: postData,
            imgSrc: postData.imgSrc
        });

        // 初始化收藏
        var collected = wx.getStorageSync('postCollected_storage');
        if (collected) {
            this.setData({
                isCollected: collected[postId]
            });
        } else {
            var postCollected_storage = {};
            postCollected_storage[postId] = false;
            wx.setStorageSync('postCollected_storage', postCollected_storage);
        }



        if (app.globalData.g_isPlayMusic && app.globalData.g_currentMusicPostId === postId) {
            // this.data.isPlayingMusic = true;
            this.setData({
                isPlayingMusic: true
            });
        }

        this.setMusicMintor();

        this.countCollected(this.data.currentData);

    },


    setMusicMintor: function () {
        // 监听音乐状态
        // 音乐启动
        var self = this;
        var musicInfo = post[this.data.currentId].music;
        var oriImg = post[this.data.currentId].imgSrc;
        wx.onBackgroundAudioPlay(function () {
            self.setData({
                isPlayingMusic: true,
                imgSrc: musicInfo.coverImg
            });

            app.globalData.g_isPlayMusic = true;
            app.globalData.g_currentMusicPostId = self.data.currentId;

        });

        //音乐暂定
        wx.onBackgroundAudioPause(function () {
            self.setData({
                isPlayingMusic: false,
                imgSrc: oriImg
            });

            app.globalData.g_isPlayMusic = false;
            app.globalData.g_currentMusicPostId = null;


        });


        // //音乐停止
        // wx.onBackgroundAudioStop(function () {
        //     self.setData({
        //         isPlayingMusic: false,
        //         imgSrc: oriImg
        //     });

        //     app.globalData.g_isPlayMusic = false;
        //     app.globalData.g_currentMusicPostId = null;


        // });

    },


    // 收藏
    onTapCollected: function (event) {

        // 先按照id从缓存中读取当前文章是否收藏
        var collected = wx.getStorageSync('postCollected_storage');
        var collectedById = collected[this.data.currentId];

        // 取反
        collectedById = !collectedById;
        collected[this.data.currentId] = collectedById;

        // Toast
        this.showToast(collected, collectedById);

        // Modal
        // this.showModal(collected, collectedById);

        wx.showToast({
            title: collectedById ? '收藏成功' : '取消收藏',
            duration: 1000
        });

    },



    showToast: function (collected, collectedById) {
        // 更新缓存
        wx.setStorageSync('postCollected_storage', collected);
        // 更新页面
        this.setData({
            isCollected: collectedById
        });
        wx.showToast({
            title: collectedById ? '收藏成功' : '取消收藏',
            duration: 1000
        });
    },


    showModal: function (collected, collectedById) {
        var self = this;
        wx.showModal({
            title: '收藏',
            content: collectedById ? '收藏该文章' : '取消收藏该文章',
            showCancel: 'true',
            cancelText: '取消',
            cancelColor: '#333',
            confirmText: '确认',
            confirmColor: '#405f80',
            success: function (res) {
                if (res.confirm) {
                    //更新缓存
                    wx.setStorageSync('postCollected_storage', collected);
                    //更新页面
                    self.setData({
                        isCollected: collectedById
                    });
                }

            }
        });
    },

    toIndex: function () {
        wx.redirectTo({
            url: '/pages/welcome/welcome',
        })
    },

    // 分享
    onTapShare: function (event) {
        var self = this;
        var itemList = [
            '分享给微信好友',
            '分享到朋友圈',
            '分享到QQ',
            '分享到微博'
        ];
        wx.showActionSheet({
            itemList: itemList,
            itemColor: '#405f80',
            success: function (res) {
                //res.cancel

                //res.tapIndex
                if (res.cancel) {
                    wx.showModal({
                        title: '用户点击了 取消 按钮',
                        content: '现在无法实现分享功能。。。'
                    });

                } else {
                    wx.showModal({
                        title: '用户 ' + itemList[res.tapIndex],
                        content: '现在无法实现分享功能。。。'
                    });

                }



            }
        });

    },


    // 音乐播放
    onAudioPlay: function (event) {
        var isPlayingMusic = this.data.isPlayingMusic;
        var musicInfo = post[this.data.currentId].music;
        var oriImg = post[this.data.currentId].imgSrc;
        if (isPlayingMusic) {
            wx.pauseBackgroundAudio();
            this.setData({
                isPlayingMusic: false,
                imgSrc: oriImg
            });
        } else {
            wx.playBackgroundAudio({
                dataUrl: musicInfo.url,
                title: musicInfo.title,
                coverImgUrl: musicInfo.coverImg
            });

            this.setData({
                isPlayingMusic: true,
                imgSrc: musicInfo.coverImg
            });
        }
    },

    //浏览数计数
    countCollected: function (currentData) {
        var id = this.data.currentId;
        var num = currentData['collection'];

        var collected = wx.getStorageSync('postCollctedNum_storage');
        if (collected) {
            var collectedById = collected[id];
            if (!collectedById) {
                collectedById = num;
                collectedById++;
                collected[id] = collectedById;
                wx.setStorageSync('postCollctedNum_storage', collected);


            } else {

                collectedById++;
                collected[id] = collectedById;
                wx.setStorageSync('postCollctedNum_storage', collected);

            }

            // app.globalData.g_collnum = collected;

        }
        else {
            var postCollctedNum_storage = {};
            postCollctedNum_storage[id] = num;
            postCollctedNum_storage[id]++;
            wx.setStorageSync('postCollctedNum_storage', postCollctedNum_storage);
        }

    }



})