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
    cajas: [{
  "_createdAt": "2023-05-26T20:23:51Z",
  "_id": "26-5-2023",
  "_rev": "sit3o92X2jS5ZjKSdi4sHf",
  "_type": "cajas",
  "_updatedAt": "2023-05-26T21:00:22Z",
  "cantidadDeVentas": 3,
  "efectivo": 1900,
  "fecha": "26-5-2023",
  "productosVendidos": 3,
  "total": 1900,
  "transferencia": 0
},{
  "_createdAt": "2023-05-26T20:23:51Z",
  "_id": "26-5-2023",
  "_rev": "sit3o92X2jS5ZjKSdi4sHf",
  "_type": "cajas",
  "_updatedAt": "2023-05-26T21:00:22Z",
  "cantidadDeVentas": 3,
  "efectivo": 1900,
  "fecha": "26-5-2023",
  "productosVendidos": 3,
  "total": 1900,
  "transferencia": 0
}]
});

//fetchData();
</script>

<template>
    <div class="principal-container">
        <div class="caja" v-for="caja in data.cajas">
            <h1>{{ caja.fecha}}</h1>
        </div>
    </div>
</template>


<style scoped>
.principal-container{
    height: 60svh;
    width: 100svw;
    background: linear-gradient(var(--color-b3),var(--color-b1));
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.caja{
    height: 8svh;
    width: 100svw;
    padding: 1svh;
    color: var(--color-b5);
    border: 3px solid var(--color-b5);
}

.caja>h1{
    margin: 0;
}
</style>