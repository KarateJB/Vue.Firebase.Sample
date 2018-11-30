<template>
  <div
    class="card"
    @dragover.prevent="isHovering=true"
    @dragleave.prevent="isHovering=false"
    @drop.prevent="upload"
  >
    <div class="drop-zone card-img-top" :class="{'hovering': isHovering}">
      <label v-if="!downloadUri">{{ msg }}</label>
      <img v-if="downloadUri" class="drop-img" :src="downloadUri">
    </div>
    <div class="card-body">
      <input class="file-input" type="file" @change="upload($event.target.files)">
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
    upload(event) {
      var vm = this;
      console.log(event.dataTransfer);
      const eventFiles = event.dataTransfer.files;
      const file = eventFiles.item(0);
      const fileExtension = file.name.split(".").pop();
      const path = `Demo/${appUtil.generateUUID()}.${fileExtension}`;
      const customerMetadata = "Product image";

      if (file.type.split("/")[0] !== "image") {
        this.msg = "Unsupported file type!";
        return;
      }

      let loader = this.$loading.show();
      let fileUri;
      let ref = firebaseStorage.ref(path);
      ref.put(file).then(function(snapshot) {
        console.log(snapshot.ref.getDownloadURL());
        snapshot.ref.getDownloadURL().then(function(downloadURL) {
          loader.hide();
          vm.downloadUri = downloadURL;
        });
      });

      // let percentage$ = task.percentageChanges();
      // let snapshot$ = task.snapshotChanges();
      // let downloadUri$ = this.task.downloadURL();
      // let snapshot$ = task.snapshot;

      // //Monitor the upload progress
      // snapshot$.subscribe(
      //   snap => {
      //     console.log(
      //       `State:${snap.state} for ${snap.bytesTransferred}/${
      //         snap.totalBytes
      //       }`
      //     );
      //     if (
      //       snap.state === "running" &&
      //       snap.bytesTransferred < snap.totalBytes
      //     ) {
      //       //Do something when uploading file
      //     } else if (snap.state === "success") {
      //       loader.hide();
      //       // this.downloadUri$.subscribe(uri => this.downloadUri = uri);
      //       this.downloadUri = firebaseStorage.ref(path).getDownloadURL();
      //     }
      //   },
      //   error => {
      //     loader.hide();
      //     this.$toastr.e("Access denied!");
      //   }
      // );
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

