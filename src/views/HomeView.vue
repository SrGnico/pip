<script setup>
import createClient from "../clients.js";
import { reactive } from "vue";
import {Html5QrcodeScanner} from "html5-qrcode";

const data = reactive({
  decodedText: '',
  error: '',
  products: []
});

const params = {codigo: ''};


/* QR CODE */
function onScanSuccess(decodedText) {
  data.decodedText = decodedText;
};

function onScanFailure(error) {
};

let html5QrcodeScanner = new Html5QrcodeScanner(
  "reader",
  { fps: 10, qrbox: {width: 350, height: 250} },
  /* verbose= */ false);
html5QrcodeScanner.render(onScanSuccess, onScanFailure);


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

const query = `*[_type == 'products' && codigo == $codigo]`;

function checkear(){
  if(data.decodedText != ''){
    params.codigo = data.decodedText;

    fetchData();
  }
  data.error = "No se ha ingresado ningun codigo"
}


</script>

<template>
  <div id="reader" width="600px"></div>

  {{ data.decodedText }} <br>
  <input v-model="data.decodedText" type="text" placeholder="Ingresar manualmente"> <br>

  <button @click="checkear">Checkear</button>

  {{ data.products }}
  {{ data.error }}

  <div v-for="product in data.products">
    <div v-if="product.codigo == data.decodedText">
    Descripcion:  {{ product.descripcion }}
    Precio: $ {{ product.precio }}
    </div>
  </div>
  
  
</template>

<style>
</style>