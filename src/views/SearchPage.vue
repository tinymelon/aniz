<template>
  <section class="search-section container">
    <div class="search-header">
      <router-link to="/" class="search-back"></router-link>
      <h2>Поиск</h2>
    </div>
    <div class="search-filters">
      <BaseInput v-model="searchTerm" placeholder="Поиск" />
      <FilterDropdown
        :options="historicalPeriodOptions"
        :selected="selectedFilters.historicalPeriod"
        name="historicalPeriod"
        title="Исторический период"
        :filtersBig="true"
        @change="handleFilterChange"
      />
      <FilterDropdown
          :options="categoryOptions"
          :selected="selectedFilters.category"
          name="category"
          title="Категория материала"
          :filtersBig="true"
          @change="handleFilterChange"
      />
      <FilterDropdown
          :options="tags"
          :selected="selectedFilters.tags"
          name="tags"
          title="Теги"
          @change="handleFilterChange"
      />
      <BaseButton @click="handleClick">Искать</BaseButton>
    </div>
    <div class="search-filters-output">
      <div class="search-filters-output-block" v-for="(filter, index) in selectedFilters.historicalPeriod" :key="index">
        Исторический период: {{ historicalPeriodOptions.find((e) => e.value === filter)['title'] }}
        <div class="remove-tag" @click="removeFilter('historicalPeriod', filter)"></div>
      </div>
      <div class="search-filters-output-block" v-for="(filter, index) in selectedFilters.category" :key="index">
        Категория материала: {{ categoryOptions.find((e) => e.value === filter)['title'] }}
        <div class="remove-tag" @click="removeFilter('category', filter)"></div>
      </div>
      <div class="search-filters-output-block" v-for="(filter, index) in selectedFilters.tags" :key="index">
        {{ filter }}
        <div class="remove-tag" @click="removeFilter('tags', filter)"></div>
      </div>
    </div>
    <Flicking
        ref="flicking"
        :options="{
          align: 'prev',
          circular: false,
          preventClickOnDrag: true,
          bound: true,
          moveType: 'freeScroll',
          collectingThreshold: 100
        }"
        @changed="onMoved"
        class="search-carousel-wrapper"
    >
      <BookCard v-for="(book, index) in books" :key="index" :book="book" :class="[{ 'center': index === currentIndex }]" />
    </Flicking>
    <div class="carousel-controls">
      <button @click="prev" :disabled="isPrevDisabled" class="base-button prev"></button>
      <button @click="next" :disabled="isNextDisabled" class="base-button next"></button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch  } from 'vue';
import { useRoute } from 'vue-router';
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
import BookCard from "@/components/BookCard.vue";
import { Book } from "@/types";
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';
import FilterDropdown from "@/components/FilterDropdown.vue";

interface SelectedFilters {
  [key: string]: string[];
}

