<template>
  <component
    :is="component"
    :class="[
      'button',
      { 'button--link': type === 'link', 'button--disabled': disabled },
    ]"
    :to="to"
  >
    <div class="button__icon" v-if="$slots.iconLeft">
      <slot name="iconLeft" />
    </div>
    <div class="button__label">
      <slot />
    </div>
    <div class="button__icon" v-if="$slots.iconRight">
      <slot name="iconRight" />
    </div>
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  type?: string
  to?: string
  disabled?: boolean
}>()

const component = computed(() => {
  return props.to ? 'router-link' : 'button'
})
</script>
