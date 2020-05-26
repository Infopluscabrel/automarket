<template>
    <div class="products">
           <div class="row">
              <!-- | filterBy search in 'name' -->
                      <div class="col-md-4" 
                      v-for="(item, index) in products_list " 
                      :key="index"  >
                        <card-template :item="item" />
                      </div>
            
           </div>
           <edit-product ref="editProduct" />
    </div>
</template>


<script>
import axios from "axios";
import CardTemplate from "../shared/CardTemplate";
import EditProduct from "./actions/EditProduct"
export default {
  name: "productslist",
  props: ["products_list"],
  components: { CardTemplate, EditProduct },
  data() {
    return {
      product:[],
      selectedProduct: Object, 
      name: "",
      search:""
    };
  },
  methods: {
    //manadatory function called from cardTemplate while onClick 'edit'
    editProduct(product){
      // this.will pass the product to the editProduct to bind with Product Object
      
      this.$refs.editProduct.setProduct(product);
    }
  },
  mounted() {
    
  }
};
</script>

<style>
.footerIcons {
  font-size: 95%;
}


.card-text {
  height: 60px;
  overflow: hidden;

}
</style>
