import { Message as MessageBox } from 'element-ui';
import pubSub from '../pubsub';

function errorHandler(target, name, descriptor){
  console.log(target, name)
  const fn = descriptor.value;
  descriptor.value = async function(){
    let res = await fn.apply(this, arguments);
    if(!res.status){
      let msg = res.msg && (res.msg.zh || res.msg);
      if(res.code == 10001 || res.code == 10002 || res.code == 10004){
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
    return res;
  }
  return descriptor;
}

export default errorHandler;