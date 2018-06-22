import wepy from 'wepy'

function _getSettings () {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success (res) {
        resolve(res.authSetting)
      },
      fail: (res) =>{
        reject(false)
        wx.showModal({
          title: '微信服务错误',
          content: res.errMsg + ', 请重试!'
        })
      }
    })
  })
}

//授权
function _getAuth(scope){
  return new Promise((resolve, reject) => {
    wx.authorize({
      scope: scope,
      success (res) {
        resolve(true)
      },
      fail () {
        reject(false)
      }
    })
  })
}


const wxScopeCollections = {
  //获取定位
  chooseLocation : {
    scope: 'scope.userLocation',
    method: () => {
      return new Promise((resolve, reject) => {
        wx.chooseLocation({
          success (location) {
            resolve(location)
          },
          fail () {
            reject()
          }
        })
      })
    }
  },

  getLocation : {
    scope: 'scope.userLocation',
    method: () => {
      return new Promise((resolve, reject) => {
        wx.getLocation({
          success (location) {
            resolve(location)
          },
          fail () {
            reject()
          }
        })
      })
    }
  },

  //获取微信地址列表
  chooseAddress : {
    scope: 'scope.address',
    method: () => {
      return new Promise((resolve, reject) => {
        wx.chooseAddress({
          success (address) {
            resolve(address)
          },
          fail () {
            reject()
          }
        })
      })          
    }
  },

  //获取微信发票抬头
  chooseInvoiceTitle : {
    scope: 'scope.invoiceTitle',
    method: () => {
      return new Promise((resolve, reject) => {
        wx.chooseInvoiceTitle({
          success (res) {
            resolve(res)
          },
          fail () {
            reject()
          }
        })
      })
    } 
  },

  //获取微信运动数据
  getWeRunData : {
    scope: 'scope.werun',
    method: () => {
      return new Promise((resolve, reject) => {
        wx.getWeRunData({
          success (res) {
            resolve(res)
          },
          fail () {
            reject()
          }
        })
      })
    }
  },

  //打开微信录音功能
  startRecord : {
    scope: 'scope.record',
    method: () => {
      return new Promise((resolve, reject) => {
        wx.startRecord({
          success (res) {
            resolve(res)
          },
          fail () {
            reject()
          }
        })
      })
    }
  },

  //保存图片到相册
  saveImageToPhotosAlbum : {
    scope: 'scope.writePhotosAlbum',
    method: () => {
      return new Promise((resolve, reject) => {
        wx.saveImageToPhotosAlbum({
          success (errMsg) {
            resolve(errMsg)
          },
          fail () {
            reject()
          }
        })
      })
    }
  },

  //保存视频到相册
  saveVideoToPhotosAlbum : {
    scope: 'scope.writePhotosAlbum',
    method: () => {
      return new Promise((resolve, reject) => {
        wx.saveVideoToPhotosAlbum({
          success (errMsg) {
            resolve(errMsg)
          },
          fail () {
            reject()
          }
        })
      })
    }
  }
}


export default class authorizeMixin extends wepy.mixin {
  login () {
    console.log('获取临时登录凭证')
    let that = this
    return new Promise((resolve, reject) => {
      wx.checkSession({
        success (res) {
          resolve(res)
        },
        fail () {
          wx.login({
            success (res) {
              resolve(res)
            },
            fail () {
              that.login()
              reject(null)
            }
          })
        }
      })
    })
  }

  getAppCode(){
    return new Promise((resolve) => {
      wx.login({
        success: (res) =>{
          wx.setStorageSync('appCode', res.code);
          resolve(res.code)
        }
      }) 
    })
  }

  async scopeList(fnName) {
    const SCOPE = wxScopeCollections[fnName].scope;
    let authSetting = await _getSettings(), loc;
    if(authSetting[SCOPE]){
      try{
        loc = await wxScopeCollections[fnName].method();
      }catch(e){}
    }else{
      try{
        await _getAuth(SCOPE);
        loc = await wxScopeCollections[fnName].method();
      }catch(e){}
    }
    return loc;
  }

}
