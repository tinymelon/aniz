<template>
  <div>
    <h1>Search Detail Page</h1>
    <p>You searched for: {{ someTitle }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EntityPage',
  props: {
    someTitle: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/EntityPage.scss';
</style>
