<template>
  <div id="app" >
    <main>
      
      <nav class="navbar navbar-expand-lg navbar-light bg-light" id="nav">
        <img alt="Vue logo" src="./assets/logo.png" width="50px">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <router-link to="/" class="nav-link">Accueil</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/products" class="nav-link">Tous véhicules</router-link>
            </li>
            <!-- <li class="nav-item">
              <a class="nav-link" href="#">Catégories</a>
            </li> -->
            <li class="nav-item">
              <router-link to="/about" class="nav-link">Nous contacter</router-link>
            </li>
             <li class="nav-item">
              <router-link to="/about" class="nav-link">Votre voiture à vendre ici ? </router-link>
            </li>
          </ul>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/cart" class="nav-link">
                <i class="fa fa-shopping-cart mr-1">
                  <span class="ml-1">{{this.cartProducts.length}}</span>
                </i>
              </router-link>
            </li>
            <li class="nav-item dropdown" v-if="isLogged()">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >{{this.loggedUser.firstName}}</a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <router-link to="/" class="dropdown-item">Profile</router-link>
                <!-- <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>-->
                <router-link
                  to="/"
                  class="dropdown-item text-danger"
                  @click.native="loc_logout"
                >Logout</router-link>
              </div>
            </li>
            <li class="nav-item" v-if="!isLogged()">
              <router-link to="/login" class="nav-link">Se connecter</router-link>
            </li>
          </ul>
        </div>
      </nav>
     
    </main>
<router-view></router-view>
    <footer class="container-fluid footer text-left mt-3">
      <p class="mr-auto">
       
        <strong> Market Auto</strong>
        <div class="vendre mt-4 mb-2">
                <span class="text">
                  Besoin d'aide ? Ou 
                 votre voiture est à vendre ? contactez nous au 697476283 
                 </span>
                 <span class="text">
                 Ou écrivez nous sur <i class="fa fa-telegram" aria-hidden="true"></i> Telegram ou
                  <i class="fa fa-whatsapp" aria-hidden="true"></i>Whatsapp
                 </span>
              </div>
      </p>
      
    </footer>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import {
  isLoggedIn,
  getLoggedInUser
} from "./components/shared/service/authService";
export default {
  data() {
    return {
      cartValue: 0
    };
  },
  computed: mapState(["cartProducts", "loggedUser"]),
  methods: {
    /* Initially loading the cart products from local storage */

    ...mapMutations(["SET_CART_PRODUCTS", "ADD_LOGGED_USER"]),

    getLocalProducts() {
      const products = JSON.parse(localStorage.getItem("iki-cart"));

      if (products) {
        this.SET_CART_PRODUCTS(products);
      }
    },

    isLogged() {
      return isLoggedIn();
    },

    loc_logout() {
      localStorage.removeItem("_auth");
      this.$router.push("/");
      location.reload();
    }
  },
  created() {
    this.getLocalProducts();

    const loggedUser = getLoggedInUser();

    this.ADD_LOGGED_USER(loggedUser);

    console.log(process.env.NODE_ENV);
    console.log(process.env.VUE_APP_BASE_URL);
  }
};
</script>


<style lang="scss">
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding:10px;
}
#nav {
  padding: 15px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

html {
  position: relative;
  min-height: 100%;
}
body {
  margin-bottom: 60px; /* Margin bottom by footer height */
}
.footer {
  position: relative;
  bottom: 0;
  width: 100%;
  height: 60px; /* Set the fixed height of the footer here */
  background-color: #b4afaf;
}

footer {
  background-color: #b4afaf;
  padding: 25px;
}

.footer p,
.footer div {
  display: inline;
  vertical-align: top;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  line-height: 28px;
}
.footer p {
  font-weight: bold;
}

* a {
  color: #42b983;
}

* .fa {
  font-size: 18px;
}

.buttonGreen-outline {
  width: 100%;
  color: #41b883;
  background-color: transparent;
  border-color: #41b883;
}
.buttonGreen-outline:hover {
  color: #ffffff;
  background-color: #41b883;
  border-color: #41b883;
}

.buttonGreen {
  color: #fff;
  background-color: #41b883;
}

.buttonGreen:hover {
  background-color: #42a97b;
}
.vendre{
  font-size:20px;
  font-weight: 700;
  display: flex;
  
}
</style>
