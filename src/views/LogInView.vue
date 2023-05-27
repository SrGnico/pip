<script setup>
import router from "@/router";
import defineEmits from 'vue';

const emit = defineEmits(['login'])


const user = "Dani"
const psw = "Salome74"

function logear(){
const userInput = document.querySelector('#user').value;
const pswInput = document.querySelector('#contra').value;

    if (userInput === user && pswInput === psw) {
        router.push({name: "home"});
    }
}
</script>

<template>
    <div class="contenedor-principal">
        <form prevent>
            <input type="text" id="user" placeholder="Usuario"> 
            <input type="password" id="contra"  placeholder="Contraseña">
            <button @click.prevent="logear">Logear</button>
        </form>
    </div>
</template>

<style scoped>
.contenedor-principal{
    position: fixed;
    top: 0;
    height: 100svh;
    width: 100svw;
    background: linear-gradient(var(--color-b1), var(--color-b3));
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 150;
}

form{
    background: linear-gradient(var(--color-b3), var(--color-b1));
    border-radius: 15px;
    height: 20svh;
    margin: 15px;
    width: 90svw;
    display: flex;
    flex-direction: column;
    padding: 15px;
    gap: 5px;
}

input,button{
    height: 5svh;
}
</style>