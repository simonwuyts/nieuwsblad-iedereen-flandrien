<template>
  <component
    :is="component"
    :class="[
      'button',
      { 'button--link': type === 'link', 'button--disabled': disabled },
    ]"
    :to="to"
    v-bind="$attrs"
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

<style scoped>
.button {
  align-items: center;
  background-color: var(--color-button);
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  padding: 8px 16px;
  text-transform: uppercase;
}

.button--disabled {
  opacity: 0.7;
  pointer-events: none;
}

.button__icon {
  display: block;
  flex: none;
  height: 16px;
  width: 16px;

  & svg {
    display: block;
  }
}

.button__label + .button__icon,
.button__icon + .button__label {
  margin-left: 8px;
}

.button--link {
  background-color: transparent;
  color: var(--color-button);
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  padding: 0;
  text-transform: inherit;

  & .button__label + .button__icon,
  & .button__icon + .button__label {
    margin-left: 4px;
  }
}
</style>
