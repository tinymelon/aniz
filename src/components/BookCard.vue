<template>
  <div class="book-card" :data-id="book.id">
    <router-link :to="`/search/${book.slug}`" class="book-cover">
      <img :src="book.cover ? require(`@/assets/images/${book.cover}.png`) : require('@/assets/images/no_cover.png')" :alt="book.title">
    </router-link>
    <div class="book-author" v-if="book.authors && book.authors.length">
      {{ book.authors.join(', ') }}
    </div>
    <router-link :to="`/search/${book.slug}`" class="book-title">{{ book.title }}</router-link>
    <div class="book-tags" v-if="book.tags && book.tags.length">
      <router-link v-for="(tag, index) in book.tags" :key="index" :to="`/search?tag=${tag}`">{{ '#' + tag }}</router-link>
    </div>
    <router-link :to="`/search/${book.slug}`" class="book-button">Смотреть материал</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType  } from 'vue';
import { Book } from "@/types";

export default defineComponent({
  name: 'BookCard',
  props: {
    book: {
      type: Object as PropType<Book>,
      required: true,
    },
  }
});
</script>

<style scoped>
.book-card {
  max-width: 290px;
  font-size: var(--font-size-h4);
  line-height: var(--line-height-h4);
  display: flex;
  gap: 16px;
  flex-direction: column;
  text-align: center;
  align-items: center;
}
.book-cover {
  background: var(--gray-color-1);
  border-radius: 24px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 290 / 390;
  padding: 44px 53px 54px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }
}
.book-author {
  color: var(--gray-color-4);
}
.book-title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
}
.book-tags {
  font-size: var(--font-size-small);
  line-height: 1.4;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;

   a {
     color: var(--primary-color);
   }
}
.book-button {
  background-color: var(--gray-color-2);
  border: 1px solid var(--gray-color-3);
  border-radius: 24px;
  padding: 10px 18px;
  display: inline-block;
  width: fit-content;
}
</style>
