import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import ShowModal from '@/components/showModal'
import PayComfirm from '@/components/PayComfirm'
import Pay from '@/components/pay'
import toastRegistry from '@/components/toast'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'videojs-flash'
import 'vue-video-player/src/custom-theme.css'
import 'videojs-contrib-hls/dist/videojs-contrib-hls'
import 'jquery'
import fetch from './api/api'

Vue.use(PayComfirm)
Vue.use(ShowModal)
Vue.use(Pay)
Vue.use(toastRegistry)
Vue.use(VueAwesomeSwiper)
Vue.use(VueVideoPlayer)

Vue.prototype.$http= axios
Vue.prototype.$ajax = fetch
Vue.config.productionTip = false
Object.defineProperty(Vue.prototype, '$axios', { value: axios })

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
