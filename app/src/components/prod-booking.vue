<template>
    <table>
        <tr>
          <td>{{ currentDatetime }}</td>
            <td @click="decrement()">
                <label style="min-width:25px">
                    <font-awesome-icon :icon="['fas', 'minus']"/>
                </label>
            </td>
            <td>
                <vue-numeric style="max-width:40px" 
                             separator="," 
                             v-model="shopItem.count" 
                             :minus="false">
                </vue-numeric>
            </td>
            <td @click="increment()">
                <label style="min-width:25px">
                    <font-awesome-icon :icon="['fas', 'plus']" />
                </label>
            </td>
        </tr>
    </table>
</template>



<script>
import { store, INCREMENT, DECREMENT, RESET } from "../vuex/shopcart.action";
import { mapState } from "vuex";
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
    currentDatetime() {
      return new Date();
    },
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
    increment() {
      this.shopItem.count += 1;
      store.commit(INCREMENT);
      // this.$store.state.count++;
      console.log("current: " + this.count);
      console.log("next: " + this.nextCount);
      console.log("previous: " + this.previousCount);
    },
    decrement() {
      if (this.shopItem.count > 0) this.shopItem.count -= 1;
      store.commit(DECREMENT);
      // this.$store.state.count--;
      console.log("current: " + this.count);
      console.log("next: " + this.nextCount);
      console.log("previous: " + this.previousCount);
    }
  },
  created() {}
};
</script>
