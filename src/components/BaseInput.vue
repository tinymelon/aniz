<template>
  <input class="base-input" :placeholder="placeholder" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseInput',
  props: {
    placeholder: String
  }
});
</script>

<style scoped>
.base-input {
  @apply border border-font-color p-2 text-base;
}
</style>
