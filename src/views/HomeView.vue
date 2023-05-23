<script setup>
import createClient from "../clients.js";
import { reactive } from "vue";
import Reader from '../components/Reader.vue';
import { Icon } from '@iconify/vue';

const data = reactive({
  decodedText: '7790360970053',
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
  "stock": 1
},
{
  "_createdAt": "2023-05-19T21:10:38Z",
  "_id": "42d4c9b3-fced-4d04-8191-0423e0fc2f3c",
  "_rev": "0nOOWeg8GTCkLY5ImLCD8o",
  "_type": "products",
  "_updatedAt": "2023-05-19T23:50:49Z",
  "categoria": "almacen",
  "codigo": "7792900093246",
  "descripcion": "Vinagre De Alcohol Dos Anclas 1 L",
  "precio": 350,
  "stock": 1
}
],
  cart: [],
  totalPriceSum: 0,
  isEditing: false,
});

const manualPrice = reactive({
  precio: 0,
  descripcion: ''
})

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

function addQr(qr){
  data.decodedText = qr;
}

function addItemToCart(product){

  if(manualPrice.precio == 0 && manualPrice.descripcion == '' && data.decodedText != ''){
    data.cart.push(product);
    data.totalPriceSum += product.precio; 
    data.decodedText = '';
  }
  else if(data.decodedText == '' && !manualPrice.precio == 0 && !manualPrice.descripcion == '' ){
    data.cart.push(manualPrice);
    data.totalPriceSum += manualPrice.precio;
  }
  
 
}

function toggleItemEdit(i){
  data.isEditing = !data.isEditing;
}

function deleteItem(item, i){
  data.totalPriceSum -= item.precio;
  data.cart.splice(i, 1);
}

function addItem(i){
  data.cart[i].stock++;
  console.log(data.cart[i].stock)
  data.totalPriceSum += data.cart[i].precio ;
}
function resItem(i){
  data.cart[i].stock--;
  data.totalPriceSum -= data.cart[i].precio ;
}
//fetchData();

</script>

<template>
  <Reader @qr="addQr"/>
  <input v-model="data.decodedText" type="text" placeholder="Ingresar manualmente"> <br>
  <div class="contenedor-principal">
    
    <div v-for="(product,i) in data.products">
      <div class="preview-producto" v-if="product.codigo == data.decodedText">
        <div class="flex">
          <h4>{{ product.descripcion }} </h4>
          <h2>${{ product.precio }}</h2> 
        </div>
        <button @click="addItemToCart(product,i)"><Icon class="icon" icon="bx:cart-add" /></button>
      </div>
    </div>
    <div v-show="data.decodedText == ''">
      <div class="preview-producto">
        <div class="flex-row">

          <div class="flex">
            <h4>Categoria</h4>
            <select class="input" v-model="manualPrice.descripcion" id="categoria" name="categoria">
              <option value="Fiambre">Fiambre</option>
              <option value="Promo">Promo</option>
              <option value="Suelto">Sueltos</option>
              <option value="Otros">Otros</option>
            </select> 
          </div>

          <div class="flex">
            <h4>Precio</h4>
            <input class="input" type="number" v-model="manualPrice.precio"/>
          </div>
          
        </div>
        <button @click="addItemToCart()"><Icon class="icon" icon="bx:cart-add" /></button>
      </div>
    </div>

      <div class="cart">
        <div class="item-cart clear"></div>
        <div class="item-cart" v-for="(item,i) in data.cart">
          <h4 @click="toggleItemEdit(i)">{{ item.descripcion }} </h4>

          <div v-if="data.isEditing" class="item-cart-btns">
            <button @click="resItem(i)"><Icon class="icon" icon="ph:minus-bold" /></button>
            <button @click="addItem(i)"><Icon class="icon" icon="mingcute:add-fill" /></button>
            <button @click="deleteItem(item,i)"><Icon class="icon red" icon="maki:cross" /></button>
          </div>
          <h2>X {{ item.stock }}</h2>
          <h2 @click="toggleItemEdit(i)">${{ item.precio * item.stock }}</h2> 
        </div>
        
      </div>

  
    <div class="total">
      <h2>Total:</h2>
      <h2>${{ data.totalPriceSum }}</h2>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from{opacity: 0;  transform: translateX(-100%);}
  to{opacity: 1; transform: translateX(0);}
}
@keyframes add-item {
  from{opacity: 0; height: 0;}
  to{opacity: 1; height: 8svh;}
}
.contenedor-principal{
  display: flex;
  flex-direction: column;
  height: auto;
  margin-bottom: 5svh;
  min-height: 52svh;
  background: var(--color-1);
}
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
.flex-row{
  display: flex;
  flex-direction: row;
}

button{
  appearance: none;
  background: none;
  border: none;
}

.input{
  border: 3px solid var(--color-1);
  background: var(--color-3);
  padding: 5px;
  border-radius: 15px;
  height: 5svh;
  width: 100%;
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

.red{
  background: rgb(165, 0, 0);
}

.icon:hover{
  scale: 1.05
}
.icon:active{
  scale: 0.9;
}
.cart{
  display: flex;
  flex-direction: column-reverse;
}

.item-cart{
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 8svh;
  padding: 15px;
  color: var(--color-3);
  border: 2px solid var(--color-2);
  background: var(--color-1);
  animation: add-item 300ms ease-in-out forwards;
  z-index: 5;
}
.clear{
  border: 0;
}

.item-cart>h2,.total>h2{
  width: 30svw;
}

.item-cart-btns{
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  background: rgba(209, 209, 209, 0.3);
  backdrop-filter: blur(5px);
  animation: fade-in 500ms ease-in-out forwards;
  z-index: 10;
}

.total{
  position: fixed;
  bottom: 7.9svh;
  height: 5svh;
  width: 100svw;
  padding: 15px;
  background: var(--color-2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
}

</style>