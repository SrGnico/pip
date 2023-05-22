<script setup>
import { Icon } from '@iconify/vue';

</script>

<template>
    <router-view/>
  <nav>
    <router-link to="/"><Icon class="icon" icon="fluent:home-48-filled" /></router-link>
    <router-link to="/addProduct"><Icon class="icon" icon="mdi:tag-add" /></router-link>
  </nav>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  border: 3px solid black;

  position: fixed;
  bottom: 0;
  width: 100svw;
  height: 10svh;
  padding: 15px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

nav a {
  color: #2c3e50;
}
.icon{
  font-size: 2rem;
}
nav a.router-link-exact-active {
  color: #42b983;
}
</style>
