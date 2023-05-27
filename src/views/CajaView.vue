<script setup>
import createClient from "../clients.js";
import { reactive } from "vue";

function fetchCajasData(){
  createClient.fetch(`*[_type == 'cajas']`).then(
    (res) => {
      data.cajas = res},
    (error) => {
      data.error = error;
    }
  );
};

function fetchProductsData(){
  createClient.fetch(`*[_type == 'products']`).then(
    (res) => {
      data.products = res},
    (error) => {
      data.error = error;
    }
  );
};

const data = reactive({
    toggle: false,
    cajas: [],
    products: [],
    search: ''
});

function editCaja(i){
    data.cajas[i].isEditing = !data.cajas[i].isEditing;
};
function toggle(x){
    data.toggle = x
}
fetchCajasData();
fetchProductsData();
</script>

<template>
    <div class="principal-container">

        <div class="divisor">
            <button @click="toggle(false)">Registro Diario</button>
            <!--<input type="text" placeholder="Buscar" v-model="data.search">-->
            <button @click="toggle(true)">Productos Registrados</button>
        </div>

     

        <div v-show="data.toggle" v-for="(product, i) in data.products">
            <div class="product" v-show="product.descripcion == data.search || data.search == ''">
                <h3>{{ product.descripcion}}</h3>
                <h4> ${{ product.precio }}</h4>
            </div>
        </div>

        <div v-show="!data.toggle" class="caja" :class="{'open' :  caja.isEditing}" v-for="(caja, i) in data.cajas" @click="editCaja(i)">
            <div class="div">
                <h1>{{ caja.fecha}}</h1>
                <ul v-if="caja.isEditing">
                    <li>Total: ${{ caja.total }}</li>
                    <li>Total Efectivo: ${{ caja.efectivo }}</li>
                    <li>Total Transferencia: ${{ caja.transferencia }}</li>
                    <li>Productos vendidos: {{ caja.productosVendidos }}</li>
                    <li>Cantidad de ventas: {{ caja.cantidadDeVentas }}</li>
                </ul>
            </div>
        </div>
        <div class="clear"></div>
    </div>
</template>


<style scoped>

@keyframes appear {
    from{opacity: 0;}
    to{opacity: 1;}
}
.principal-container{
    height: 60svh;
    width: 100svw;
    background: linear-gradient(var(--color-b3),var(--color-b1));
    display: flex;
    flex-direction: column;
    

    gap: 5px;
}

.divisor{
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 10px;
}

button, input{
    font-weight: bold;
    padding: 10px;
    width: 25svw;
    border-radius: 50px;
    border: 2px solid var(--color-b5);
    background: var(--color-b3);
    color: var(--color-b5);
}

button:active{
    scale: 0.95;
}
.caja{
    height: 10svh;
    width: 100svw;
    display: flex;
    flex-direction: column;
    color: var(--color-b5);
    border: 3px solid var(--color-b5);
}

.clear{
    height: 15svh;
    width: 100svw;
    border: 0;
}
.open{
    height: 30svh;
}
.caja>h1{
    margin: 1svh;
}

.div> ul{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    animation: appear 400ms ease forwards;
}

.product{
    height: 10svh;
    width: 100svw;
    display: flex;
    justify-content: space-between;
    color: var(--color-b5);
    border: 3px solid var(--color-b5);

    padding:0 15px;
}

.div{
    display: flex;
    flex-direction: column;
    padding: 0 0 svh 0;
}

</style>