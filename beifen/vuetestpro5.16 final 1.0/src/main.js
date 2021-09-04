import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import store from './store'
import filter from './filter'
import './registerServiceWorker'
import BootstrapVue from 'bootstrap-vue'
import VuejsDialog from 'vuejs-dialog';
import VuejsDialogMixin from 'vuejs-dialog/dist/vuejs-dialog-mixin.min.js'; // only needed in custom components
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
// include the default style
import 'vuejs-dialog/dist/vuejs-dialog.min.css';
Vue.use(ElementUI);
// Tell Vue to install the plugin.
Vue.use(VuejsDialog);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "babel-polyfill";
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
Vue.prototype.$http = axios;
//Vue.use(axios);
//var string1 = new Array();


new Vue({
  router,
  store,
  filter,
  render: h => h(App)
}).$mount('#app')
