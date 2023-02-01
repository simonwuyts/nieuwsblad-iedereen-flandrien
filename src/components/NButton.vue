<template>
  <component
    :is="component"
    :class="[
      'n-button',
      { 'n-button--link': type === 'link', 'n-button--disabled': disabled },
    ]"
    :to="to"
    v-bind="$attrs"
  >
    <div class="n-button__icon" v-if="$slots.iconLeft">
      <slot name="iconLeft" />
    </div>
    <div class="n-button__label">
      <slot />
    </div>
    <div class="n-button__icon" v-if="$slots.iconRight">
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

<style scoped>
.n-button {
  align-items: center;
  background-color: var(--color-nb-dark-blue);
  color: #fff;
  cursor: pointer;
  display: flex;
  font-size: 15px;
  font-weight: 500;
  justify-content: center;
  line-height: 24px;
  padding: 8px 16px;
  text-transform: uppercase;
  width: 100%;
}

.n-button--disabled {
  opacity: 0.7;
  pointer-events: none;
}

.n-button__icon {
  display: block;
  flex: none;
  height: 16px;
  width: 16px;

  & svg {
    display: block;
  }
}

.n-button__label + .n-button__icon,
.n-button__icon + .n-button__label {
  margin-left: 8px;
}

.n-button--link {
  background-color: transparent;
  color: var(--color-button);
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  padding: 0;
  text-transform: inherit;

  & .n-button__label + .n-button__icon,
  & .n-button__icon + .n-button__label {
    margin-left: 4px;
  }
}
</style>
