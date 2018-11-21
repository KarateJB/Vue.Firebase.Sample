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
                             v-model="shopItem.count" 
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
import { store, INCREMENT, DECREMENT, RESET } from "../vuex/shopcart.action";
import { mapState, mapMutations, mapActions } from "vuex";
// import { shopcartMapState } from "../vuex/shopcart.map-state"

const STEP = 1;

export default {
  name: "prod-booking",
  props: {
    shopItem: {
      //id:String,title:String,count:Number,price:Number
      type: Object,
      required: true
    }
  },
  computed: {
    // Other computed props

    // mix this into the outer object with the object spread operator
    ...mapState({
      count: state => state.count,
      countAlias: "count",
      nextCount(state) {
        return state.count + STEP;
      },
      previousCount(state) {
        return state.count - STEP;
      }
    })
  },
  /* If no other computed prop */
  // computed: mapState({
  //   count: state => state.count,
  //   countAlias: "count",
  //   nextCount(state) {
  //     return state.count + STEP;
  //   },
  //   previousCount(state) {
  //     return state.count - STEP;
  //   }
  // }),
  watch: {
    "shopItem.count": function(newVal, oldVal) {
      this.$emit("input", newVal);
    }
  },
  data() {
    return {};
  },
  methods: {
    increment(amt) {
      amt = amt || 1;
      this.shopItem.count += amt;

      /* Use imported singleton store */
      // store.commit(INCREMENT, amt);

      /* Use injected store  */
      // this.$store.state.count++;

      /* Use injected store (mapMutations) */
      //this.add(amt);

      /* Use Actions */
      // store.dispatch("increment", amt);

      /* Use Actions (mapActions) */
      this.add(amt);

      /* Call vuex related computed props */
      // console.log("current: " + this.count);
      // console.log("next: " + this.nextCount);
      // console.log("previous: " + this.previousCount);
    },
    decrement() {
      if (this.shopItem.count > 0) this.shopItem.count -= 1;

      this.$store.dispatch("decrement");
    },
    // ...mapMutations({
    //   add: "increment", // Map `this.add()` to `this.$store.commit('increment')`
    //   minus: "decrement", // Map `this.add()` to `this.$store.commit('decrement')`
    //   clear: "reset" // Map `this.add()` to `this.$store.commit('reset')`
    // }),
    ...mapActions({
      add: "increment", // Map `this.add()` to `this.$store.dispatch('increment')`
      minus: "decrement", // Map `this.add()` to `this.$store.dispatch('decrement')`
      clear: "reset" // Map `this.add()` to `this.$store.dispatch('reset')`
    })
  },
  created() {}
};
</script>
