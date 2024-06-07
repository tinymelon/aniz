<template>
  <section class="banner-section">
    <div class="container">
      <div class="banner-text">
        <h1>Агрегатор научных исторических знаний</h1>
        <BaseButton :url="url">Перейти к поиску</BaseButton>
      </div>
    </div>
    <div class="banner-image-wrapper">
      <img src="@/assets/images/main_bg.png" alt="" class="banner-image">
      <div class="banner-image-text h1">2010 <small class="h3">материалов</small></div>
    </div>
  </section>
  <section class="documents-section">
    <div class="container">
      <h2>Исторические документы</h2>
      <BaseSelect :options="books" :value="selectedBook" @change="goToBook" />
    </div>
    <Flicking
        ref="flicking"
        :options="{
          circularFallback: 'linear',
          circular: true,
          align: 'center',
          preventClickOnDrag: true
        }"
        class="carousel-wrapper"
        @changed="onChanged"
    >
      <BookCard v-for="(book, index) in books" :key="index" :book="book" :class="[{ 'center': index === currentIndex }]" />
    </Flicking>
    <div class="carousel-hint">Передвигайте что бы увидеть больше</div>
  </section>
  <section class="partners-section">
    <h2>Наши партнёры</h2>
    <div class="partners-logos">
      <img src="@/assets/images/ifla.png" alt="IFLA">
      <img src="@/assets/images/mfgs.png" alt="MFGS">
      <img src="@/assets/images/svet.svg" alt="НЭБ Свет">
      <img src="@/assets/images/bae.svg" alt="БАЕ">
      <img src="@/assets/images/rgb.png" alt="РГБ">
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
import { Book } from "@/types";
import BaseButton from '@/components/BaseButton.vue';
import BookCard from '@/components/BookCard.vue';
import BaseSelect from "@/components/BaseSelect.vue";

export default defineComponent({
  name: 'HomePage',
  components: {
    BaseSelect,
    BaseButton,
    BookCard,
    Flicking
  },
  setup() {
    const inputValue = ref('');

    const placeholderText = ref('Введите текст...');

    const url = ref('/search');

    const books = ref([
      {
        "id": 1,
        "title": "Книга 1",
        "slug": "kniga-1",
        "cover": "cover1",
        "authors": ["Автор 1", "Автор 2"],
        "tags": ["Фантастика", "Приключения"],
      },
      {
        "id": 2,
        "title": "Заголовок карточки который умещается в три строчки, в противоположном случае сокращается",
        "slug": "kniga-2",
        "cover": "cover2",
        "authors": ["Автор 3"],
        "tags": ["Детектив", "Средний тег"],
      },
      {
        "id": 3,
        "title": "Книга 3",
        "slug": "kniga-3",
        "cover": "cover1",
        "authors": ["Автор 4"],
        "tags": ["Очень длинное название тега"],
      },
      {
        "id": 4,
        "title": "Заголовок карточки который умещается в две строчки",
        "slug": "kniga-4",
        "cover": "cover3",
        "authors": null,
        "tags": ["НаучнаяЛитература"],
      },
      {
        "id": 5,
        "title": "Книга 5",
        "slug": "kniga-5",
        "cover": "cover2",
        "authors": ["Автор 6"],
        "tags": null,
      },
      {
        "id": 6,
        "title": "Книга 6",
        "slug": "kniga-6",
        "cover": null,
        "authors": ["Автор 7"],
        "tags": ["Очень длинное название тега", "Фантастика"],
      },
      {
        "id": 7,
        "title": "Книга 7",
        "slug": "kniga-7",
        "cover": null,
        "authors": null,
        "tags": null,
      },
      {
        "id": 8,
        "title": "Книга 8",
        "slug": "kniga-8",
        "cover": "cover1",
        "authors": ["Автор 9"],
        "tags": ["Очень длинное название тега", "НаучнаяЛитература"],
      }
    ] as Array<Book>)

    const selectedBook = ref(0);
    const currentIndex = ref(0);
    const flicking = ref<typeof Flicking | null>(null);

    const onChanged = (e: Record<string, number>) => {
      currentIndex.value = e.index;
      selectedBook.value = e.index;
    };

    const goToBook = (e: Event) => {
      selectedBook.value = Number((e.target as HTMLSelectElement).value);
      flicking.value?.moveTo(Number(selectedBook.value)).catch(() => { console.log(1) });
    };

    onMounted(() => {
      flicking.value?.moveTo(currentIndex.value).catch(() => { console.log(2) });
    });

    return {
      inputValue,
      placeholderText,
      url,
      books,
      selectedBook,
      currentIndex,
      flicking,
      onChanged,
      goToBook
    };
  },
});
</script>

<style scoped>
@import '@/assets/styles/HomePage.css';
</style>
