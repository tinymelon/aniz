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
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';

type Book = {
  id: number,
  title: string,
  slug: string,
  cover: string | null,
  authors: Array<string>,
  tags: Array<string>,
  publisher: string,
  historicalPeriod: number,
  category: number,
  relative: Array<number>,
  lead: string,
  description: string
}

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

    watch(() => route.query.category, (newCategory) => {
      category.value = newCategory;
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
      fetchData
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/SearchPage.scss';
</style>
