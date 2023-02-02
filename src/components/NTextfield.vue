<template>
  <input
    @input="updateValue"
    :value="modelValue"
    v-bind="$attrs"
    class="n-textfield"
  />
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const updateValue = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<style lang="scss" scoped>
.n-textfield {
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  display: block;
  font: inherit;
  font-size: 16px;
  line-height: 24px;
  padding: 7px 11px;
  width: 100%;

  &:focus-visible {
    border-color: var(--color-nb-dark-blue);
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.3);
  }
}
</style>
