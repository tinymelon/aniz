<template>
  <div id="app">
    <BaseHeader />
    <router-view />
    <BaseFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseHeader from "@/components/BaseHeader.vue";
import BaseFooter from "@/components/BaseFooter.vue";

export default defineComponent({
  name: 'App',
  components: {BaseFooter, BaseHeader},
});
</script>

