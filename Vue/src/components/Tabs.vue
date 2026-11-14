<script>
export default {
  name: 'Tabs',
  props: {
    tabs: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeIndex: 0,
    }
  },
  computed: {
    activeTab() {
      return this.tabs[this.activeIndex] || this.tabs[0]
    },
  },
  methods: {
    selectTab(index) {
      this.activeIndex = index
    },
  },
}
</script>

<template>
  <div class="tabs">
    <div class="tabs-list" role="tablist" aria-label="Conteúdo das abas">
      <button
        v-for="(tab, index) in tabs"
        :key="tab.label"
        type="button"
        class="tabs-tab"
        role="tab"
        :class="{ 'is-active': activeIndex === index }"
        :aria-selected="activeIndex === index"
        @click="selectTab(index)"
      >
        {{ tab.label }}
      </button>
    </div>

    <div v-if="activeTab" class="tabs-panel" role="tabpanel">
      <ul>
        <li v-for="line in activeTab.content" :key="line">{{ line }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.tabs-list {
  display: flex;
  gap: 0.35rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  margin-bottom: 1.2rem;
  border-bottom: 1px solid var(--line);
}

.tabs-tab {
  border: 0;
  background: transparent;
  color: var(--ink-soft);
  padding: 0.65rem 0.85rem;
  font-size: 0.85rem;
  font-weight: 700;
  border-radius: 999px;
  white-space: nowrap;
  transition:
    background 0.2s ease,
    color 0.2s ease;
}

.tabs-tab:hover {
  background: rgba(14, 107, 111, 0.06);
  color: var(--ocean);
}

.tabs-tab.is-active {
  background: var(--ocean);
  color: var(--cream);
}

.tabs-panel {
  animation: panel-in 0.25s ease;
}

.tabs-panel ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.65rem;
}

.tabs-panel li {
  position: relative;
  padding-left: 1.2rem;
  color: var(--ink-soft);
  font-size: 0.9rem;
  line-height: 1.6;
}

.tabs-panel li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 0.42rem;
  height: 0.42rem;
  border-radius: 50%;
  background: var(--coral);
}

@keyframes panel-in {
  from {
    opacity: 0;
    transform: translateY(4px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}
</style>
