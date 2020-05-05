// page/dis/addInvitation/addInvitation.js
Page({
  data: {
    tempFilePaths:[],
    canSent:false,
    title:"",
    content:""
  },
  //取消发布
  handleCancel(){
    wx.navigateBack({
      data:1,
    })
  },
  //标题失去焦点
  handleInpitTitle(event){
    this.setData({
      title: event.detail.value
    })
    this.cantSend()
  },
  //内容失去焦点
  handleInpitContent(event){
    this.setData({
      content: event.detail.value
    })
    this.cantSend()
  },
  //发布按钮出发函数
  handleAdd(){
    let _this =this
    wx.request({
      url: 'https://www.mofashiteam.com/massage/saveInvitation',
      data:{
        title:this.data.title,
        content:this.data.content,
        user_id:"1"
      },
      method:'POST',
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success:function(res){
        _this.uploadFile(0,res.data)
        wx.redirectTo({
          url: '../dis',
        })
      }
    })
  },
  uploadFile(i,id){
    if (i > 9) {
      return;
    }
    wx.showLoading({
      title: '上传中...',
      mask: true,
    });
    var that =this;
    wx.uploadFile({
      url: "https://www.mofashiteam.com/massage/upLoadFile",
      filePath: that.data.tempFilePaths[i],
      name: 'file',
      formData: {
        i:i,
        id:id
      },
      success: (res) => {
      },
      fail: (res) => {
        wx.hideLoading();
        wx.showToast({
          title: '上传失败',
          mask:true,
          icon:'none',
          duration:1000
        })
      },
      complete: () => {
        i++;
        //当图片传完时，停止调用 
        if (i == that.data.tempFilePaths.length){
          wx.hideLoading();
          wx.showToast({
            title: '发布成功',
            duration:3000,
            complete:function(){
              wx.navigateBack({
                data: 1,
              })
            }
          })
        }     
        else { //若图片还没有传完，则继续调用函数
          that.uploadFile(i);//递归，回调自己
        }
      }
    });
  },
  //删除图片
  deleteImage(event){
    let index = event.currentTarget.dataset.id;
    console.log(index);
    let images = this.data.tempFilePaths;
    images.splice(index, 1);
    this.setData({
      tempFilePaths: images
    })
    this.cantSend()
  },
  handleAddImg(){
    var that = this;
    //微信选择图片api
    wx.chooseImage({
      //count表示选择图片的数量，默认为 9
      count: 9,
      //图片的大小original表示原图，compressed表示缩略图，默认都可以
      sizeType: ['original', 'compressed'],
      //图片的来源album表示相册，camera表示照相机
      sourceType: ['album', 'camera'],
      success: function (tempFilePaths) {
        //缓存下 
        //显示加载的api
        wx.showToast({
          title: '正在加载...',
          icon: 'loading',
          mask: true,
          duration: 1000,
          success: function (res) {
          }
        })
        //如果多张图可以遍历
        var imageList = tempFilePaths.tempFilePaths
        //设置前端展示的图片地址
        that.setData({
          tempFilePaths: imageList,
          canSent:true
        })
      }
    })
  },
  cantSend(){
    //判断是否所有内容都为空
    if (this.data.tempFilePaths.length == 0 && this.data.title == "" && this.data.content == "") {
      this.setData({
        canSent: false
      })
    }
    else if (!this.data.canSent){
      this.setData({
        canSent:true
      })
    }
  }
})