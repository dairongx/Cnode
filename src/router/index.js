import Vue from 'vue'
import Router from 'vue-router'
import list from '@/page/index/list'
import index from '@/page/index/index'
import topic from '@/page/topic/topic'
import user from '@/page/user/user'
import msg from '@/page/msg/msg'

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
            component: user
        }
        ,
        {
            path: '/msg',
            component: msg
        }
    ]
})
