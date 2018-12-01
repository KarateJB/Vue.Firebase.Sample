<template>
  <div
    class="card"
    @dragover.prevent="isHovering=true"
    @dragleave.prevent="isHovering=false"
    @drop.prevent="upload($event, 'drag')"
  >
    <div class="drop-zone card-img-top" :class="{'hovering': isHovering}">
      <label v-if="!img">{{ msg }}</label>
      <img v-if="img" class="drop-img" :src="img">
    </div>
    <div class="card-body">
      <input class="file-input" type="file" ref="file" @change="upload($event,'select')">
    </div>
  </div>
</template>

<script>
import appUtil from "../modules/app-util";

export default {
  name: "file-upload",
  props: {
    img: {
      type: String
    }
  },
  data() {
    return {
      downloadUri: "",
      isHovering: false,
      msg: ""
    };
  },
  methods: {
    selectToUpload(event){
      var vm = this;
      file = this.$refs.file.files[0];
    },
    upload(event, uploadBy) {
      var vm = this;
      let eventFiles = null;
      let file = null;

      switch(uploadBy){
        case "drag":
          eventFiles = event.dataTransfer.files;
          console.log(eventFiles.item);
          file = eventFiles.item(0);
          break;
        case "select":
          eventFiles = this.$refs.file.files;
          file = eventFiles[0];
          console.log(file);
          break;
      }

      let fileExtension = file.name.split(".").pop();
      const path = `Demo/${appUtil.generateUUID()}.${fileExtension}`;
      const customerMetadata = "Product image";

      if (file.type.split("/")[0] !== "image") {
        this.msg = "Unsupported file type!";
        return;
      }

      let loader = this.$loading.show();
      let fileUri;
      let ref = firebaseStorage.ref(path);
      ref.put(file).then(snapshot => {
        console.log(snapshot.ref.getDownloadURL());
        snapshot.ref.getDownloadURL().then(function(downloadUrl) {
          loader.hide();
          vm.img = downloadUrl;
          vm.$emit('update:img', downloadUrl);
        });
      }, err => {
        error => {
          loader.hide();
          vm.value = "";
          vm.$toastr.e("Access denied!");
        }
      });

    }
  },
  created() {
    this.msg = "Drop image here or use the following upload button...";
  }
};
</script>

<style>
.hovering {
  background-color: lightgreen;
}

.drop-zone {
  width: 150px;
  height: 150px;
  border: 1px dotted darkblue;
}

.drop-img {
  width: 150px;
  height: 150px;
}
</style>

