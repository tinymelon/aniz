<template>
  <div>
    <h1>Home Page</h1>
    <BaseButton :href="href">Нажми сюда</BaseButton>
    <BaseInput v-model="inputValue" :placeholder="placeholderText" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    BaseButton,
    BaseInput,
  },
  setup() {
    const inputValue = ref('');

    const placeholderText = ref('Введите текст...');

    const href = ref('/search');

    return {
      inputValue,
      placeholderText,
      href
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/HomePage.scss';
</style>
