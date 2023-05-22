<script setup>
import createClient from "../clients.js";
import { reactive } from "vue";
import {Html5Qrcode} from "html5-qrcode";



const data = reactive({
  decodedText: '',
  error: '',
  products: []
});

const params = {codigo: ''};


/* QR CODE */ 
const html5QrCode = new Html5Qrcode("reader");
const qrCodeSuccessCallback = (decodedText) => {
    /* handle success */
    data.decodedText = decodedText;
   // stopQr();

};
const config = { 
  fps: 10,
  qrbox: { width: 300, height: 200},
};

html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback);


function stopQr(){
  html5QrCode.stop().then((ignore) => {
  // QR Code scanning is stopped.
}).catch((err) => {
  // Stop failed, handle it.
});
}


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
    params.codigo = data.decodedText;

    fetchData();
  }
  data.error = "No se ha ingresado ningun codigo"
}


</script>

<template>
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