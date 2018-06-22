import pubSub from '../plugins/element';

export default function({error, redirect}){
  // console.log(error);
  if(process.server){
    pubSub.$on('serverError', (data) => {
      error(data);
    })
  }
  pubSub.$on('tokenError', () => {
    redirect('/login')
  })
}