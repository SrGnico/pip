<script setup>
import createClient from "../clients.js";
import { reactive } from "vue";
import Reader from '../components/Reader.vue';
import { Icon } from '@iconify/vue';
import { parseQuery } from "vue-router";

const data = reactive({
  decodedText: '7790360970053',
  error: '',
  products: [
    {
  "_createdAt": "2023-05-19T23:55:35Z",
  "_id": "e57fa00f-5df5-4f74-9b23-521969182f59",
  "_rev": "0nOOWeg8GTCkLY5ImLDNYP",
  "_type": "products",
  "_updatedAt": "2023-05-19T23:55:35Z",
  "categoria": "almacen",
  "codigo": "7790360970053",
  "descripcion": "Salchichas Swift kids 6 u.",
  "precio": 260,
  "stock": 8
}
],
  cart: []
});



/* DATA */
function fetchData(){
  createClient.fetch(query).then(
    (res) => {
      data.products = res},
    (error) => {
      data.error = error;
    }
  );
};

const query = `*[_type == 'products']`;

function checkear(){
  if(data.decodedText != ''){

  }
  data.error = "No se ha ingresado ningun codigo"
}

function addQr(qr){
  data.decodedText = qr;
}

function addItemToCart(x){
  data.cart.push(x);
}

//fetchData();

</script>

<template>
  <Reader @qr="addQr"/>
  <input v-model="data.decodedText" type="text" placeholder="Ingresar manualmente"> <br>

  <div v-for="product in data.products">
    <div class="preview-producto" v-if="product.codigo == data.decodedText">
    <div class="flex">
      <h4>{{ product.descripcion }} </h4>
      <h2>${{ product.precio }}</h2> 
    </div>
    <button @click="addItemToCart(product)"><Icon class="icon" icon="bx:cart-add" /></button>
    </div>

    </div>
      <div class="cart">
        <div class="flex" v-for="item in data.cart">
          <h4>{{ item.descripcion }} </h4>
          <h2>${{ item.precio }}</h2> 
        </div>
    </div>

  
  
</template>

<style scoped>
.preview-producto{
  background: var(--color-2);
  height: 12svh;
  width: 100svw;
  padding: 15px;
  border: 2px solid var(--color-1);
  display: flex;
  justify-content: space-around;
}

.flex{
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  width: 100%;
}

button{
  appearance: none;
  background: none;
  border: none;
}


.flex>h2,h4{
  margin: 0;
}


.icon{
  background:var(--color-4);
  color: var(--color-3);
  height: 7svh;
  width: 7svh;
  padding: 2px;
  border: 2px solid var(--color-3);
  border-radius: 50px;
}

.icon:hover{
  scale: 1.05
}
.icon:active{
  scale: 0.9;
}
</style>