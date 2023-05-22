<script setup>
import createClient from "../clients.js";
import { reactive } from "vue";
import Reader from '../components/Reader.vue';

const data = reactive({
  decodedText: '',
  error: '',
  products: []
});

const params = {codigo: ''};

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
    fetchData();
  }
  data.error = "No se ha ingresado ningun codigo"
}

function addQr(qr){
  data.decodedText = qr;
}

</script>

<template>
  <Reader @qr="addQr"/>
  {{ data.decodedText }} <br>
  <input v-model="data.decodedText" type="text" placeholder="Ingresar manualmente"> <br>

  <button @click="checkear">Checkear</button>


  <div v-for="product in data.products">
    <div v-if="product.codigo == data.decodedText">
    Descripcion:  {{ product.descripcion }}
    Precio: $ {{ product.precio }}
    </div>
  </div>
  
  
</template>

<style scoped>
</style>