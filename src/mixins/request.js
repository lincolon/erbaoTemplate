import wepy from 'wepy';
import {picDomain, baseAPI} from '../config/api';

function formatPostData (data, loginWx) {
  if (loginWx) {
    return data
  }
  let formData = ''
  for (let k in data) {
    if(data[k].constructor === Array){
      data[k].map((item) => {
        formData += k + '[]' + '=' + item + '&'
      })
    }else{
      formData += k + '=' + data[k] + '&'
    }
  }
  let res = formData.substr(0, formData.length - 1)
  return res
}

export default class requestMixin extends wepy.mixin {
  data = {
    pic_domain: picDomain
  }

  Request (url, params, loginWx = true) {
    let that = this
    wx.showNavigationBarLoading()
    return new Promise((resolve, reject) => {
      wx.request({
        url: baseAPI + url,
        data: formatPostData(params, loginWx),
        method: 'POST',
        header: {
          'content-type': loginWx ? 'application/json' : 'application/x-www-form-urlencoded'
        },
        success (res) {
          if (+res.statusCode === 200) {
            if (res.data.status) {
              resolve(res.data)
            } else {
              wx.showToast({
                title: res.data.msg.zh ? res.data.msg.zh : res.data.msg,
                icon: 'none'
              })
              reject(null)
            }
          } else {
            wx.showModal({
              title: 'Error',
              content: '错误状态：' + res.statusCode,
              confirmText: '重试',
              success: async (_res) => {
                if (_res.confirm) {
                  let loopRes = await that.Request(url, params, loginWx)
                  resolve(loopRes)
                }
              }
            })
            reject(null)
          }
        },
        fail (error) {
          wx.showModal({
            title: '请求错误',
            content: error.errMsg,
            confirmText: '重试',
            success: async (_res) => {
              if (_res.confirm) {
                let loopRes = await that.Request(url, params, loginWx)
                resolve(loopRes)
              }
            }
          })
          reject(null)
        },
        complete () {
          wx.hideNavigationBarLoading()
        }
      })
    })
  }
}
