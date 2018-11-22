import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueFire from 'vuefire'
/* Components */
import Login from './components/login'
import ProdOutlet from './components/prod-outlet'
import ProdList from './components/prod-list'
import ProdCreate from './components/prod-create'
/* vue-numeric */
import VueNumeric from 'vue-numeric'
import toastrConfig from './modules/toastr.config'
//vue-toastr
import Toastr from 'vue-toastr';
import 'vue-toastr/dist/vue-toastr.css'
//vue-loading-overlay
import VueLoading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import vueLoadingOverlayConfig from './modules/vue-loading-overlay.config'
/* font-awesome*/
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faCrosshairs, faSave, faPlus, faShoppingCart, faMinus } from '@fortawesome/free-solid-svg-icons'
import { faGooglePlus } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { dom } from '@fortawesome/fontawesome-svg-core'
/* vuex */
import Vuex from 'vuex'
import { store } from './vuex/shopcart.store.js'

/* firebase */
import firebaseConfig from './modules/firebase.config.prod'
// import * as firebase from 'firebase' //For Dev envoronment
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'


Vue.config.productionTip = false;

//vue-numeric
Vue.use(VueNumeric);

//vue-toastr
Vue.use(Toastr, toastrConfig);

//vue-loading-overlay
Vue.use(VueLoading, vueLoadingOverlayConfig);

//vuex
Vue.use(Vuex);

//font-awesome
library.add(faCoffee,faCrosshairs, faSave, faPlus, faMinus,faShoppingCart, faGooglePlus);
Vue.component('font-awesome-icon', FontAwesomeIcon)
dom.watch(); //Optional, for converting i tags to svg tags

//firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
window.firebase = firebase;
window.firebaseDb = firebaseApp.database();
window.firebaseAuth = firebaseApp.auth();


//Routing
const routes = [
  { path: '/login', component: Login },
  { 
    path: '/prods', component: ProdOutlet,
    children:[
      { path: 'list/:prodType', component: ProdList }
    ]
  },
  { path: '/prod-create', component: ProdCreate },
  { path: '/prod-edit/:id', component: ProdCreate },
   //{ path: '/orders', component: Orders },
   {path: '*', redirect: '/login'}
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

Vue.use(VueRouter);

//VueFire
Vue.use(VueFire)


/* Global methods */
Vue.prototype.$fbBindAsArray = function(key, ref, cancelCallback) {
  return new Promise(resolve => {
    this.$bindAsArray(key, ref, cancelCallback, resolve);
  });
}
Vue.prototype.$fbBindAsObject = function(key, ref, cancelCallback) {
  return new Promise(resolve => {
    this.$bindAsObject(key, ref, cancelCallback, resolve);
  });
}

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
