let isProd = process.env.NODE_ENV === 'production';

let baseApi = isProd 
              ? 'https://自定义/' : 'https://自定义/';

let api = {
  'key': 'value'
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

apis['PICDOMAIN'] = '';

module.exports = apis;
