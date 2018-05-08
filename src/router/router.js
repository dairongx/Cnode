import router from './index'
import store from "../store/store";

router.beforeEach((to, from, next) => {
  const list = ['/index/all', '/index/good', '/index/share', '/index/ask', '/index/job'];
  let toIndex = list.indexOf(to.path);
  let fromIndex = list.indexOf(from.path);
  let type = '';
  if (toIndex>=0 && fromIndex >=0) {
    if(toIndex<fromIndex){
      type='left';
    }else{
      type='right';
    }
  }
  store.commit('changeType', type);
  next();
});

export default router
