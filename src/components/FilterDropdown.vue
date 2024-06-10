<template>
  <div :class="['filter-wrapper', { 'active': isFilterOpened }, { 'big': filtersBig }]">
    <div class="filter-bg" @click="closePopup"></div>
    <div class="filter-select-button" @click="togglePopup">{{ title }}</div>
    <div class="filter-select-popup" v-if="isFilterOpened">
      <div class="filter-select-popup-info">
        <div class="filter-select-popup-title">{{ title }}</div>
        <div class="filter-select-popup-close base-button" @click="applyFilters">Применить</div>
      </div>
      <div class="filter-select-list">
        <label v-for="(option, index) in options" :key="index" :class="{ 'checked': isChecked(option.value) }">
          <span class="input-wrapper">
            <input type="checkbox" :name="filter" :value="option.value" :checked="isChecked(option.value)" @change="handleChange(option.value)">
          </span>
          <span>{{ option.title }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'MyFilterComponent',
  props: {
    title: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    filtersBig: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const isFilterOpened = ref(false);
    const preSelected = ref([...props.selected]);

    const togglePopup = () => {
      if (!isFilterOpened.value) {
        preSelected.value = [...props.selected]; // Reset temp filters when opening
      }
      isFilterOpened.value = !isFilterOpened.value;
    };

    const closePopup = () => {
      preSelected.value = [...props.selected];
      isFilterOpened.value = false;
    };

    const applyFilters = () => {
      emit('change', { name: props.name, values: preSelected.value });
      isFilterOpened.value = false;
    };

    const handleChange = (value:string) => {
      const index = preSelected.value.indexOf(value);
      if (index > -1) {
        preSelected.value.splice(index, 1);
      } else {
        preSelected.value.push(value);
      }
    };

    const isChecked = (value:string) => {
      return preSelected.value.includes(value);
    };

    watch(() => props.selected, (newVal) => {
      preSelected.value = [...newVal];
    });

    return {
      isFilterOpened,
      preSelected,
      togglePopup,
      closePopup,
      handleChange,
      isChecked,
      applyFilters
    };
  },
});
</script>


<style scoped>
.filter-wrapper {
  .filter-select-button {
    display: inline-block;
    border: 1px solid var(--gray-color-3);
    background: #fff;
    padding: var(--input-padding);
    font-size: var(--font-size-h3);
    border-radius: var(--input-padding);
    position: relative;
    padding-right: 70px;
    cursor: pointer;

    &:after {
      content: '';
      display: inline-block;
      background: url('@/assets/images/arrow_down.svg') no-repeat center;
      background-size: contain;
      width: 16px;
      height: 10px;
      position: absolute;
      right: 28px;
      top: 50%;
      margin-top: -4px;
      pointer-events: none;
    }
  }

  .filter-select-popup {
    display: none;
    position: absolute;
    top: calc(100% - 1px);
    left: 50vw;
    transform: translateX(-50%);
    width: 80vw;
    background: #fff;
    border: 1px solid var(--gray-color-3);
    border-radius: 20px;
    padding: 33px;
    z-index: 5;
  }

  .filter-select-popup-info {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .base-button {
      font-size: var(--font-size-h4);
      line-height: 1;
      padding: 10px 18px;
      height: auto;
      background: var(--primary-color);

      &:hover {
        background: var(--primary-color-lighter);
      }
    }
  }

  .filter-select-list {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    margin-top: 24px;

    label {
      border: 1px solid var(--gray-color-3);
      padding: 20px 26px;
      border-radius: 20px;
      font-size: 18px;
      line-height: 1.4;
      display: flex;
      gap: 16px;
      .input-wrapper {
        position: relative;
      }

      &.checked {


        .input-wrapper:before {
          content: ' ';
          display: block;
          width: 26px;
          height: 26px;
          border-radius: 100%;
          background: var(--primary-color) url('@/assets/images/checked.svg') no-repeat center;
          position: absolute;
          top: 0;
          left: 0;
        }

        span {
          color: var(--black-color);
        }
      }

      span {
        color: var(--gray-color-4);
      }
    }

    input[type="checkbox"] {
      appearance: none;
      width: 26px;
      min-width: 26px;
      height: 26px;
      border: 1px solid #99A3AE;
      background-color: #fff;
      outline: none;
      border-radius: 100%;
      margin: 0;
      cursor: pointer;
    }
  }

  &.active {
    .filter-bg {
      content: ' ';
      display: block;
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.4);
      z-index: 4;
    }
    .filter-select-button {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      z-index: 5;

      &:after {
        transform: rotate(-180deg);
      }
    }
    .filter-select-popup {
      display: block;
    }
  }

  &.big {
    .filter-select-list {
      flex-wrap: nowrap;
      label {
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
      }
    }
  }
}
</style>
