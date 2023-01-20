<template>
  <div class="input">
    <label v-if="label" class="input__label">{{ label }}</label>
    <div class="input__controls">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label?: string
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
</style>
