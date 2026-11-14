<script>
import { toastService } from '../services/toastService.js'

export default {
  name: 'Toast',
  computed: {
    toasts() {
      return toastService.toasts
    },
  },
  methods: {
    dismiss(id) {
      toastService.dismiss(id)
    },
    iconFor(type) {
      if (type === 'success') {
        return '✓'
      }

      if (type === 'error') {
        return '!'
      }

      return 'i'
    },
  },
}
</script>

<template>
  <div class="toast-stack" aria-live="polite">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="toast"
      :class="'toast-' + toast.type"
      :role="toast.type === 'error' ? 'alert' : 'status'"
    >
      <span class="toast-icon" aria-hidden="true">{{ iconFor(toast.type) }}</span>
      <p>{{ toast.message }}</p>
      <button
        type="button"
        class="toast-close"
        aria-label="Fechar notificação"
        @click="dismiss(toast.id)"
      >
        ×
      </button>
    </div>
  </div>
</template>

<style scoped>
.toast-stack {
  position: fixed;
  inset: auto 1rem 1rem auto;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.6rem;
  width: min(24rem, calc(100vw - 2rem));
}

.toast {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: start;
  gap: 0.7rem;
  width: 100%;
  padding: 0.9rem 1rem;
  background: var(--cream);
  border: 1px solid var(--line);
  border-left: 4px solid var(--info);
  border-radius: 0.9rem;
  box-shadow: 0 16px 36px rgba(20, 44, 53, 0.16);
  animation: toast-in 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.toast-success {
  border-left-color: var(--success);
}

.toast-error {
  border-left-color: var(--danger);
}

.toast-icon {
  display: grid;
  place-items: center;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  background: var(--info);
  color: var(--cream);
  font-size: 0.75rem;
  font-weight: 800;
}

.toast-success .toast-icon {
  background: var(--success);
}

.toast-error .toast-icon {
  background: var(--danger);
}

.toast p {
  margin: 0;
  padding-top: 0.05rem;
  color: var(--ink);
  font-size: 0.85rem;
  line-height: 1.5;
}

.toast-close {
  padding: 0.1rem 0.2rem;
  border: 0;
  border-radius: 0.3rem;
  background: transparent;
  color: var(--ink-soft);
  font-size: 1.15rem;
  line-height: 1;
}

.toast-close:hover {
  background: rgba(20, 44, 53, 0.06);
  color: var(--ink);
}

@keyframes toast-in {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@media (max-width: 480px) {
  .toast-stack {
    inset: auto 0.75rem 0.75rem;
    width: auto;
  }
}
</style>
