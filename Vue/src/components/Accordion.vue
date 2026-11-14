<script>
export default {
  name: 'Accordion',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      openIndex: 0,
    }
  },
  methods: {
    isOpen(index) {
      return this.openIndex === index
    },
    toggle(index) {
      this.openIndex = this.openIndex === index ? null : index
    },
  },
}
</script>

<template>
  <div class="accordion">
    <div
      v-for="(item, index) in items"
      :key="item.title"
      class="accordion-item"
      :class="{ 'is-open': isOpen(index) }"
    >
      <button
        type="button"
        class="accordion-trigger"
        :aria-expanded="isOpen(index)"
        :aria-controls="'accordion-panel-' + index"
        @click="toggle(index)"
      >
        <span>{{ item.title }}</span>
        <span class="accordion-icon" aria-hidden="true"></span>
      </button>
      <div :id="'accordion-panel-' + index" class="accordion-panel">
        <div class="accordion-panel-content">
          <p>{{ item.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.accordion {
  display: grid;
  gap: 0.75rem;
}

.accordion-item {
  background: var(--cream);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.accordion-item.is-open {
  border-color: rgba(14, 107, 111, 0.35);
  box-shadow: 0 8px 24px rgba(20, 44, 53, 0.06);
}

.accordion-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.1rem 1.2rem;
  background: transparent;
  border: 0;
  text-align: left;
  color: var(--ink);
  font-weight: 700;
  font-size: 0.95rem;
}

.accordion-icon {
  position: relative;
  flex: 0 0 auto;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  background: rgba(14, 107, 111, 0.08);
  transition: background 0.25s ease;
}

.accordion-icon::before,
.accordion-icon::after {
  content: '';
  position: absolute;
  inset: 50% auto auto 50%;
  width: 0.65rem;
  height: 2px;
  border-radius: 2px;
  background: var(--ocean);
  transform: translate(-50%, -50%);
  transition: transform 0.25s ease;
}

.accordion-icon::after {
  transform: translate(-50%, -50%) rotate(90deg);
}

.is-open .accordion-icon {
  background: var(--ocean);
}

.is-open .accordion-icon::before,
.is-open .accordion-icon::after {
  background: var(--cream);
}

.is-open .accordion-icon::after {
  transform: translate(-50%, -50%) rotate(0deg);
}

.accordion-panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease;
}

.is-open .accordion-panel {
  grid-template-rows: 1fr;
}

.accordion-panel-content {
  overflow: hidden;
}

.accordion-panel-content p {
  margin: 0;
  padding: 0 1.2rem 1.2rem;
  color: var(--ink-soft);
  font-size: 0.9rem;
  line-height: 1.7;
  max-width: 65ch;
}

@media (max-width: 480px) {
  .accordion-trigger {
    padding: 1rem;
    font-size: 0.9rem;
  }

  .accordion-panel-content p {
    padding: 0 1rem 1rem;
  }
}
</style>
