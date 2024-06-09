<template>
  <section class="entity-section container" v-if="book">
    <div class="entity-summary">
      <router-link to="/" class="entity-back">На главную</router-link>
      <div class="entity-summary-block" v-if="book.authors?.length">
        <div class="entity-summary-title">Автор(-ы)</div>
        <div class="entity-summary-value">{{ book.authors?.join(', ') }}</div>
      </div>
      <div class="entity-summary-block" v-if="book.publisher">
        <div class="entity-summary-title">Издано</div>
        <div class="entity-summary-value">{{ book.publisher }}</div>
      </div>
    </div>
    <div class="entity-details">
      <h2>{{ book.title }}</h2>
      <div class="entity-cover-wrapper">
        <img :src="book.cover ? require(`@/assets/images/${book.cover}.png`) : require('@/assets/images/no_cover.png')" :alt="book.title" class="entity-cover">
        <BaseButton url="#">Читать</BaseButton>
      </div>
      <div class="entity-lead" v-if="book.lead">{{ book.lead }}</div>
      <div class="entity-description-wrapper" v-if="book.description">
        <div class="entity-page-header">Библиографическое описание</div>
        <div class="entity-description">{{ book.description }}</div>
      </div>
      <div class="entity-tags-wrapper" v-if="book.tags?.length">
        <div class="entity-page-header">Теги</div>
        <div class="entity-tags styled-tags-wrapper">
          <router-link class="styled-tag" v-for="(tag, index) in book.tags" :key="index" :to="`/search?tag=${tag}`">{{ '#' + tag }}</router-link>
        </div>
      </div>
      <div class="entity-relative-wrapper" v-if="relativeBooks?.length">
        <div class="entity-page-header">Связанные материалы</div>
        <div class="entity-relative">
          <BookCard v-for="(book, index) in relativeBooks" :key="index" :book="book" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import BaseButton from '@/components/BaseButton.vue';
import BookCard from '@/components/BookCard.vue';
import { BookFull } from "@/types";

export default defineComponent({
  name: 'EntityPage',
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  components: {
    BaseButton,
    BookCard
  },
  setup(props) {
    const route = useRoute();
    const relativeBooks = ref<Array<BookFull> | null>(null);
    const book = ref<BookFull | null>(null);

    const fetchData = async () => {
      let booksData: BookFull[], response;

      try {
        response = await fetch('/books.json');
        booksData = await response.json();
        book.value = booksData.find((e) => e.slug === props.slug ) || null;

        if (book.value?.relative?.length) {
          const filteredBooks: BookFull[] = [];
          book.value.relative.forEach((e) => {
            const bookById: BookFull | null = booksData.find((b) => b.id === e ) || null;
            if (bookById) filteredBooks.push(bookById);
          })

          relativeBooks.value = filteredBooks;
        }
      } catch (e) {
        console.error(e);
      }
    };

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    watch(() => route.params.slug, (newSlug, oldSlug) => {
      if (newSlug !== oldSlug) {
        fetchData();
        scrollToTop();
      }
    });

    onMounted(() => {
      fetchData();
    });

    return {
      book,
      relativeBooks,
      fetchData,
      scrollToTop
    }
  }
});
</script>

<style scoped>
@import '@/assets/styles/EntityPage.css';
</style>
