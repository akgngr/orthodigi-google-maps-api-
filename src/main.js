import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import * as GmapVue from "gmap-vue";
import "@/assets/style.css";
import VueMeta from "vue-meta";

Vue.config.productionTip = false;

Vue.use(GmapVue, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAPS_API,
    libraries: "places",
  },
  installComponents: true,
});

Vue.use(VueMeta);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
