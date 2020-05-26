<template>
  <div class="product-details">
    <div class="container">
      <div class="row mb-3">
        <div class="col-sm-4">
          <div class="product-image">
            <div class="view hm-zoom z-depth-2" style="cursor: pointer">
              <img
                v-bind:src="product.productImage"
                v-bind:alt="product.productName"
                class="img-fluid rounded"
                style="max-height: 350px; max-width:300px;margin: auto"
              >
            </div>
            <div class style="margin-top:15px">
              <ul class="list-group mb-3">
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 class="my-0">Prix : </h6>
                  </div>
                  <span
                    class="text-muted"
                    style="color:crimson !important"
                  >  {{product.productPrice}} Fcfa</span>
                </li>
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 class="my-0">Fournisseur </h6>
                  </div>
                  <span
                    class="text-muted"
                    style="color:crimson !important"
                  >{{product.productSeller}}</span>
                </li>
              </ul> <router-link to="/checkout1" >
               <button class="btn btn-primary" v-on:click="addCheck(item)" >Proceder a l'achat </button>
              </router-link> <br>
              <button class="btn btn-default mt-3 " v-on:click="addToCart(product)">Ajouter au panier </button>
            </div>
          </div>
        </div>
        <div class="col-sm-8">
          <div class="product-detail">
            <h5 class="product-head">Détails du produit</h5>
            <table class="table" cellspacing="0" style="max-height: 28px">
              <tbody>
                <tr>
                  <th scope="row">Nom du produit</th>
                  <td>{{product.productName}}</td>
                </tr>
                <tr>
                  <th scope="row">Description du produit</th>
                  <td>{{product.productDescription}}</td>
                </tr>
                <tr>
                  <th scope="row">Categorie du produit</th>
                  <td>{{product.productCategory}}</td>
                </tr>
                <tr>
                  <th scope="row">Appreciations</th>
                  <td>
                    <div class="stars-outer">
                      <div class="stars-inner"></div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
     
                         
                                      
                    </div>
          </div>
        </div>
      </div>

      <div class="container">
  <h2>Image Gallery</h2>
  
  <div class="row">


                                    <!-- <div
                                      v-for="i in [product.gallery1,product.gallery2,product.gallery3,product.gallery4,product.gallery5]"
                                      :key="i"
                                      class="row"
                                      @click="() => showImg(i)"
                                    > -->
                                            

                                                
                                                  <img 
                                                  v-for="i in [product.gallery1,product.gallery2,product.gallery3,product.gallery4,product.gallery5]"
                                      :key="i"
                                      
                                      @click="() => showImg(i)"
                                                  class="col-md-4 img-rounded"
                                                  v-bind:src="i"  
                                                   :id="'id'+`${i}`">
                                                  <!-- <img v-bind:src="product.gallery+i.`${i}`" :style="style" class="img-rounded" :id="id+"> -->
                                              
                                              
                                            
                                </div>



  
</div>

      <nav aria-label="breadcrumb ">
        <ol class="breadcrumb">
          <li class="breadcrumb-item active" aria-current="page">Produits similaires</li>
        </ol>
      </nav>
      <div class="row">
        <div class="col-md-3 mt-3" v-for="(item, index) in similarProduct" :key="index">
          <card-template :item="item"/>
        </div>
      </div>
    </div>

</template>

<script>
import axios from "axios";
import { mapState, mapActions, mapMutations } from "vuex";
import CardTemplate from "../shared/CardTemplate";

import { errorToaster } from "../../components/shared/service/ErrorHandler.js";

export default {
  name: "productDetail",
  
  components: { CardTemplate  },
  
  data() {
    return {
      product: new Object(),
      similarProduct: [],
      visible:false,
     imgs:[],
     style: "width:100%",
      index: 0
    };
  },
  methods: {
    getSimilarProduct(productSeller) {
      axios
        .get(`${process.env.VUE_APP_BASE_URL}/products/similarProduct`, {
          params: { productSeller: productSeller }
        })
        .then(response => {
          this.similarProduct = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
       addCheck(item){
       localStorage.setItem("unique_product", JSON.stringify(item._id));
    },
     showImg (index) {
       
      },
      handleHide () {
        this.visible = false
      }

      ,
      agrandir(i){
   id = 'id'+`${i}`
   document.getElementById(id).style=" width: 800px;height:800px"
 
      },

    // onClick(i) {
    //   this.index = i;
    // },
    ...mapMutations(["ADD_CART_LOCAL"]),
    addToCart(product) {
      this.ADD_CART_LOCAL(product);
    }
  },
 
  created() {
    
   this.imgs=[this.product.gallery1 ,this.product.gallery2,
     this.product.gallery3,this.product.gallery4,this.product.gallery5 ]
     
    axios
      .get(`${process.env.VUE_APP_BASE_URL}/products/${this.$route.params.id}`)
      .then(response => {
        this.product = response.data;
        const starTotal = 5;
        const starPercentage =
          (Number(this.product.productRating) / starTotal) * 100;
        // 3
        const starPercentageRounded = `${Math.round(starPercentage / 10) *
          10}%`;
        // 4
        document.querySelector(
          `.stars-inner`
        ).style.width = starPercentageRounded;

        // Getting Similar Product
        this.getSimilarProduct(this.product.productSeller);
      })
      .catch(error => {
        console.log(error);
        errorToaster("Error while fetching similar products", "");
      });
  }
  
};
</script>

<style>
.product-detail {
  text-align: start;
}

.product-detail .product-head {
  padding: 10px;
  font-weight: 500;
}

.product-detail .table th {
  width: 152px;
}

.product-ship {
  height: 15rem;
}

.stars-outer {
  display: inline-block;
  position: relative;
  font-family: FontAwesome;
}

.stars-outer::before {
  content: "\f006 \f006 \f006 \f006 \f006";
}

.stars-inner {
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  overflow: hidden;
  width: 0;
}

.stars-inner::before {
  content: "\f005 \f005 \f005 \f005 \f005";
  color: #f8ce0b;
}
.img-rounded{
  width: 100%;
  height: 100%;
  max-width: 800px;
  max-height: 300px;
}
</style>
