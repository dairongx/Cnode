import Vue from 'vue'
import Router from 'vue-router'
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
                    component: list
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
                    component: user
                },
                {
                    path: 'collect',
                    component: collect,
                    meta:{
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
            component: msg
        },
        {
            path: '/publish',
            component: publish
        },
        {
            path: '/login',
            component: login
        }
    ]
})
