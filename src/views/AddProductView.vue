<script setup>
import createClient from "../clients.js";
import { reactive } from "vue";
import {Html5QrcodeScanner} from "html5-qrcode";

/* QR CODE */
function onScanSuccess(decodedText) {
  product.codigo = decodedText;
};

function onScanFailure(error) {
};

let html5QrcodeScanner = new Html5QrcodeScanner(
  "reader",
  { fps: 10, qrbox: {width: 350, height: 250} },
  /* verbose= */ false);
html5QrcodeScanner.render(onScanSuccess, onScanFailure);


const product = reactive({
  _type: 'products',
  descripcion: '',
  codigo: '',
  categoria: '',
  precio: 0,
  stock: 0
});

function crearProducto(){
  if(product.descripcion != '' &&
     product.codigo != '' &&
     product.categoria != '' &&
     product.precio != '' &&
     product.stock != ''){

      createClient.create(product).then((res) => {
        console.log('Producto creado con exito, id es:'+ res._id)
      });

      product.descripcion = '';
      product.codigo = '';
      product.categoria = '';
      product.precio = '';
      product.stock = '';
    }
}
</script>

<template>
  <div class="about">
    <h1>Agregar Producto:</h1>
    Decripcion: <br>
    <input v-model="product.descripcion" type="text" placeholder="Descripcion" name="descripcion" id="descripcion"> <br>
    Codigo Manual o Escanear: <br>
    <input v-model="product.codigo" type="text" placeholder="Codigo" name="codigo" id="codigo"> <br>
    Categoria: <br>
    <select v-model="product.categoria" id="categoria" name="categoria">
      <option value="fiambre">Fiambre</option>
      <option value="almacen">Almacen</option>
      <option value="perfumeria">Perfumeria</option>
      <option value="limpieza">Limpieza</option>
      <option value="lacteos">Lacteos</option>
      <option value="panaderia">Panaderia</option>
      <option value="bebidas">Bebidas</option>
      <option value="promo">Promo</option>
      <option value="congelados">Congelados</option>
      <option value="suelto">Sueltos</option>
      <option value="otros">Otros</option>
    </select> <br>
    Precio: <br>
    <input v-model="product.precio" type="number" placeholder="Precio" name="precio" id="precio"> <br>
    Stock: <br>
    <input v-model="product.stock" type="number" placeholder="Stock" name="stock" id="stock"> <br>

    <button @click="crearProducto">Crear</button>
  </div>

    {{ product }}

  <div id="reader" width="600px"></div>
</template>
