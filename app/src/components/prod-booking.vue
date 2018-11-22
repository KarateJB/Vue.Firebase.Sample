<template>
    <table>
        <tr>
            <td @click="decrement()">
                <button style="min-width:25px">
                    <font-awesome-icon :icon="['fas', 'minus']"/>
                </button>
            </td>
            <td>
                <vue-numeric style="max-width:40px" 
                             separator="," 
                             :value="item.count" 
                             :minus="false">
                </vue-numeric>
            </td>
            <td @click="increment()">
                <button style="min-width:25px">
                    <font-awesome-icon :icon="['fas', 'plus']" />
                </button>
            </td>
            <td @click="increment(10)">
              <button style="min-width:25px">
                    +10
              </button>
            </td>
        </tr>
    </table>
</template>



<script>
import { store, PUSH, PULL, CLEAR } from "../vuex/shopcart.store.js";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

const STEP = 1;

export default {
  name: "prod-booking",
  props: {
    shopItem: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      item: {}
    };
  },
  computed: {
    // Other computed props

    // mix this into the outer object with the object spread operator
    ...mapState({
      totalCnt: state => state.totalCnt,
      totalPrice: state => state.totalPrice,
      totalCount: "totalCnt" // Alias name for totalCnt
    }),
    ...mapGetters({
      totalCnt: "totalCnt",
      totalPrice: "totalPrice",
      targetItem: "item"
    })
  },
  methods: {
    increment(amt) {
      amt = amt || 1;
      this.item.count += amt;
      if(amt===1)
        store.dispatch("push", this.item);
      else if(amt==10)
        store.dispatch("pushBy10", this.item);
        
      this.$emit("show-shopcart");
    },
    decrement() {
      if (this.item.count > 0) {
        this.item.count -= 1;
        store.dispatch("pull", this.item);

      this.$emit("show-shopcart");
      }
    }
  },
  created() {
    this.item = store.getters.item(this.shopItem.id);
    if (!this.item) {
      this.item = {
        id: this.shopItem.id,
        title: this.shopItem.title,
        price: this.shopItem.price,
        count: 0
      };
    }
  },
  mounted() {}
};
</script>
