<template>
  <div id="app">
    <div class="menuBtn" @click="toggleMenu">
      <!-- <i class="blue fa fa-th-list fa-2x"></i> -->
      <button class="btn btn-default">Menu</button>
    </div>
    <div class="topMenu" v-show="menuState==='in'">
      <ul>
        <li>
          <router-link to="/prods" @click.native="toggleMenu">
            <font-awesome-icon :icon="['fas', 'crosshairs']" spin/>Buy something
          </router-link>
        </li>
        <li>
          <router-link to="/orders" @click.native="toggleMenu">
            <font-awesome-icon :icon="['fas', 'save']"/>My orders
          </router-link>
        </li>
        <li v-if="!isAuth">
          <router-link to="/login" tag="button" class="btn btn-success" @click.native="toggleMenu">
            <font-awesome-icon :icon="['fab', 'google-plus']"/>Login
          </router-link>
        </li>
        <li v-if="isAuth===true">
          <router-link to="/login" tag="button" class="btn btn-success" @click.native="toggleMenu">
            <font-awesome-icon :icon="['fab', 'google-plus']"/>
            {{user.displayName}}
          </router-link>
        </li>
      </ul>
    </div>
    <br>
    <br>
    <!-- route outlet -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      menuState: "out",
      user: null,
      isAuth: false
    };
  },
  methods: {
    toggleMenu() {
      if (!this.isAuth) {
        this.$toastr.e("Pls login first!");
        return;
      } else this.menuState = this.menuState === "out" ? "in" : "out";
    },
    logout() {
      firebaseAuth
        .signOut()
        .then(() => {
          this.user = null;
          this.isAuth = false;
          this.$router.replace("/login");
        })
        .catch(err => console.log(error));
    }
  },
  beforeCreate() {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        this.isAuth = true;
      }
    });
  },
  mounted() {
    this.user = firebaseAuth.currentUser;
    this.isAuth = this.user ? true : false;
  }
};
</script>

<style>
a {
  cursor: pointer;
}

.topMenu {
  background: #000;
  color: #fff;
  position: fixed;
  left: auto;
  top: 0;
  right: 0;
  bottom: 0;
  width: 20%;
  min-width: 250px;
  z-index: 9999;
  font-family: Consolas;
}

.menuBtn {
  z-index: 9999;
  position: absolute;
  opacity: 0.6;
}

.menuBtnFake {
  z-index: 9999;
  position: absolute;
}

ul {
  font-size: 18px;
  line-height: 3;
  font-weight: 400;
  padding-top: 50px;
  list-style: none;
}

.center {
  text-align: center; /* center checkbox horizontally */
  vertical-align: middle; /* center checkbox vertically */
  margin: auto;
  width: 80%;
  /* border: 3px solid green; */
  padding: 10px;
}
</style>
