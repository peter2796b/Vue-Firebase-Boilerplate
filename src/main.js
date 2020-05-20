import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import firebase from "./services/firebase";
import Cookies from "js-cookie";

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const messaging = firebase.messaging();
messaging.usePublicVapidKey(process.env.VUE_APP_FCM_PUBLIC_KEY);

let user = Cookies.get("user");
Vue.prototype.$authUser = null;
if (user) {
  user = JSON.parse(user);
  Vue.prototype.$authUser = user;
}

Vue.prototype.$db = db;
Vue.prototype.$auth = auth;
Vue.prototype.$storage = storage;
Vue.prototype.$messaging = messaging;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
