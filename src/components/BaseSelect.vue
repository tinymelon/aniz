<template>
  <div class="select-wrapper">
    <select class="base-input" v-model="selected" @change="handleChange">
      <option v-for="(option, index) in options" :key="index" :value="option.value || index" >{{ option.title }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'BaseSelect',
  props: {
    options: {
      type: Array,
      required: true,
    },
    value: Number
  },
  emits: ['change'],
  setup(props, { emit }) {
    const selected = ref(props.value);

    watch(() => props.value, (newValue) => {
      selected.value = newValue;
    });

    const handleChange = (event: Event) => {
      emit('change', event);
    };

    return {
      selected,
      handleChange
    };
  }
});
</script>
