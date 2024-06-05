<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/search">Search</router-link>
      <router-link :to="{ name: 'Entity', params: { someTitle: 'example-title' }}">Entity</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style>
/* Стили для навигации */
nav {
  display: flex;
  gap: 10px;
}

router-link {
  text-decoration: none;
  color: blue;
}

</style>
