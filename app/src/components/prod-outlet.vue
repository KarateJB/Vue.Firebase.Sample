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

export default {
  name: "prod-outlet",
  data() {
    return {};
  },
  methods: {
    clear() {
      store.dispatch("clear");
      console.log(store.state);
      this.$router.replace("/prods");
    },
    async setFbMessaging() {
      let msgService = new messagingService();

      //Request permission
      await msgService.requestPermissionAsync();

      //Watch token changes
      await msgService.watchTokenChangesAsync();

      return msgService.getTokenAsync();

      //Delete token test
      //msgService.deleteTokenAsync();
    },
    pushMsg(token) {
      console.log("Start push msg with token: " + token);
      this.axios
        .get(
          "https://us-central1-shopcart-vue.cloudfunctions.net/sendBookingMsg",
          {
            headers: { token: token }
          }
        )
        .then(result => {
          console.log(result);
        });
    }
  },
  mounted() {
    this.setFbMessaging().then(token => {
      console.log("Token", token);
      this.pushMsg(token);
    });
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
