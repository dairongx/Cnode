import vue from 'vue'
import Vuex from 'vuex'

vue.use(Vuex);

export default new Vuex.Store({
    state: {
        animateType: '',
        accesstoken: window.sessionStorage.getItem('user') || null
    },
    getter: {},
    mutations: {
        changeType(state, val) {
            state.animateType = val;
        }
    },
    actions: {}
})
