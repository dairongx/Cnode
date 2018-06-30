import Vue from 'vue'
import Router from 'vue-router'
import store from "../store/store";
import list from '@/page/index/list'
import index from '@/page/index/index'
import topic from '@/page/topic/topic'
import user_index from '@/page/user/index'
import user from '@/page/user/user'
import login from '@/page/user/login'
import userInfo from '@/page/user/userInfo'
import collect from '@/page/user/collect'
import msg from '@/page/msg/msg'
import publish from '@/page/publish/publish'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/index',
            name: 'index',
            component: index,
            redirect: '/index/all',
            children: [
                {
                    path: '*',
                    component: list,
                    meta: {
                        keepAlive: true,
                        scroll: true
                    }
                }
            ]
        },
        {
            path: '/topic/:id',
            component: topic
        },
        {
            path: '/user',
            name: 'user',
            component: user_index,
            children: [
                {
                    path: '',
                    component: user,
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: 'collect',
                    component: collect,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: 'userInfo/:user',
                    component: userInfo,
                }
            ]
        },
        {
            path: '/msg',
            component: msg,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/publish',
            component: publish,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/login',
            component: login
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition && to.meta.scroll) {          // 恢复滚动位置
            let scrollTop = store.state.scrollTop
            if (!scrollTop) {
                return
            }
            setTimeout(() => {
                let documentElem = document.querySelector('#scroll')
                if (documentElem) {
                    documentElem.scrollTop = scrollTop
                }
            }, 0)
            return savedPosition
        }
    }
})
