<template>
    <div class="productForm">
        <form id="productCU" @submit="actionProduct" v-if="!loading">
                <p v-if="errors.length">
                  <b>Please correct the following error(s):</b>
                  <ul>
                    <li v-for="error in errors" :key="error">{{ error }}</li>
                  </ul>
                </p>

             
               <div class="form-group">
                <label for="productImage">Product Galerie d'Image</label>
                <input type="text" class="form-control" id="ImageGalerie1" v-model="product.gallery1" placeholder="Product Image URL">
              </div>
               <div class="form-group">
                <label for="productImage">Product Galerie d'Image</label>
                <input type="text" class="form-control" id="ImageGalerie2" v-model="product.gallery2" placeholder="Product Image URL">
              </div>
               <div class="form-group">
                <label for="productImage">Product Galerie d'Image</label>
                <input type="text" class="form-control" id="ImageGalerie3" v-model="product.gallery3" placeholder="Product Image URL">
              </div>
              <div class="form-group">
                <label for="productImage">Product Galerie d'Image</label>
                <input type="text" class="form-control" id="ImageGalerie4" v-model="product.gallery4" placeholder="Product Image URL">
              </div>
              <div class="form-group">
                <label for="productImage">Product Galerie d'Image</label>
                <input type="text" class="form-control" id="ImageGalerie5" v-model="product.gallery5" placeholder="Product Image URL">
              </div>
              <br>
              <button type="submit" class="btn buttonGreen">Save changes</button>
        </form>

        <div class="lds-dual-ring" v-if="loading"></div>
    </div>
</template>
<script>
import axios from "axios";
import {errorToaster} from "../../shared/service/ErrorHandler.js"
export default {
  name: "gallery",
  props: ["product"],
  data() {
    return {
      errors: [],
      productCategroyDummy: "",
      productSellerDummy: "",
      categories: [],
      sellers: [],
      loading: false
    };
  },
  methods: {
    actionProduct(event) {
      event.preventDefault();

      // sauvegarde des images dans la bd
  axios.post(`${process.env.VUE_APP_BASE_URL}/products/images`, {
  gallery1, gallery2, gallery3, gallery4, gallery5
})
//       .then(response => {
//                   this.edit_correct=true 
//     }).catch(e => {
//       console.log(e)
//     })
      this.$emit("submit-form", this.product);
    }
  },
 
  }

</script>
<style lang="scss">
.productForm {
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

.lds-dual-ring {
  display: inline-block;
  width: 64px;
  height: 64px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 46px;
  height: 46px;
  margin: 1px;
  border-radius: 50%;
  border: 5px solid #fff;
  border-color: #41b883 transparent #41b883 transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>