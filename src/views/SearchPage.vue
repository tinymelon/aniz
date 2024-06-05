<template>
  <div>
    <h1>Search Page</h1>
    <BaseButton @click="handleClick">Click Me</BaseButton>
    <BaseInput v-model="inputValue" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';

export default defineComponent({
  name: 'SearchPage',
  components: {
    BaseButton,
    BaseInput,
  },
  setup() {
    const inputValue = ref('');

    const handleClick = () => {
      console.log('Button clicked!', inputValue.value);
    };

    return {
      inputValue,
      handleClick,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/SearchPage.scss';
</style>
