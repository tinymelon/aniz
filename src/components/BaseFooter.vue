<template>
  <div class="container">
    <footer>
      <div class="copyright">Агрегатор научных исторических знаний © 2024</div>
      <a href="#" class="agreement">Пользовательское соглашение</a>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseFooter'
});
</script>

<style scoped>
footer {
  display: flex;
  justify-content: space-between;
  padding: 22px 0;
  border-top: 1px solid var(--gray-color-3);
  letter-spacing: 0.3px;
}
</style>
