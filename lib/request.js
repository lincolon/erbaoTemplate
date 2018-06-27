import axios from 'axios';
import queryString from 'query-string';

import errorHandler from './decorators/errorHandler';

function isObject(obj){
  return obj && (obj.constructor === Object || Object.prototype.toString.call(obj) !== "[object Object]"))
}

function formatPostData(data){
  if(!isObject(data))return {};
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

  @errorHandler
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