<script setup>
import createClient from "../clients.js";
import { reactive } from "vue";

function fetchData(){
  createClient.fetch(`*[_type == 'cajas']`).then(
    (res) => {
      data.cajas = res},
    (error) => {
      data.error = error;
    }
  );
};

const data = reactive({
    cajas: [],
});

function editCaja(i){
    data.cajas[i].isEditing = !data.cajas[i].isEditing;
};
fetchData();
</script>

<template>
    <div class="principal-container">
        <div class="caja" :class="{'open' :  caja.isEditing}" v-for="(caja, i) in data.cajas" @click="editCaja(i)">
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

.caja{
    height: 10svh;
    width: 100svw;
    display: flex;
    flex-direction: column;
    padding: 1svh;
    color: var(--color-b5);
    border: 3px solid var(--color-b5);
}

.open{
    height: 30svh;
}
.caja>h1{
    margin: 1svh;
}

.caja> ul{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    animation: appear 400ms ease forwards;
}

</style>