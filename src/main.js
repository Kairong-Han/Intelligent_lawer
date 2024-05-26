import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import uploader from 'vue-simple-uploader'
import "element-ui/lib/theme-chalk/index.css";
import router from "./router/index";
import vuescroll from "vuescroll";
import axios from "axios";
import store from "./store";
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(vuescroll);
Vue.use(uploader);

// Vue.use(axios);
// axios.defaults.baseURL = "http://localhost:12345";
// axios.defaults.baseURL = "http://njhlwtj.iflysec.com";
Vue.prototype.$http = axios;
new Vue({
  el: "#app",
  render: (h) => h(App),
  router: router,
  store: store,
}).$mount("#app");
