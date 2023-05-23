<script setup>
import createClient from "../clients.js";
import { reactive } from "vue";
import Reader from '../components/Reader.vue';

const product = reactive({
  _type: 'products',
  descripcion: '',
  codigo: '',
  categoria: '',
  precio: 0,
  stock: 1,
  isEditing: false
});

const data = reactive({
  createdSucessfull: false,
  error: false
})

function crearProducto(){
  data.createdSucessfull = false;
  data.error = false;
  if(product.descripcion != '' &&
     product.codigo != '' &&
     product.categoria != '' &&
     product.precio != '' &&
     product.stock != ''){

      createClient.create(product).then((res) => {
        console.log('Producto creado con exito, id es:'+ res._id)
      });
      data.createdSucessfull = true;
      product.descripcion = '';
      product.codigo = '';
      product.categoria = '';
      product.precio = '';
      product.stock = '';
      return;
  }
  data.error = true;
}

function addQr(qr){
  product.codigo = qr;
}

function cerrar(){
  data.createdSucessfull = false;
  data.error = false;
}
</script>

<template>
  <Reader @qr="addQr"/>
  <div class="principal-container">
    <h1 class="titulo">Agregar Producto:</h1>
    <p class="label"> Descripcion:</p>
    <input v-model="product.descripcion" type="text" placeholder="Descripcion" name="descripcion" id="descripcion"> 
    <p class="label">Codigo Manual o Escanear: </p> 
    <input v-model="product.codigo" type="text" placeholder="Codigo" name="codigo" id="codigo">
    <p class="label">Categoria:</p> 
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
    </select> 
   
    <div class="number-container">
      <div class="flex-column">
        <p class="label">Precio: (formato: 1350.50)</p> 
        <input v-model="product.precio" type="number" placeholder="Precio" name="precio" id="precio">
      </div>
    </div>
    <button class="btn-crear" @click="crearProducto">Crear</button>

    <div v-if="data.createdSucessfull || data.error" class="feedback" @click="cerrar">
      <h1 v-if="data.createdSucessfull">Producto agregado con exito!</h1>
      <h1 v-if="data.error">Faltan campos por agregar!</h1>
    </div>
  </div>
</template>

<style scoped>
.principal-container{
  position: relative;
  height: 52svh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  background: var(--color-2);
  color: var(--color-1);
}

.titulo{
  margin: 5px auto;
}

.label{
  text-align: left;
  margin: 2px;
  width: 100%;
}

input, select, button{
  border: 3px solid var(--color-1);
  background: var(--color-3);
  padding: 5px;
  border-radius: 15px;
  height: 5svh;
  width: 100%;
}

.number-container{
  display: flex;
  gap: 7px;
}

.flex-column{
  flex: 1;
  display: flex;
  flex-direction: column;
}

.btn-crear{
  background: var(--color-4);
  color: var(--color-3);
  margin: 10px auto;
  border: 0;
  height: 8svh;
  font-size: 1.5rem;
  font-weight: bold;
  z-index: 25;
}

.feedback{
  position: absolute;
  top: 0;
  left: 0;
  height: 52svh;
  width: 100svw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(209, 209, 209, 0.3);
  backdrop-filter: blur(5px);
}


</style>
