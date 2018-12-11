<template>
  <div>
    <div>
        <button class='btn btn-info' :disabled='isDisableSendOrder' @click="sendOrder">
            <font-awesome-icon :icon="['fas', 'save']"/>Send Order
        </button>
        <router-link to="/prods" class="btn btn-default">
            <font-awesome-icon :icon="['fas', 'home']" />Back
        </router-link>
        <span v-for="st in states" :key="st">
            <font-awesome-icon :icon="['fas','faArrowCircleRight']" />{{ st }}
        </span>
    </div>
    <div>
        <table class="table table-inverse">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Number</th>
                    <th>Price/per</th>
                    <th>Total Price</th>
                </tr>
            </thead>
            <tbody v-if="shopcart">
                <tr v-for="item of shopcart.items" :key="item.id">
                    <td>{{item.title}}</td>
                    <td>{{item.count}}</td>
                    <td>{{item.price}}</td>
                    <td>{{item.count * item.price}}</td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>

<script>
import { Order } from "../class/Order"
import appUtil from "../modules/app-util"
import { store } from "../vuex/shopcart.store.js"
import messagingService from "../modules/messaging-service";
import { setTimeout, setInterval } from "timers";

export default {
  name: "shopcart",
  data() {
    return {
      isDisableSendOrder: false,
      states:[],
      shopcart: null
    }
  },
  methods: {
    pushOrdersMsg(user, itemsCnt) {
      console.log(`Start push msg with user: ${user}, items: ${itemsCnt}`);
      this.axios
        .get(
          "https://us-central1-shopcart-vue.cloudfunctions.net/sendOrdersMsg" + "?itemscnt=" + itemsCnt,
          {
            headers: {
              "user-name": user,
            }
          }
        )
        .then(result => {
          console.log(result);
        });
    },
    sendOrder(){
        var vm = this;

        let newOrder = new Order(
          appUtil.generateUUID(), //id
          firebaseAuth.currentUser.email, //customer email
          vm.shopcart.items,
          "SAVED"
        );
        
        let loader = vm.$loading.show();

        this.$bindAsObject(
          "fbObject",
          firebaseDb.ref("Demo/orders").child(newOrder.id)
        );

        this.$firebaseRefs.fbObject
          .set(newOrder)
          .then(() => {
            loader.hide();
            vm.$toastr.s("The order has been saved!");

            setTimeout(()=>{

              //Push a message to others.
              //If you enable cloud function: sendOrdersMsgByRtdb, disable this line 
              vm.pushOrdersMsg(firebaseAuth.currentUser.displayName, vm.shopcart.items.length);
              
              //Redirect
              vm.$router.replace("/prods");

            }, 2500)
          })
          .catch(e => this.$toastr.e("Error! Access denied!"));
    }
  },
  created() {
    this.shopcart = store.state;
  }
};
</script>

