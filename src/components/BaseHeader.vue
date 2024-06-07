<template>
  <div class="container">
    <header>
      <router-link to="/" class="logo"></router-link>
      <div id="menu">
        <router-link to="/search?category=3">Монографии</router-link>
        <router-link to="/search?category=4">Исторические документы</router-link>
        <router-link to="/search?category=1">Периодика</router-link>
        <router-link to="/search?category=2">Диссертации</router-link>
        <router-link to="/search?category=0">Учебные пособия</router-link>
      </div>
      <router-link to="/search" class="search"></router-link>
    </header>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseHeader'
});
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 24px 0;
}
#menu {
  display: flex;
  gap: var(--menuGap);
  align-items: center;
  height: 78px;
  border: 1px solid var(--gray-color-3);
  border-radius: 20px;
  padding: 24px;
  line-height: 1;

  a {
    position: relative;

    &:before {
      content: ' ';
      display: block;
      width: 1px;
      height: 30px;
      background: var(--gray-color-3);
      position: absolute;
      left: calc(var(--menuGap) / -2);
      top: -2px;
    }

    &:first-child {
      &:before {
        display: none;
      }
    }
  }
}
.logo {
  width: 72px;
  height: 72px;
  display: block;
  background: url("@/assets/images/logo.svg") no-repeat center;
  background-size: contain;
}
.search {
  width: 75px;
  height: 78px;
  background: url("@/assets/images/search.svg") no-repeat center;
  background-size: 24px;
  border: 1px solid var(--gray-color-3);
  border-radius: 20px;
}
</style>
