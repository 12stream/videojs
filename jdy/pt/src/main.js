import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import promise from 'es6-promise'
import 'babel-polyfill'
import Vuex from 'vuex'
import store from './vuex/store'
import fetch from './api/api'
import tool from './api/tools'
import VueBus from 'vue-bus'
import vueCropper from 'vue-cropper'

Vue.use(Vuex)
Vue.use(VueBus)

promise.polyfill()

Vue.use(ElementUI)
Vue.use(vueCropper)

    // Vue.use(axios)

// Vue.prototype.axios = axios
Vue.prototype.$ajax = axios
Vue.prototype.$ajaxs = fetch
Vue.prototype.$api = tool
//let bus = new Vue()
//Vue.prototype.bus = bus
// Vue.config.productionTip = false

/* eslint-disable no-new */
// new Vue({
//     el: '#app',
//     router,
//     template: '<App/>',
//     components: { App }
// })

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
})
