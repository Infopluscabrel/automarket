<template>
    <div class="productForm">
        <form id="productCU" @submit="actionProduct" v-if="!loading">
                <span v-if="errors.length">
                  <b>Please correct the following error(s):</b>
                  <ul>
                    <li v-for="error in errors" :key="error">{{ error }}</li>
                  </ul>
                </span>

              <div class="form-group">
                <label for="productName">Nom du produit</label>
                <input type="text" class="form-control" id="productName" v-model="product.productName" name="productName" aria-describedby="emailHelp" placeholder="Enter Product Name">
               
              </div>
              <div class="form-group">
                <label for="productName">Prix Hors taxe du produit</label>
                <input type="text" class="form-control" id="productName" v-model="product.productPriceHT" name="productName" aria-describedby="emailHelp" placeholder="Enter Product Name">
              
              </div>
              <div class="form-group">
                <label for="productName">Prix du produit</label>
                <input type="text" class="form-control" id="productName" v-model="product.productPrice" name="productName" aria-describedby="emailHelp" placeholder="Enter Product Name">
              
              </div>
              <div class="form-group">
                <label for="productName">Description du produit</label>
                <textarea class="form-control" id="productName" v-model="product.productDescription" name="productDescription" aria-describedby="emailHelp" placeholder="Enter Product Name"></textarea>
              
              </div>
              <div class="form-group">
                <label for="productCategory">Product Category</label>
                <select class="form-control"  v-if="product.productCategory !== 'Create New'" id="productCategory" name="productCategory" v-model="product.productCategory">
                    <option 
                      v-for="(category, index) in categories" :key="index" 
                      v-bind:value="category.productCategory" 
                      >{{category.productCategory}}
                    </option>
                </select>
                <input type="password" class="form-control" id="productCategroyDummy"  v-if="product.productCategory === 'Create New'" placeholder="Password" name="productCategroyDummy" v-model="product.productCategroyDummy">
              </div>
              <div class="form-group">
                <label for="productSeller">Le produit est deja vendu ? cocher pour dire oui
               
                <input type="checkbox" class="form-control" id="productSellerDummy"  placeholder="" name="productSellerDummy" v-model="product.isSold">
                    <label> prix vendu</label>
                      <input type="text" class="form-control" id="productSellerDummy"  placeholder="" name="productSellerDummy" v-model="product.finalSold">
                    
         </label>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label for="isBestProduct">Best Product</label>
                    <input type="checkbox" class="form-control" id="isBestProduct" name="isBestProduct" v-model="product.isBestProduct" placeholder="">
                  </div>
                </div>
                <div class="col">
                    <div class="form-group">
                      <label for="isTopProduct">Top Product</label>
                      <input type="checkbox" class="form-control" id="isTopProduct" name="isTopProduct" placeholder="Password" v-model="product.isTopProduct">
                    </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <label for="productRating">Product Rating</label>
                    <input type="password" class="form-control" id="productRating" placeholder="Password">
                  </div>
                </div>
              </div>
    
              <!-- <div class="form-group"> -->
                <label for="productImage">Product Image</label>
                <input type="text" class="form-control" id="productImage" v-model="product.productImage" placeholder="Product Image URL">
                <button type="submit" class="btn buttonGreen"> Save changes  </button> &nbsp
            <div class="dropup">
                        <button type="submit" class="btn buttonGreen"> gallery </button>

                          <div class="dropup-content">
                                  <!-- <div class="form-group"> -->
                                      
                                          <label for="productImage">Product Galerie d'Image 1 </label>
                                          <input type="text" class="form-control" id="ImageGalerie1" v-model="product.gallery1" placeholder="Product Image URL">
                                        
                                        <div class="form-group">
                                            <label for="productImage">Product Galerie d'Image 2</label>
                                            <input type="text" class="form-control" id="ImageGalerie2" v-model="product.gallery2" placeholder="Product Image URL">
                                        </div>
                                        <div class="form-group">
                                            <label for="productImage">Product Galerie d'Image 3 </label>
                                            <input type="text" class="form-control" id="ImageGalerie3" v-model="product.gallery3" placeholder="Product Image URL">
                                        </div>
                                        <div class="form-group">
                                              <label for="productImage">Product Galerie d'Image 4 </label>
                                              <input type="text" class="form-control" id="ImageGalerie4" v-model="product.gallery4" placeholder="Product Image URL">
                                        </div>
                                        <div class="form-group">
                                              <label for="productImage">Product Galerie d'Image 5 </label>
                                              <input type="text" class="form-control" id="ImageGalerie5" v-model="product.gallery5" placeholder="Product Image URL">
                                         </div>
                           </div>
              </div> 
     
              <br>
            
        </form>

        <div class="lds-dual-ring" v-if="loading"></div>
    </div>
</template>
<script>
import axios from "axios";
import {errorToaster} from "../../shared/service/ErrorHandler.js"
export default {
  name: "productForm",
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

      // sauvegarde du produit dans la base de donnée
//  axios.post(`${process.env.VUE_APP_BASE_URL}/products`, this.product)
//       .then(response => {
//                   this.edit_correct=true 
//     }).catch(e => {
//       console.log(e)
//     })
      this.$emit("submit-form", this.product);
    }
  },
  created() {
    this.loading = true;
    axios
      .get(`${process.env.VUE_APP_BASE_URL}/products`)
      .then(response => {
        // getting all products and getting the uniq value for
        // productCategory and returning the productCategory property only
        this.categories = _.uniqBy(
          _.map(response.data, function(object) {
            return _.pick(object, ["productCategory"]);
          }),
          "productCategory"
        );
        this.categories.push({ productCategory: "Create New" });

        // getting all products and getting the uniq value for
        // productSeller and returning the productSeller property only
        this.sellers = _.uniqBy(
          _.map(response.data, function(object) {
            return _.pick(object, ["productSeller"]);
          }),
          "productSeller"
        );

        this.sellers.push({ productSeller: "Create New" });

        this.loading = false;
      })
      .catch(error => {
        console.log(error);
        errorToaster("Error while fetching products", "");
      });
  }
};
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

.dropbtn {
  background-color: #3498DB;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
}

.dropup {
  position: relative;
  display: inline-block;
}

.dropup-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 200px;
  bottom: 30px;
  z-index: 1;
}

.dropup-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropup-content a:hover {background-color: #ccc}

.dropup:hover .dropup-content {
  display: block;
}

.dropup:hover .dropbtn {
  background-color: #2980B9;
}
</style>