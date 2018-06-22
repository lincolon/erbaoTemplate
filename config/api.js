let isProd = process.env.NODE_ENV === 'production';

let baseApi = isProd 
              ? 'https://cp-api.buyer.2bao.org/' : 'https://test.cp-api.buyer.2bao.org/';

let api = {
  'LOGIN': 'login'
}

let concatApi = function (apis, baseKey) {
  let res = {};
  for(var k in apis){
    res[k] = baseKey + apis[k];
  }
  return res
}

let mergeApi = function(){
  return Object.assign({}, ...arguments)
}

let apis = concatApi(api, baseApi);

apis['PICDOMAIN'] = 'https://file-cdn.2bao.org';

module.exports = apis;
