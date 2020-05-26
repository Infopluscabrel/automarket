<template>
  <div class="productFilter">
    <div  id="prdfilter">
      <h4 class="d-flex mb-3">
        <span class="text-muted">Filtrer votre recherhe:</span>
      </h4>
      <div class="form-group createProduct" v-if="loggedUser && loggedUser.isAdmin">
        <button class="btn buttonGreen-outline" @click="openCreateModal">Create New Product</button>
      </div>

                <div class="input-group mb-4">
                <input type="text" class="form-control"   @change="(event) => updateProductCategory(event,name)"  
                 placeholder="par la marque ou la série de la voiture" name="search" v-model="name" id="search">
   
                <div class="input-group-btn">
                  <button class="btn btn-default" type="submit"><i class="fa fa-search"  ></i></button>
                </div>
              </div>

              <div class="input-group">
                <input type="text" class="form-control" placeholder="par le prix,entrez votre budget" name="search"  @change="(event) => updateProductCategoryprice(event,prix)"  v-model="prix">
                <div class="input-group-btn">
                  <button class="btn btn-default" type="submit"><i class="fa fa-search"  ></i></button>
                </div>
              </div>
              <div class="vendre mt-4 mb-2">
                <span class="text">
                  Besoin d'aide ? Ou 
                 votre voiture est à vendre ? contactez nous au 697476283 
                 </span>
                 <span class="text">
                 Ou écrivez nous sur <i class="fa fa-telegram" aria-hidden="true"></i> Telegram ou
                  <i class="fa fa-whatsapp" aria-hidden="true"></i> Whatsapp
                 </span>
              </div>
      <!-- <ul class="list-group">
        <li class="list-group-item">Toutes les categories</li>
        <li class="list-group-item">Voitures De Luxe </li>
        <li class="list-group-item">Voiture Moins couteux</li>
        <li class="list-group-item">Voiture Personnels </li>
        <li class="list-group-item"> Véhicules de bonnes affaires </li>
        
      </ul> -->
    </div>
    <create-product ref="createProduct"/>
  </div>
</template>

<script>
import CreateProduct from "../actions/CreateProduct";
import { mapState } from "vuex";
export default {
  name: "productFilter",
  props: ["categories", "sellers"],
  components: { CreateProduct },
  computed: mapState(["loggedUser"]),
  data() {
    return {
      name: "",
      selectedCategory: "All",
      selectedSeller: "All",
      showCreateProductModal: false,
      
      prix:""
    };
  },
  methods: {
    // This method will trigger the parent Components (Prodcuts Component) function
    updateProductCategory(event,name) {
         
      this.$parent.filterProductBy(event, this.name);
       
    },
    updateProductCategoryprice(event,name) {
         
      this.$parent.filterProductByPrice(event, name);
       
    },

    // This method will trigger the function in createProduct Component
    openCreateModal() {
      this.$refs.createProduct.showModalForm();
    }
  }
};
</script>

<style lang="scss">
.productFilter {
  #prdfilter {
    text-align: start !important;
    //  position: relative !important

  
  }
 
}
.vendre{
  font-size:20px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
}
</style>