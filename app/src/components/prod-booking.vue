<template>
    <table>
        <tr>
            <td @click="decrement()">
                <label style="min-width:25px">
                    <font-awesome-icon :icon="['fas', 'minus']" />
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
export default {
  name: "prod-booking",
  props: {
    shopItem: {
      //id:String,title:String,count:Number,price:Number
      type: Object,
      required: true
    }
  },
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
    },
    decrement() {
      if (this.shopItem.count > 0) this.shopItem.count -= 1;
    }
  },
  created() {}
};
</script>
