<template>
  <span class="base-button" v-if="url"><router-link :to="url"><slot></slot></router-link></span>
  <button v-else class="base-button"><slot></slot></button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseButton',
  props: {
    url: String
  }
});
</script>
