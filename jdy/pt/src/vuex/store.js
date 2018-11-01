import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    live_permit2: '',
    liveData:{
      id:'',
      DataStatistics:false,
      manageTab:false
  }
  }
})

export default store
