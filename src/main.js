// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/store'
import 'golden-layout/src/css/goldenlayout-base.css'
import 'golden-layout/src/css/goldenlayout-light-theme.css'
import Exchange from './components/Exchange'
import Pairs from './components/Pairs'
import Trades from './components/Trades'

Vue.component('app', App)
Vue.component('Exchange', Exchange)
Vue.component('Pairs', Pairs)
Vue.component('Trades', Trades)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  store
})
