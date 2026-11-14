<script>
export default {
  name: 'DropdownMenu',
  props: {
    label: {
      type: String,
      default: 'Selecionar opção',
    },
    options: {
      type: Array,
      required: true,
    },
  },
  emits: ['select'],
  data() {
    return {
      isOpen: false,
    }
  },
  mounted() {
    document.addEventListener('click', this.closeOnOutsideClick)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeOnOutsideClick)
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    },
    selectOption(option) {
      this.isOpen = false
      this.$emit('select', option)
    },
    closeOnOutsideClick(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false
      }
    },
  },
}
</script>

<template>
  <div class="dropdown">
    <button
      type="button"
      class="dropdown-trigger"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
      @click="toggle"
    >
      <span>{{ label }}</span>
      <span class="dropdown-arrow" aria-hidden="true"></span>
    </button>

    <ul v-if="isOpen" class="dropdown-list" role="listbox">
      <li v-for="option in options" :key="option.value">
        <button
          type="button"
          class="dropdown-option"
          role="option"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
}

.dropdown-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  width: 100%;
  min-width: 13rem;
  padding: 0.75rem 1.1rem;
  background: var(--cream);
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--ink);
  font-size: 0.85rem;
  font-weight: 700;
  transition: border-color 0.2s ease;
}

.dropdown-trigger:hover {
  border-color: var(--ocean);
}

.dropdown-arrow {
  width: 0.45rem;
  height: 0.45rem;
  border-right: 2px solid var(--ink-soft);
  border-bottom: 2px solid var(--ink-soft);
  transform: rotate(45deg) translateY(-2px);
  transition: transform 0.2s ease;
}

.dropdown-trigger[aria-expanded='true'] .dropdown-arrow {
  transform: rotate(-135deg) translateY(-2px);
}

.dropdown-list {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  z-index: 20;
  min-width: 100%;
  max-height: 17rem;
  margin: 0;
  padding: 0.45rem;
  list-style: none;
  overflow-y: auto;
  background: var(--cream);
  border: 1px solid var(--line);
  border-radius: 1rem;
  box-shadow: var(--shadow);
  animation: dropdown-in 0.18s ease;
}

.dropdown-option {
  display: block;
  width: 100%;
  padding: 0.6rem 0.75rem;
  border: 0;
  border-radius: 0.6rem;
  background: transparent;
  text-align: left;
  color: var(--ink);
  font-size: 0.85rem;
}

.dropdown-option:hover {
  background: rgba(14, 107, 111, 0.08);
  color: var(--ocean-deep);
}

@keyframes dropdown-in {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@media (max-width: 480px) {
  .dropdown-trigger {
    min-width: 0;
  }
}
</style>
