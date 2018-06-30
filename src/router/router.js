import router from './index'
import store from "../store/store";

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (store.state.accesstoken === null) {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        } else {
            next()
        }
    } else if (to.path === '/login' && store.state.accesstoken !== null) {
        let path = from.path
        next({
            path: path,
        })
    } else if (from.meta.scroll) {      // 记录滚动位置
        let element = document.querySelector('#scroll')
        let top = element ? element.scrollTop : '0'
        store.commit('scrollTop', top)
        next()
    } else {
        next()
    }
});

export default router
