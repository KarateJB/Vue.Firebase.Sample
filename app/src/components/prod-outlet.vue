<template>
  <div>
    <div class="container">
        <div class="row">
            <div class="col col-md-8">
            <router-link to="/prod-create" tag="button" class="btn btn-success">            
                Create
            </router-link>
            </div>
        </div>
    </div>
    <hr />
    <div>
        <div class="btn-group" role="group" aria-label="Basic example">
            <router-link to="/prods/list/Book" tag="button" class="btn btn-secondary">            
                Books
            </router-link>
            <router-link to="/prods/list/Toy" tag="button" class="btn btn-secondary">    
                Toys
            </router-link>
        </div>
        <router-view :key="$route.fullPath"></router-view>
       <div class="shopcart" @click="goToShopcart()">
        <font-awesome-icon :icon="['fas', 'shopping-cart']" size="3x"/>
       </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "prod-outlet",
  data() {
    return {
     
    }
  },
  methods: {
     goToShopcart() {
      this.$toastr.w("Not implement yet!");
    },
  },
  mounted(){
    
  },
  created() {
    
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
