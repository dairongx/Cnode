// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'
import axios from 'axios'
import store from './store/store'
import * as filter from './filter'

Vue.prototype.axios = axios;
/*axios.interceptors.request.use(function (config) {
    return config;
}, function (err) {
    return err
});
axios.interceptors.response.use(function (res) {
    return res;
}, function (err) {
    return err;
});*/

Object.keys(filter).forEach(key => Vue.filter(key, filter[key]));

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    components: {App},
    template: '<App/>'
})
