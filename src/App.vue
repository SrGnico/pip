<script setup>
import { Icon } from '@iconify/vue';

</script>
<template>
    <router-view/>
  <nav>
    <router-link to="/"><Icon class="icon" icon="bxs:file" /></router-link>
    <router-link to="/"><Icon class="icon" icon="mdi:tag-edit" /></router-link>
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
  background: var(--color-1);
  background: var(--color-1);
}

nav {
  background:linear-gradient(var(--color-b3), var(--color-b1));
  box-shadow: 0 0 10px var(--color-b3);
  border-radius: 30px 30px 0 0;
  position: fixed;
  bottom: 0;
  width: 100svw;
  height: 8svh;
  padding: 15px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 100;
}

nav a {
  color: var(--color-b4);
}
.icon{
  font-size: 2rem;
}
nav a.router-link-exact-active {
  height: 45px;
  width: 45px;
  text-align: center;
  background: var(--color-b5);
  border-radius: 500px;
  padding: 6px;
  color: var(--color-b2);
}
</style>
