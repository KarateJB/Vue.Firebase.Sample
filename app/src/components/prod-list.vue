<template>
  <div>
    <div>
      <div class="container">
        <div class="row">
          <div class="col col-md-8">
            <router-link to="/prod-create" tag="button" class="btn btn-alert">            
              Create
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <hr />
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
                      <prod-booking v-model="item.count" :shop-item="item"></prod-booking>
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
    <div class="shopcart" @click="goToShopcart()">
      <font-awesome-icon :icon="['fas', 'shopping-cart']" size="3x"/>
    </div>
  </div>
</template>

<script>

import ProdBooking from "./prod-booking"

export default {
  name: 'prod-list',
  components:{
    ProdBooking
  },
  data () {
    return {
      fbArray: [],
      fbObject: {}
    }
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
  methods:{
    goToShopcart(){
      // alert()
      this.$toastr.s("Not implement yet!");
      // console.log(this.fbArray);
    },
    edit(id){
      this.$router.replace("/prod-edit/" + encodeURIComponent(id));
    },
    remove(id){

    }
  },
  mounted(){
    var vm = this;
    // let products = db.ref('/Demo/products/');
    // this.afDb.object<Product>('/Demo/products/' + key).valueChanges().take(1).map(x => <Product>x);
    vm.$bindAsArray('fbArray', firebaseDb.ref('Demo/products').limitToLast(25));
    vm.$bindAsObject('fbObject', firebaseDb.ref('Demo/products').child('800afd3c-1615-49ba-b33d-497842af6c82'));
  },
  created(){
  }
}
</script>

<style>


.footer {
  position:fixed;
  bottom:0;
  height:auto;
  margin-top:40px;
  width:100%;
  text-align:center;
}

.shopcart {
  position:fixed;
  bottom:0;
  right:0;
  height:auto;
  margin:40px 40px 40px 40px;
}


</style>
