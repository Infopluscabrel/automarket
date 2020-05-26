<template>
    <div class="createProduct">
        <modal :header="'Create Product'" :isShow="showModal" v-if="showModal" @close="showModal = false">
            <ProductForm :product="product" v-on:submit-form="productAction">
            </ProductForm>
            <div v-if="ajout_correct" >
              <span class="message">Produit ajouter avec succès </span>
            </div>
       </modal>
    </div>
</template>
<script>
import axios from "axios";
import Modal from "../../shared/Modal.vue";
import ProductForm from "./ProductForm";
export default {
  name: "createProduct",
  components: { Modal, ProductForm },
  data() {
    return {
      product: new Object(),
      showModal: false,
      ajout_correct: false
    };
  },
  methods: {
    showModalForm: function() {
      this.showModal = true;
    },

    productAction: function(product) {
      console.log("Creating new Product", product);
      // Sauvegarde du nouveau produit dans la base de donnée
      axios.post(`${process.env.VUE_APP_BASE_URL}/products`, this.product)
      .then(response => {
                  this.ajout_correct=true 
    }).catch(e => {
      console.log(e)
    })
  }
}
}
</script>
<style lang="scss">
</style>