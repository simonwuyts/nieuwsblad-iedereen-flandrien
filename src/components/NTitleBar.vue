<template>
  <div class="n-title-bar">
    <div class="n-title-bar__left">
      <slot name="left" />
    </div>
    <div class="n-title-bar__center">
      <div v-if="subtitle" class="n-title-bar__subtitle">
        {{ subtitle }}
      </div>
      <h1 v-if="title" class="n-title-bar__title">
        {{ title }}
      </h1>
    </div>
    <div class="n-title-bar__right">
      <slot name="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  subtitle?: string
}>()
</script>

<style scoped>
.n-title-bar {
  align-items: center;
  display: grid;
  flex: none;
  grid-template-columns: auto 1fr auto;
  min-height: 64px;
  padding: 8px 16px;
}

.n-title-bar__left {
  grid-column: 1 / span 1;
  grid-row: 1 / span 1;
  position: relative;
  z-index: 1;
}

.n-title-bar__center {
  grid-column: 1 / span 3;
  grid-row: 1 / span 1;
  padding: 0 40px;
  text-align: center;
}

.n-title-bar__right {
  grid-column: 3 / span 1;
  grid-row: 1 / span 1;
  position: relative;
  z-index: 1;
}

.n-title-bar__subtitle {
  color: var(--color-nb-orange);
  font-size: 13px;
  font-weight: bold;
  letter-spacing: 0.03em;
  line-height: 24px;
  text-transform: uppercase;
}

.n-title-bar__title {
  color: var(--color-nb-dark-blue);
  font-family: var(--font-family-title);
  font-size: 24px;
  font-weight: bold;
  line-height: 28px;
  margin: 0;
}
</style>
