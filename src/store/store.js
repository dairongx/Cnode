import vue from 'vue'
import Vuex from 'vuex'

vue.use(Vuex);

export default new Vuex.Store({
    state: {
        animateType: '',
        accesstoken: window.sessionStorage.getItem('accesstoken') || null,
        loginName: window.sessionStorage.getItem('loginname') || null,
        avatar_url: window.sessionStorage.getItem('avatar_url') || null,
        user_id: window.sessionStorage.getItem('user_id') || null
    },
    mutations: {
        changeType(state, val) {
            state.animateType = val;
        }
    }
})
