<template>
  <div class="cart-products">
    <div class="row mt-5">
      <div class="col-sm-8">
        <form id="productCU">
          <!-- <p v-if="errors.length">
                  <b>Please correct the following error(s):</b>
                  <ul>
                    <li v-for="error in errors" :key="error">{{ error }}</li>
                  </ul>
          </p>-->
          <div class="form-group">
            <label for="productName">Nom </label>
            <input
              type="text"
              class="form-control"
              v-model="shipping.nom"
              id="productName"
              name="productName"
              aria-describedby="emailHelp"
              placeholder="Enter Address"
            >
          </div>
          <div class="form-group">
            <label for="productCategory">Numéro téléphone</label>
            <input
              type="password"
              class="form-control"
              v-model="shipping.numero"
              id="productCategroyDummy"
              placeholder="Password"
              name="productCategroyDummy"
            >
          </div>
          <div class="form-group">
            <label for="productCategory"> Email </label>
            <input
              type="password"
              class="form-control"
              v-model="shipping.email"
              id="productCategroyDummy"
              placeholder="Password"
              name="productCategroyDummy"
            >
          </div>
           <div class="form-group">
            <label for="productCategory">Adresse </label>
            <input
              type="password"
              class="form-control"
              v-model="shipping.adresse"
              id="productCategroyDummy"
              placeholder="Password"
              name="productCategroyDummy"
            >
          </div>
          <div class="form-group">
            <label for="productSeller">Pays</label>
            <input
              type="password"
              class="form-control"
              v-model="shipping.pays"
              id="productSellerDummy"
              placeholder="Password"
              name="productSellerDummy"
            >
          </div>
          <div class="row">
            <div class="col">
              <div class="form-group">
                <label for="productRating">Boite postale </label>
                <input
                  type="password"
                  class="form-control"
                  v-model="shipping.bp"
                  id="productRating"
                  placeholder="Password"
                >
              </div>
            </div>
          </div>
          <small
            id="emailHelp"
            class="form-text text-muted"
          >Faites vos achats en toutes sécurité.
          </small>
          <h5> Nous vous contacterons via sms , ou par les réseaux sociaux
            
            Appelez nous ou écrivez nous au 697476283 </h5>
          <br>
        </form>
      </div>
      <div class="col-sm-4">
        <cart-calculator ref="cartCalculator"></cart-calculator>
        <ul class="list-group mb-3">
      
          <a
            href="javascript:;;"
            class="btn btn-success mt-2 text-white"
            @click="createShippingDetail"
          > Valider </a>
              <router-link to="/products" class="btn btn-primary mt-3 text-white">
           Retouner aux voitures</router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import CartCalculator from "./CartCalculator";
import axios from "axios";
import { errorToaster } from "../../shared/service/ErrorHandler.js";
export default {
  name: "Checkout1",
  components: { CartCalculator },
  data() {
    return {
      ajout_correct: false,
         shipping: {}
      
    };
  },
  methods: {
    createShippingDetail() {
      const IDproducts = JSON.parse(localStorage.getItem("iki-cart"));
  this.shipping.IDproduct=IDproducts
 
// sauvegarde de l'achat dans la bd 
        axios.post(`${process.env.VUE_APP_BASE_URL}/shipping`, this.shipping)
      .then(response => {
                  this.ajout_correct=true 
    }).catch(e => {
      console.log(e)
    })
    }
  }
};
</script>

<style lang="scss">
.cart-products {
  div {
    text-align: start;
  }
  #productCU {
    div {
      text-align: start;
    }
    button {
      text-align: center;
    }
  }
}
</style>
