import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import * as GmapVue from 'gmap-vue'
import "@/assets/style.css"

Vue.config.productionTip = false;

Vue.use(GmapVue, {
  load: {
    key: 'AIzaSyC6tUfqd8WRwz9BgLZd-YGplzvUi8aqN98',
    libraries: 'places', 
  },
  installComponents: true
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
