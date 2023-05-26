<script setup>
import createClient from "../clients.js";
import { reactive } from "vue";
import Reader from '../components/Reader.vue';
import { Icon } from '@iconify/vue';

const date = new Date();

const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();

const fecha = [day,month, year].join('-');``

const data = reactive({
  decodedText: '',
  products: [],
  cart: [],
  totalPriceSum: 0,
  isToggleTotal: false
});

function manualPrice(precio, descripcion){
  this.precio = precio,
  this.stock = 1,
  this.cantidad = 1,
  this.descripcion = descripcion,
  this.isEditing = false
}

/* DATA */
function fetchData(){
  createClient.fetch(`*[_type == 'products']`).then(
    (res) => {
      data.products = res},
    (error) => {
      data.error = error;
    }
  );
};


function addQr(qr){
  data.decodedText = qr;
}

function addItemToCart(product){
  /*Si ya existe, busca index y addItem(i) */
  if(data.cart.find(element => element.codigo == product.codigo)){
    let i = data.cart.findIndex(element => element.codigo == product.codigo);
    addItem(i);
    data.decodedText = '';
    return
  } 
  
  /*Checkea input qr */
  else if(data.decodedText != ''){
    data.cart.push(product);
    data.totalPriceSum += product.precio; 
    data.decodedText = '';
  }
  
}

function addItemManualToCart(){
  let form = document.querySelector('#form');
  let precio = document.querySelector("#precio").value;
  let descripcion = document.querySelector("#categoria").value;
  /*Checkea input manual */
  if(data.decodedText == '' && precio != 0 && descripcion != '' ){
    let product = new manualPrice(precio, descripcion)
    data.cart.push(product);
    data.totalPriceSum += parseInt(precio);

    form.reset()
  }
}

function toggleItemEdit(i){
  if(data.cart[i].isEditing == false){
    for(const item of data.cart){item.isEditing = false}
    data.cart[i].isEditing = true
  }else{
    data.cart[i].isEditing = false
  }
}

function deleteItem(item, i){
  data.totalPriceSum -= (item.precio * item.cantidad);
  data.cart.splice(i, 1);
}

function addItem(i){
  data.cart[i].cantidad++;
  data.totalPriceSum += parseInt(data.cart[i].precio) ;
}
function resItem(item, i){
  if(data.cart[i].cantidad == 1){
    deleteItem(item, i);
  }
  else{
    data.cart[i].cantidad--;
    data.totalPriceSum -= parseInt(data.cart[i].precio) ;
  }
}

function toggleTotal(){
data.isToggleTotal = !data.isToggleTotal;
}


//fetchData();
/*
const date = new Date();

const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();

const fecha = [day,month, year].join('-');
console.log(withHyphens); // 👉️ "2023-1-4"

*/
function cobrar(){
  
}
</script>

