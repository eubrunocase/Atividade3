<script>
export default {
  name: 'ProgressBar',
  props: {
    value: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      default: 'Progresso da reserva',
    },
  },
  computed: {
    clampedValue() {
      return Math.min(100, Math.max(0, Math.round(this.value)))
    },
  },
}
</script>

<template>
  <div
    class="progress"
    role="progressbar"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuenow="clampedValue"
    :aria-label="label"
  >
    <div class="progress-track">
      <div class="progress-fill" :style="{ width: clampedValue + '%' }"></div>
    </div>
    <div class="progress-meta">
      <span>{{ label }}</span>
      <strong>{{ clampedValue }}%</strong>
    </div>
  </div>
</template>

<style scoped>
.progress {
  display: grid;
  gap: 0.65rem;
}

.progress-track {
  height: 0.7rem;
  background: #eae4d8;
  border-radius: 999px;
  overflow: hidden;
  box-shadow: inset 0 1px 2px rgba(20, 44, 53, 0.08);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--ocean), var(--coral));
  border-radius: inherit;
  transition: width 0.25s ease;
}

.progress-meta {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.76rem;
  color: var(--ink-soft);
}

.progress-meta strong {
  color: var(--ink);
  font-size: 0.8rem;
}
</style>
