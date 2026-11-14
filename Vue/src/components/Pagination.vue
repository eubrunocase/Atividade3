<script>
export default {
  name: 'Pagination',
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  emits: ['page-change'],
  computed: {
    pages() {
      return Array.from({ length: this.totalPages }, (_, index) => index + 1)
    },
  },
  methods: {
    goTo(page) {
      if (page < 1 || page > this.totalPages || page === this.currentPage) {
        return
      }

      this.$emit('page-change', page)
    },
  },
}
</script>

<template>
  <nav class="pagination" aria-label="Paginação de academias">
    <button
      type="button"
      class="pagination-control"
      :disabled="currentPage === 1"
      @click="goTo(currentPage - 1)"
    >
      Anterior
    </button>

    <div class="pagination-pages">
      <button
        v-for="page in pages"
        :key="page"
        type="button"
        class="pagination-page"
        :class="{ 'is-active': page === currentPage }"
        :aria-current="page === currentPage ? 'page' : null"
        :aria-label="'Página ' + page"
        @click="goTo(page)"
      >
        {{ page }}
      </button>
    </div>

    <button
      type="button"
      class="pagination-control"
      :disabled="currentPage === totalPages"
      @click="goTo(currentPage + 1)"
    >
      Próxima
    </button>
  </nav>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 2rem;
}

.pagination button {
  border: 1px solid var(--line);
  background: var(--cream);
  color: var(--ink);
  border-radius: 999px;
  padding: 0.55rem 0.9rem;
  font-size: 0.82rem;
  font-weight: 700;
  transition:
    border-color 0.2s ease,
    color 0.2s ease,
    background 0.2s ease;
}

.pagination button:hover:not(:disabled) {
  border-color: var(--ocean);
  color: var(--ocean);
}

.pagination button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination-pages {
  display: flex;
  gap: 0.35rem;
}

.pagination-page {
  min-width: 2.4rem;
  height: 2.4rem;
  padding: 0;
}

.pagination-page.is-active {
  background: var(--ink);
  border-color: var(--ink);
  color: var(--cream);
}

@media (max-width: 480px) {
  .pagination {
    gap: 0.3rem;
  }

  .pagination button {
    padding: 0.5rem 0.7rem;
    font-size: 0.78rem;
  }

  .pagination-page {
    min-width: 2.1rem;
    height: 2.1rem;
  }
}
</style>
