// pages/dis/dis.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
   
    scrollLeft: 0,
    currentTab: 0,
    userlist: [
      {
        typeId: 0,
        name: '关于我们',
        image:'/images/hind.png',
        arrow:'/images/next.png'
      }
    ], 
    my_items: [
      {
        id: 0,
        name: '我的收藏',
        image:'/images/collection.png'
      },
      {
        id: 1,
        name: '我的点赞',
        image: '/images/message.png'

      },
      {
        id: 2,
        name: '我的帖子',
        image: '/images/history.png'
      }
    ]

  },
  onShow(options){
  
  },
  onclick_us(){
    wx.navigateTo({
      url: '../us_page/us_page',
    })
  },
  chose_my(e){
    if (e.currentTarget.dataset.index==0){
        wx.navigateTo({
          url: '/pages/my_collect/collectpage',
        })
    }
   else if (e.currentTarget.dataset.index == 1) {
      wx.navigateTo({
        url: '/pages/my_like/like_page',
      })
    }
    else if (e.currentTarget.dataset.index == 2) {
      wx.navigateTo({
        url: '/pages/my_invitation/my_invitation',
      })
    }
 
  },
  switch(e) {
    var index = e.currentTarget.dataset.current;
    this.setData({
      currentTab: index
    })
  },
 
})