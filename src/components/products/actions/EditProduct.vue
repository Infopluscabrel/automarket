<template>
    <div class="edit-product">
       <modal :header="'Edit Product'" :isShow="showModal" v-if="showModal" @close="showModal = false">
            <ProductForm :product="product" v-on:submit-form="productAction"/>
        <div> 
           <span class="message">Produit Modifié avec succès </span>
        </div>
       </modal>
    </div>
</template>

<script>
import axios from 'axios'
import Modal from "../../shared/Modal";
import ProductForm from "./ProductForm";

export default {
  name: "editProduct",
  components: { Modal, ProductForm },
  data() {
    return {
      product: new Object(),
      showModal: false,
      edit_correct: false
    };
  },
  methods: {
    setProduct(product) {
      this.showModal = true;
      this.product = product;
    },

    productAction: function(product) {
  
      
      // Update the product to server
      
      
        axios.put(`${process.env.VUE_APP_BASE_URL}/products/${product._id}`,product)
      .then(response => {
                  this.edit_correct=true 
    }).catch(e => {
      console.log(e)
    })
    }
  }
};
</script>

<style>
</style>