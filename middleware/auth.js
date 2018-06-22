function isEmpty(obj){
  for(var k in obj){
    return false;
  }
  return true;
}
export default function ({store, redirect, req}) {
  if (isEmpty(store.state.authInfo)) {
    return redirect('/login')
  }
}