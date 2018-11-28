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
import { store, PUSH, PULL, CLEAR } from "../vuex/shopcart.store.js";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

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
    sendOrder(){

    }
  },
  created() {
    this.shopcart = store.state;
  }
};
</script>

