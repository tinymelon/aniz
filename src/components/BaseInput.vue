<template>
  <input class="base-input" :value="modelValue" @input="onInput" :placeholder="placeholder" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'BaseInput',
  props: {
    modelValue: {
      type: String as PropType<string>,
      required: true
    },
    placeholder: {
      type: String as PropType<string>,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const onInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      emit('update:modelValue', target.value);
    };

    return {
      onInput
    };
  }
});
</script>
