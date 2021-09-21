import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}

axios.defaults.baseURL = "https://still-citadel-19466.herokuapp.com"
  // process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://still-citadel-19466.herokuapp.com";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
