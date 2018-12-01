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
            <file-upload :img.sync="prod.imgUri"></file-upload>
        </div>
    </div>

    <div class="form-group text-center">
        <input type="button" class="btn btn-success" value="Save" @click="save" />
        <router-link to="/prods" tag="button" class="btn btn-alert">            
              Cancel
        </router-link>
    </div>
  </div>
</template>

<script>
import appUtil from "../modules/app-util";
import ProdService from "../modules/prod-service";
import fileUpload from "./file-upload"

const prodService = new ProdService();

export default {
  name: "prod-create",
  components:{
    fileUpload
  },
  data() {
    return {
      isEdit: false, //Is in edit mode
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
      if (this.isEdit === false) {
        //Create
        this.prod.id = appUtil.generateUUID();
        this.prod.typeId = this.selectedProdType.id;
        this.prod.type = this.selectedProdType.name;

        /* Method 1. Use bindAsArray, but the key will be created by Firebase */
        //   this.$bindAsArray('fbArray', firebaseDb.ref('Demo/products'));
        //   this.$firebaseRefs.fbArray.push(this.prod);

        /* Method 2. Use bindAsObject and assign the key value */
        this.$bindAsObject(
          "fbObject",
          firebaseDb.ref("Demo/products").child(this.prod.id)
        );

        this.$firebaseRefs.fbObject
          .set(this.prod)
          .then(() => {
            this.$toastr.s("The data has been saved!");
            this.$router.replace("/prods");
          })
          .catch(e => this.$toastr.e("Error! Access denied!"));
      } else {

        //Edit
        delete this.prod[".key"]; //Must remove the ".key" property, see https://github.com/vuejs/vuefire#data-normalization
        this.prod.typeId = this.selectedProdType.id;
        this.prod.type = this.selectedProdType.name;

        this.$firebaseRefs.prod
          .set(this.prod)
          .then(() => {
            this.$toastr.s("The data has been saved!");
            this.$router.replace("/prods");
          })
          .catch(e => this.$toastr.e("Error! Access denied!"));

          //Notice that you can refer to the property (ex. title) of the data as following
          //and set it only but not the entire object
          // this.$bindAsObject("myProp", firebaseDb.ref("Demo/products").child(this.prod.id + "/title"));
          // this.$firebaseRefs.myProp.set("Hello, Vuejs!");
      }
    },
    setImgUri(event) {
      this.prod.imgUri = event;
    },    
  },
  mounted(){
    this.isLoading = true;
      setTimeout(() => {
            this.isLoading = false;
        },3000)
  },
  created() {
    this.prodTypes = prodService.getProductTypes();

    if (this.$route.params.id) {
      //Check if edit
      let encodeId = this.$route.params.id;
      let decodeId = decodeURIComponent(encodeId);

      // let fbObject = {};
      this.$fbBindAsObject(
        "prod",
        firebaseDb.ref("Demo/products").child(decodeId)
      ).then(() => {
        console.log(this.prod);
        console.log(this.$firebaseRefs.prod);
        this.selectedProdType = this.prodTypes.find(
          x => x.id === this.prod.typeId
        );
        this.isEdit = true;
      });
    }
  }
};
</script>

<style>
</style>