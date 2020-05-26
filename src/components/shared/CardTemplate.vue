<template>
  <div class="cardTemplate">
    <form>
    <div class="card mb-2 shadow-sm"  >
      <img v-on:click="navigateProductDetail(item)"
        class="card-img-top "
        v-bind:src="item.productImage"
        alt="Card image cap"
        style="max-height: 180px; max-width: 300px;margin: auto"
      />
      <div class="card-body" >
        <strong class="card-text" v-on:click="navigateProductDetail(item)" > {{item.productName}} </strong>
        <div class="card-text" v-on:click="navigateProductDetail(item)">
                       <div class="description">  {{item.productDescription}}
                         </div>
           </div>
        <strong class="card-text mt-2" v-on:click="navigateProductDetail(item)"
         >{{item.productPrice}} Fcfa</strong>
        <div class="d-flex justify-content-between align-items-center">
          <div class="form-group">
                              <div class="btn-group">
                              
                                
                                <button
                                  type="button"
                                  class="btn btn-sm btn-outline-secondary"
                                  v-on:click="updateEditProduct(item, item._id)"
                                  v-if="loggedUser && loggedUser.isAdmin"
                                >Editer</button>
                              
                                <button
                                  type="button"
                                  class="btn btn-sm btn-outline-secondary"
                                  v-on:click="DeleteProduct(item._id)"
                                  v-if="loggedUser && loggedUser.isAdmin"
                                >Supprimer</button>
                              </div>
                              
                              <!-- <div class="form-group"> -->
                              <div class="input-group-prepend mt-2"> 
                                <router-link to="/checkout1" >
                                <div class="input-group mb-2" v-on:click="addCheck(item)">
                                    <button
                                  type="button"
                                  class="btn btn-success"
                                  
                                
                                > Proceder a l'achat
                                <!-- <a href="javascript:;;" class="p-2" v-on:click="addToCart(item)"> -->
                                  <i class="fa fa-shopping-cart"></i>
                                <!-- </a> -->
                                </button>
                                </div>
                                </router-link>
                                  
                              </div>

                                            <div class="input-group-prepend "> 
                                                <div class="input-group mb-3 mt-2">
                                                                    <div>
                                                                          <button
                                                                            type="button"
                                                                            class="btn btn-sm btn-outline-secondary"
                                                                            v-on:click="navigateProductDetail(item)"
                                                                          >Voire les détails</button>
                                                                  
                                                                      </div>               
                                                                        <div class="input-group-prepend "> 
                                                                                      
                                                                                              <button
                                                                                                type="button"
                                                                                                class="btn btn-sm btn-outline-secondary"
                                                                                                v-on:click="addToCart(item)"
                                                                                              
                                                                                              > Ajouter au panier
                                                                                              <!-- <a href="javascript:;;" class="p-2" v-on:click="addToCart(item)"> -->
                                                                                                <i class="fa fa-shopping-cart"></i>
                                                                                              <!-- </a> -->
                                                                                              </button>
                                                                                    
                                                                            </div>
                                                     </div>
                                                </div>
             </div>
           
 

         
          </div>
       </div>
    </div>
    
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions, mapMutations } from "vuex";
import { infoToaster, successToaster } from "./service/ErrorHandler";

import _ from "lodash";
export default {
  name: "cardTemplate",
  props: ["item"],
  data() {
    return {
      showModal: false
    };
  },
  components: {},
  computed: mapState(["loggedUser"]),
  methods: {
    navigateProductDetail(product) {
      this.$router.push({
        name: "productDetails",
        params: { id: product._id }
      });
    },
    addCheck(item){
       localStorage.setItem("unique_product", JSON.stringify(item._id));
    },

    ...mapMutations(["ADD_CART_LOCAL"]),

    addToCart(product) {
      const data = _.find(this.$store.getters.cartProducts, product);
      if (data) {
        infoToaster("Already Added", "Product Already Added");
      } else {
        successToaster("Added Successfully", "Product Added Successfully");
        this.ADD_CART_LOCAL(product);
      }
    },

    // this will trigger the parentComponent function
    updateEditProduct(product, id) {
      this.$parent.editProduct(product);
    },
    DeleteProduct(id) {
      console.log(`${process.env.VUE_APP_BASE_URL}/products/${id}`)
        axios.delete(`${process.env.VUE_APP_BASE_URL}/products/${id}`)
      .then(response => {
                  this.edit_correct=true 
    }).catch(e => {
      console.log(e)
    })
    }
  },
  mounted() {}
};
</script>
<style lang="scss">
 .description {
    height: 100px;
    overflow-y: auto;
 }
</style>