<template>
  <div class="n-select-wrapper">
    <select
      @input="updateValue"
      :value="modelValue"
      v-bind="$attrs"
      class="n-select"
    >
      <slot />
    </select>
    <NIcon name="expand_more" class="n-select__icon" />
  </div>
</template>

<script setup lang="ts">
import NIcon from '@/components/NIcon.vue'

defineProps<{
  modelValue: string | boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | boolean): void
}>()

const updateValue = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<style lang="scss" scoped>
.n-select-wrapper {
  position: relative;
}

.n-select {
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  display: block;
  font: inherit;
  font-size: 16px;
  line-height: 24px;
  padding: 7px 33px 7px 11px;
  width: 100%;

  &:focus-visible {
    border-color: var(--color-nb-dark-blue);
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.3);
  }
}

.n-select__icon {
  position: absolute;
  pointer-events: none;
  top: 50%;
  transform: translateY(-50%);
  right: 12px;
}
</style>
