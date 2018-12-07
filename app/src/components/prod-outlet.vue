<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col col-md-2">
          <router-link to="/prod-create" tag="button" class="btn btn-success">Create</router-link>
        </div>
        <div class="col col-md-2">
          <button class="btn btn-warning" @click="clear">Clear All</button>
        </div>
      </div>
    </div>
    <hr>
    <div>
      <div class="btn-group" role="group" aria-label="Basic example">
        <router-link to="/prods/list/Book" tag="button" class="btn btn-secondary">Books</router-link>
        <router-link to="/prods/list/Toy" tag="button" class="btn btn-secondary">Toys</router-link>
      </div>
      <router-view :key="$route.fullPath"></router-view>

      <router-link to="/shopcart" class="shopcart">
        <font-awesome-icon :icon="['fas', 'shopping-cart']" size="3x"/>
      </router-link>
    </div>
  </div>
</template>

<script>
import { store, PUSH, PULL, CLEAR } from "../vuex/shopcart.store.js";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import messagingService from "../modules/messaging-service";
import { setTimeout, setInterval } from "timers";

export default {
  name: "prod-outlet",
  data() {
    return {
      user: null
    };
  },
  methods: {
    clear() {
      store.dispatch("clear");
      this.$router.replace("/prods");
    },
    async setFbMessaging() {
      let msgService = new messagingService();
      // await msgService.deleteTokenAsync();
      //Request permission
      await msgService.requestPermissionAsync();
     
      return msgService.getTokenAsync();
    },
    pushDiscountMsg(token, user) {
      console.log("Start push msg with token: " + token);
      this.axios
        .get(
          "https://us-central1-shopcart-vue.cloudfunctions.net/sendDiscountMsg",
          {
            headers: {
              token: token,
              "user-name": user
            }
          }
        )
        .then(result => {
          console.log(result);
        });
    }
  },
  created() {
    var vm = this;

    //Add callback for receiving FCM
    firebaseMessaging.onMessage(function(payload) {
      console.log("Message received. ", payload);

      let notification = payload.notification;

      vm.$toastr.Add({
        title: notification.title,
        msg: notification.body,
        clickClose: true,
        timeout: 3000, // 3 sec
        position: "toast-top-full-width",
        type: "info",
        preventDuplicates: true,
        style: { width: "250px" }
      });
    });

    //Start calling Firebase Functions to trigger pushing FCM
    firebaseAuth.onAuthStateChanged(user => {
      let userName = "Anonymous";
      if (user) {
        userName = user.displayName;
        this.user = user;
      }

      vm.setFbMessaging().then(token => {
        console.log("Token=", token);
        console.log("User=" + userName);

        setTimeout(() => {
          vm.pushDiscountMsg(token, userName);
        }, 2000);
      });
    });
  },
  destroyed() {
    //Delete token test
    // msgService.deleteTokenAsync();
  }
};
</script>


<style>
.footer {
  position: fixed;
  bottom: 0;
  height: auto;
  margin-top: 40px;
  width: 100%;
  text-align: center;
}

.shopcart {
  position: fixed;
  bottom: 0;
  right: 0;
  height: auto;
  margin: 40px 40px 40px 40px;
}
</style>
