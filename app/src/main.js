import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueFire from 'vuefire'
/* Components */
import Login from './components/login'
import ProdList from './components/prod-list'
/* vue-numeric */
import VueNumeric from 'vue-numeric'
//vue-toastr
import Toastr from 'vue-toastr';
/* font-awesome*/
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faCrosshairs, faSave, faPlus, faShoppingCart, faMinus } from '@fortawesome/free-solid-svg-icons'
import { faGooglePlus } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { dom } from '@fortawesome/fontawesome-svg-core'
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
require('vue-toastr/dist/vue-toastr.css');
Vue.use(Toastr, { /* options */ });

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
  { path: '/prod-list', component: ProdList },
   //{ path: '/orders', component: Orders },
   {path: '*', redirect: '/login'}
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

Vue.use(VueRouter);



//VueFire
Vue.use(VueFire)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
