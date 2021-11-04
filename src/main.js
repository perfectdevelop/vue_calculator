import Vue from 'vue'
import App from './App.vue'
import VueInputMask from 'vue-inputmask';
import $ from "jquery";

Vue.config.productionTip = false
Vue.use(VueInputMask.default);

new Vue({
  render: h => h(App),
}).$mount('#app')
