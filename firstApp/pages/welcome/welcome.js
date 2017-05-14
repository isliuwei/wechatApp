Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  onTap: function () {

    // wx.navigateTo({
    //   url: "/pages/posts/posts"
    // });
    
    wx.reLaunch({
      url: "/pages/posts/posts",
    });

  }
  
})

