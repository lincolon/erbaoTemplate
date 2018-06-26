import axios from 'axios';
import queryString from 'query-string';
import { Message as MessageBox } from 'element-ui';

import pubSub from './pubsub';

function formatPostData(data){
  if(data && Object.prototype.toString.call(data) !== "[object Object]"){
      return {};
  }
  var params = new FormData();
  for(let k in data){
    if(Array.isArray(data[k])){
      data[k].map((item)=>{
        params.append(k+'[]', item);
      })
    }else{
      if(data[k] !== ''){
        params.append(k, data[k]);
      }
    }
  }
  return params;
}

function transformRequestData(data, contentType) {
  // console.log(contentType);
  if(/x-www-form-urlencoded/.test(contentType)){
    return queryString.stringify(data)
  }
  if(/form-data/.test(contentType)){
    return formatPostData(data);
  }
  if(/json/.test(contentType)){
    return data;
  }
};

const requestInstance = axios.create({
  timeout: 60000
});

let CancelToken = axios.CancelToken;

class Request {
  constructor(){
    this.source = CancelToken.source();
  }

  cancelRequest(){
    this.source.cancel();
  }

  _mergeRequestOptions(opts){
    const self = this;
    let postOpts = {
      headers: {
        'Content-Type': 'application/json'
      },
      cancelToken: self.source.token
    }
    return Object.assign({}, postOpts, opts);
  }

  _post(api, params, opts){
    const self = this;
    const OPTIONS = self._mergeRequestOptions(opts || {});
    return new Promise((resolve) => {
      requestInstance.post(
        api, 
        transformRequestData(params, OPTIONS.headers['Content-Type']), 
        OPTIONS
      ).then((res) => {
        resolve(res.data);
        if(!res.data.status){
          let msg = res.data.msg && (res.data.msg.zh || res.data.msg);
          console.log(res.data)
          if(res.data.code == 10001 || res.data.code == 10002 || res.data.code == 10004){
            pubSub.$emit('tokenError')
          }else{
            if(process.client){
              MessageBox({
                message: msg,
                type: 'error'
              })
            }
            if(process.server){
              pubSub.$emit('serverError', {message: msg})
            }
          }
        }
      }).catch((err) => {
        throw new Error(err.message);
      });
    })
  }

  /*
  *@param (api, params)
  */ 
  getPageData(){
    return this._post.apply(this, arguments);
  }

  /*
  *@param (api, params)
  */ 
  formSubmit(){
    return this._post.apply(this, arguments);
  }
}

export default new Request();