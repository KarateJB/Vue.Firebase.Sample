<template>
  <div>
    <div class="container">
        <div class="row">
            <div class="col-md-1">
            </div>
            <div class="col-md-10">
              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th>Type</th>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Shopping Cart</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in fbArray" :key="item.id">
                    <td>{{ item.type }}</td>
                    <td>{{ item.id }}</td>
                    <td>{{ item.title }}</td>
                    <td>
                      <vue-numeric currency="$" separator="," 
                                  v-model="item.price" 
                                  :read-only=true></vue-numeric>
                    </td>
                    <td>
                      <prod-booking v-model="item.count" :shop-item="item" @show-shopcart="showShopcart"></prod-booking>
                    </td>
                    <td>
                        <input type="button" value="Edit" class="btn btn-info" @click="edit(item.id)" />
                        &nbsp;
                        <input type="button" value="Remove" class="btn btn-danger" @click="remove(item.id)" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-1">
            </div>
        </div>
    </div>
    
  </div>
</template>

<script>
import ProdBooking from "./prod-booking";
import MyLoading from "./my-loading";
import Toastr from "vue-toastr";
// Vue.component('vue-toastr',Toastr);

export default {
  name: "prod-list",
  components: {
    ProdBooking,
    "vue-toastr": Toastr
  },
  data() {
    return {
      targetProdType: "", //Target product type, such as "book", "toy"
      fbArray: [],
      fbObject: {}
    };
  },
  // firebase: {
  //     fbArray: firebaseDb.ref('Demo/products').limitToLast(10), //bind as an array
  //     fbObject: {
  //       source: firebaseDb.ref('Demo/products/800afd3c-1615-49ba-b33d-497842af6c82'),
  //       asObject: true, //Bind as object
  //       cancelCallback: function () {
  //         console.log("Not ready for the object!");
  //       },
  //       readyCallback: function () {
  //         console.log("Get ready for the object!");
  //     }
  //   }
  // },
  methods: {
    
    showShopcart(){
      this.$toastr.s(this.$store.state.totalCnt + ' items, total $' + this.$store.state.totalPrice);
    },
    edit(id) {
      this.$router.replace("/prod-edit/" + encodeURIComponent(id));
    },
    remove(id) {
      this.$bindAsObject(
        "removeObject",
        firebaseDb.ref("Demo/products").child(id)
      );

      this.$firebaseRefs.removeObject.remove().then(() => {
        this.$toastr.i("The data has been removed!");
        this.$unbind("removeObject");
      });
    }
  },
  created(){
    this.targetProdType = this.$route.params.prodType;
    console.log("Target Prod Type = " + this.targetProdType);
  },
  mounted() {
    var vm = this;
    let loader = this.$loading.show();
    vm.$fbBindAsArray(
      "fbArray",
      // firebaseDb.ref("Demo/products").limitToLast(100)
      firebaseDb.ref("Demo/products").orderByChild('type').equalTo(this.targetProdType)
    ).then(() => {
      loader.hide();
      this.fbArray 
    });
    // Array bindings
    // vm.$bindAsArray('fbArray', firebaseDb.ref('Demo/products').limitToLast(100));
    // Object bindings
    // vm.$bindAsObject('fbObject', firebaseDb.ref('Demo/products').child('800afd3c-1615-49ba-b33d-497842af6c82'));
  }
};
</script>
