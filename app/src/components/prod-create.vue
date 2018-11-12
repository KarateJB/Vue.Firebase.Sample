<template>
  <div class="form-horizontal">
    <div class="form-group">
        <label class="control-label  col-md-2">Type</label>
        <div class="col-md-3">
            <select class="form-control" v-model="selectedProdType" @change="changeSelectedType">
                <option v-for="type in prodTypes" :key="type.id" :value="type">{{type.name}}</option>
            </select>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label  col-md-2">Title</label>
        <div class="col-md-3">
            <input v-model="prod.title" class="form-control" :placeholder="prodHint" />
        </div>
    </div>
    <div class="form-group">
        <label class="control-label  col-md-2">Price</label>
        <div class="col-md-3">
            <input v-model="prod.price" class="form-control" />
        </div>
    </div>
    <div class="form-group">
        <label class="control-label  col-md-2">Product image</label>
        <div class="col-md-3">
            <!-- <file-upload :img="prod.imgUri" @change-img-uri="setImgUri($event)"></file-upload> -->
        </div>
    </div>

    <div class="form-group text-center">
        <input type="button" class="btn btn-success" value="Save" @click="save" />
        <router-link to="/prod-list" tag="button" class="btn btn-alert">            
              Cancel
        </router-link>
    </div>
  </div>
</template>

<script>
import appUtil from "../modules/app-util";
import ProdService from "../modules/prod-service";

const prodService = new ProdService();

export default {
  name: "prod-create",
  data() {
    return {
      selectedProdType: {},
      prodHint: "",
      prod: {
        id: "",
        typeId: "",
        type: "",
        title: "",
        price: 0,
        imgUri: ""
      }
    };
  },
  methods: {
    changeSelectedType() {
      var vm = this;
      switch (vm.selectedProdType.id) {
        case 1:
          vm.prodHint = "Enter a book's title..";
          break;
        case 2:
          vm.prodHint = "Enter a toy's name..";
          break;
        default:
          vm.prodHint = "";
          break;
      }
    },
    save() {
      this.prod.id = appUtil.generateUUID();
      this.prod.typeId = this.selectedProdType.id;
      this.prod.type = this.selectedProdType.name;
      console.log(this.prod);

      //   let fbArray=[];
      //   this.$bindAsArray('fbArray', firebaseDb.ref('Demo/products'));
      let fbObject = {};
      this.$bindAsObject(
        "fbObject",
        firebaseDb.ref("Demo/products").child(this.prod.id)
      );

      //   this.$firebaseRefs.fbArray.push(this.prod)
      this.$firebaseRefs.fbObject
        .set(this.prod)
        .then(() => {
          this.$toastr.s("The data has been saved!");
          this.$router.replace("/prod-list");
        })
        .catch(e => this.$toastr.e("Error! Access denied!"));
    },
    setImgUri(event) {
      this.prod.imgUri = event;
    }
  },
  created() {
    this.prodTypes = prodService.getProductTypes();
    console.info(this.prodTypes);
  }
};
</script>

<style>
</style>