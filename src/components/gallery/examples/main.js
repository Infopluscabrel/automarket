import Vue from 'vue'
import App from './App.vue'
import VueEasyLightbox from '../src/index.ts'

Vue.use(VueEasyLightbox)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