export default defineComponent({
  name: 'SearchPage',
  components: {
    FilterDropdown,
    BaseButton,
    BaseInput,
    BookCard,
    Flicking
  },
  setup() {
    const selectedOption = ref('');
    const searchTerm = ref('');
    const books = ref<Array<Book> | null>(null);
    const tags = ref<Array<string> | null>(null);

    const route = useRoute();
    const category = ref(route.query.category);
    const tag = ref(route.query.tag);

    const flicking = ref<typeof Flicking | null>(null);
    const isPrevDisabled = ref(true);
    const isNextDisabled = ref(false);
    const itemsPerView = ref(4);


    const selectedFilters = ref<SelectedFilters>({
      historicalPeriod: [],
      category: category.value ? [category.value as string] : [],
      tags: []
    });
    const handleFilterChange = ({ name, values }: { name: string; values: string[] }) => {
      selectedFilters.value[name] = values;

      fetchData(selectedFilters.value);
    };
    const removeFilter = (filterType: string, filterValue: string) => {
      const newArray = selectedFilters.value[filterType].filter(item => item !== filterValue);
      selectedFilters.value = { ...selectedFilters.value, [filterType]: newArray };

      fetchData(selectedFilters.value);
    };

    const updateItemsPerView = () => {
      if (window.innerWidth >= 1200) {
        itemsPerView.value = 6;
      } else {
        itemsPerView.value = 4;
      }
    };

    const prev = () => {
      flicking.value?.prev(itemsPerView.value).then(() => {
        updateDisabledState();
      });
    };

    const next = () => {
      flicking.value?.next(itemsPerView.value).then(() => {
        updateDisabledState();
      });
    };

    const updateDisabledState = () => {
      const flickingInstance = flicking.value;
      if (flickingInstance) {
        isPrevDisabled.value = flickingInstance.index <= 0;
        isNextDisabled.value = flickingInstance.index >= flickingInstance.panels.length - itemsPerView.value;
      }
    };

    const onMoved = () => {
      updateDisabledState();
    };

    watch(() => route.query.category, (newCategory) => {
      category.value = newCategory;
      if (!newCategory) {
        selectedFilters.value.category = [];
      } else {
        tag.value = null;
        selectedFilters.value = {
          category: newCategory ? [newCategory as string] : [],
          tags: [],
          historicalPeriod: []
        }
      }
    });

    watch(() => route.query.tag, (newTag) => {
      tag.value = newTag;
      if (!newTag) {
        selectedFilters.value.tags = [];
      } else {
        category.value = null;
        selectedFilters.value = {
          category: [],
          tags: newTag ? [newTag as string] : [],
          historicalPeriod: []
        }
      }
    });

    const handleClick = () => {
      alert(`Ищем по запросу: /api/search?category=${JSON.stringify(selectedFilters.value.category)}&historicalPeriod=${JSON.stringify(selectedFilters.value.historicalPeriod)}&tags=${JSON.stringify(selectedFilters.value.tags)}&q=${searchTerm.value}`)
    };

    const fetchData = async (filters: SelectedFilters = {}) => {
      let booksData: Book[], response, tagsData: string[];
      let filtersAvailiable = false;

      Object.keys(filters).forEach((k) => {
        if (filters[k] && filters[k].length) filtersAvailiable = true;
      });

      try {
        response = await fetch('/books.json');
        booksData = await response.json();
        if (filtersAvailiable) {
          let filteredBooks: Book[] = [];

          Object.keys(filters).forEach((e) => {
            const filter = filters[e];
            if (filter && filter.length) {
              filter.forEach((f) => {
                booksData.forEach((book) => {
                  const bookValue = book[e];
                  const isArr = Array.isArray(bookValue);
                  if (isArr && (bookValue as string[]).includes(f)) {
                    filteredBooks.push(book);
                  } else if (!isArr && bookValue === f) {
                    filteredBooks.push(book);
                  }
                });
              });
            }
          });

          books.value = filteredBooks;
        } else {
          books.value = booksData;
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных книг:', error);
      }
      if (!tags.value) {
        try {
          response = await fetch('/tags.json');
          tagsData = await response.json();
          tags.value = tagsData;

          if (tag.value) {
            selectedFilters.value.tags = [tag.value as string];
          }
        } catch (error) {
          console.error('Ошибка при загрузке данных тегов:', error);
        }
      }
    };

    const historicalPeriodOptions = ref([{
      value: '0', title: 'Древняя Русь (до XIII века) и Удельная Русь (XIII-XV вв.)'
    }, {
      value: '1', title: 'Россия в XVI – XVII вв.'
    }, {
      value: '2', title: 'Россия в XVIII – ХIX вв.'
    }, {
      value: '3', title: 'История России ХХ-ХХI веков'
    }]);

    const categoryOptions = ref([{
      value: '0', title: 'Учебники и учебные пособия'
    }, {
      value: '1', title: 'Научная историческая периодика'
    }, {
      value: '2', title: 'Диссертации'
    }, {
      value: '3', title: 'Монографии'
    }, {
      value: '4', title: 'Сборники исторических документов'
    }]);

    onMounted(() => {
      category.value = route.query.category;
      tag.value = route.query.tag;

      fetchData();

      updateItemsPerView();
      window.addEventListener('resize', updateItemsPerView);
      flicking.value?.on('moved', updateDisabledState);
    });

    return {
      handleClick,
      selectedOption,
      searchTerm,
      books,
      tags,
      category,
      tag,
      fetchData,
      flicking,
      isPrevDisabled,
      isNextDisabled,
      prev,
      next,
      onMoved,
      selectedFilters,
      handleFilterChange,
      removeFilter,
      historicalPeriodOptions,
      categoryOptions,
    };
  },
});
</script>

<style scoped>
@import '@/assets/styles/SearchPage.css';
</style>
