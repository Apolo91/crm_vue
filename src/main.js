import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dateFilter from "./filters/date.filter";
import currencyFilter from "./filters/currency.filter";
import tooltipDirective from "@/directives/tooltip.directive";
import messagePlugin from "./utils/message.plugin";
import Loader from "./components/app/Loader";
import Paginate from 'vuejs-paginate'

import "materialize-css/dist/js/materialize.min.js";
import "./registerServiceWorker";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE,
  authDomain: "crm-vue-app.firebaseapp.com",
  databaseURL: "https://crm-vue-app.firebaseio.com",
  projectId: "crm-vue-app",
  storageBucket: "crm-vue-app.appspot.com",
  messagingSenderId: "278309653665",
  appId: "1:278309653665:web:15892064ef633385c874e0",
  measurementId: "G-9YH6PYP38V"
};

Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.filter("date", dateFilter);
Vue.filter("currency", currencyFilter);
Vue.directive('tooltip',tooltipDirective)
Vue.component("Loader", Loader);
Vue.component('Paginate', Paginate)

firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
