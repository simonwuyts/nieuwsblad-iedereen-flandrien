<template>
  <div class="input">
    <label v-if="label" class="input__label">{{ label }}</label>
    <div class="input__controls">
      <slot />
    </div>
    <div v-if="helper" class="input__helper">{{ helper }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label?: string
  helper?: string
}>()
</script>

<style scoped>
.input {
  margin-bottom: 16px;
}

.input__label {
  display: block;
  font-weight: 500;
  margin-bottom: 8px;
}

.input__helper {
  font-size: 12px;
  line-height: 14px;
  opacity: 0.75;
  margin-top: 8px;
}
</style>