<template>
  <Reader @qr="addQr"/>
  
  <div class="contenedor-principal">
    <input class="input-manual" v-model="data.decodedText" type="text" placeholder="Ingresar manualmente">
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
        <form class="flex-row" id="form"  @submit.prevent>

          <div class="flex">
            <h4>Categoria</h4>
            <select class="input" id="categoria" name="categoria">
              <option value="Fiambre">Fiambre</option>
              <option value="Promo">Promo</option>
              <option value="Suelto">Sueltos</option>
              <option value="Otros">Otros</option>
            </select> 
          </div>

          <div class="flex">
            <h4>Precio</h4>
            <input class="input" type="number" id="precio" name="precio"/>
          </div>
          
        </form>
        <button @click="addItemManualToCart()"><Icon class="icon" icon="bx:cart-add" /></button>
      </div>
    </div>

      <div class="cart">
        <div class="item-cart clear"></div>
        <div class="item-cart-container" v-for="(item,i) in data.cart">
          <div v-if="item.isEditing" class="item-cart-btns">
            <button @click="resItem(item, i)"><Icon class="icon" icon="ph:minus-bold" /></button>
            <button @click="addItem(i)"><Icon class="icon" icon="mingcute:add-fill" /></button>
            <button @click="deleteItem(item,i)"><Icon class="icon red" icon="maki:cross" /></button>
          </div>
          <div class="item-cart"  @click="toggleItemEdit(i)">
            <h4 >{{ item.descripcion }} </h4>
            <h2>X {{ item.cantidad }}</h2>
            
            <h2 >${{ item.precio * item.cantidad }}</h2>
          </div> 
        </div>
        
      </div>

  
    <div class="total-container" :class="{ toggle: data.isToggleTotal }">
      <div class="total-num">
        <h2>Total:</h2>
        <Icon class="total-icon" icon="ep:arrow-up-bold" @click="toggleTotal"  :class="{ flipped: data.isToggleTotal }" />
        <h2>${{ data.totalPriceSum }}</h2>
      </div>

      <div class="total-toggle-true">
        <select class="input" id="medioDePago" name="medioDePago">
          <option value="Efectivo">Efectivo</option>
          <option value="Transferencia">Transferencia</option>
        </select> 
        <button @click="cobrar"><Icon class="icon" icon="mingcute:check-fill" /></button>
      </div>
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
  align-items: center;
  height: auto;
  margin-bottom: 5svh;
  min-height: 52svh;
  background:linear-gradient(var(--color-b3), var(--color-b1)); 
}
.preview-producto{
  background:var(--color-b5);
  border-radius: 30px;
  height: 12svh;
  width: calc(100svw - 10px);
  margin: 5px 5px;
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
  justify-content: center;
  width: 100%;
}
.flex-row{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

button{
  appearance: none;
  background: none;
  border: none;
}

.input{
  border: 0;
  background: var(--color-b3);
  box-shadow: inset 0 0 3px var(--color-b1);
  color: var(--color-b5);
  padding: 5px;
  border-radius: 15px;
  height: 5svh;
  width: 90%;
}

.input-manual{
  border: 0;
  background: var(--color-b5);
  box-shadow: inset 0 0 3px var(--color-b1);
  color: var(--color-b1);
  margin-top: 5px;
  padding: 5px;
  border-radius: 15px;
  height: 5svh;
  text-align: center;
  width: 40%;
}


.flex>h2,h4,.item-cart>h2,h4{
  margin: 0;
}


.icon{
  background:var(--color-b6);
  color: var(--color-b1);
  height: 7svh;
  width: 7svh;
  padding: 2px;
  border: 2px solid var(--color-b1);
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
  gap: 5px;
  flex-direction: column-reverse;
}

.item-cart{
  position: relative;
  display: grid;
  grid-template-columns:40svw 20svw 40svw;
  align-items: center;
  justify-items: center;
  height: 10svh;
  width: 100svw;
  padding: 0 10px;
  border-radius: 30px;
  color: var(--color-b5);
  border: 2px solid var(--color-b5);
  background: linear-gradient(var(--color-b3), var(--color-b2));
  animation: add-item 300ms ease-in-out forwards;
  z-index: 5;
}

.item-cart-container{
  position: relative;
}

.clear{
  border: 0;
  background: transparent;
}


.item-cart-btns{
  position: absolute;
  top: 1px;
  left: 1px;
  display: flex;
  border-radius: 30px 0 0 30px;
  background: rgba(209, 209, 209, 0.3);
  backdrop-filter: blur(5px);
  animation: fade-in 500ms ease-in-out forwards;
  z-index: 100;
}

.total-container{
  position: fixed;
  bottom: 0;
  height: 15svh;
  width: 100svw;
  background: linear-gradient(var(--color-b5), var(--color-b3));
  box-shadow: 0 0 5px var(--color-b3);
  border-radius: 30px 30px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
}

.total-num{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:10px 25px;
  width: 100svw;
}
.total-num>h2{
  margin: 0;
}
.total-icon{
  position: absolute;
  top: 10px;
  left: calc(50svw - .75rem);
  font-size: 1.5rem;
}

.flipped{
  rotate: 180deg;
}
.toggle{
  height: 30svh;

}

.total-toggle-true{
  width: 100svw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
  gap: 25px;
}

</style>