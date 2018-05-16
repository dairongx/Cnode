import router from './index'
import store from "../store/store";

router.beforeEach((to, from, next) => {
    /*const list = ['/index/all', '/index/good', '/index/share', '/index/ask', '/index/job'];
    let toIndex = list.indexOf(to.path);
    let fromIndex = list.indexOf(from.path);
    let type = '';
    if (toIndex >= 0 && fromIndex >= 0) {
        if (toIndex < fromIndex) {
            type = 'left';
        } else {
            type = 'right';
        }
    }
    store.commit('changeType', type);*/
    if (to.meta.requireAuth) {
        if (store.state.accesstoken === null) {
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router
