<template>
  <a v-if="href" class="base-button" :href="href"><slot></slot></a>
  <button v-else class="base-button"><slot></slot></button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseButton',
  props: {
    href: String
  }
});
</script>

<style scoped>
.base-button {
  @apply bg-primary-color text-white border-none px-4 py-2 cursor-pointer text-base;
}
</style>
