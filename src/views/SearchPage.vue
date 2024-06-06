<template>
  <div>
    <h1>Search Page</h1>
    <p>Category: {{ category }}</p>
    <BaseButton @click="handleClick">Click Me</BaseButton>
    <BaseInput v-model="searchTerm" placeholder="Поиск..." />

    <select v-model="selectedOption">
      <option value="0">История</option>
    </select>

    <div v-if="booksData && booksData.length">
      <div v-for="(book, index) in booksData" :key="index">
        <div>{{ book.title }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch  } from 'vue';
import { useRoute } from 'vue-router';
import { Book } from "@/types";
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';

export default defineComponent({
  name: 'SearchPage',
  components: {
    BaseButton,
    BaseInput,
  },
  setup() {
    const selectedOption = ref('');
    const searchTerm = ref('');
    const booksData = ref<Array<Book> | null>(null);
    const tagsData = ref<Array<string> | null>(null);

    const route = useRoute();
    const category = ref(route.query.category);
    const tag = ref(route.query.tag);

    watch(() => route.query.category, (newCategory) => {
      category.value = newCategory;
    });

    watch(() => route.query.tag, (newTag) => {
      tag.value = newTag;
    });

    const handleClick = () => {
      console.log('Button clicked!');
    };

    const fetchData = async () => {
      let data, response;
      try {
        response = await fetch('/books.json');
        data = await response.json();
        booksData.value = data;
      } catch (error) {
        console.error('Ошибка при загрузке данных книг:', error);
      }
      try {
        response = await fetch('/tags.json');
        data = await response.json();
        tagsData.value = data;
      } catch (error) {
        console.error('Ошибка при загрузке данных тегов:', error);
      }
    };

    onMounted(() => {
      fetchData();
      category.value = route.query.category;
    });

    return {
      handleClick,
      selectedOption,
      searchTerm,
      booksData,
      tagsData,
      category,
      tag,
      fetchData
    };
  },
});
</script>

<style scoped>
@import '@/assets/styles/SearchPage.css';
</style>
