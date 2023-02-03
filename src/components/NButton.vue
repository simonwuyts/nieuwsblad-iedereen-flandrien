<template>
  <component
    :is="component"
    :class="[
      'n-button',
      `n-button--${type}`,
      {
        'n-button--disabled': disabled,
        'n-button--flexible': flexible,
        'n-button--icon': !$slots.default,
      },
    ]"
    :to="to"
    v-bind="$attrs"
  >
    <n-icon v-if="icon" :name="icon" class="n-button__icon" />
    <div v-if="$slots.default" class="n-button__label">
      <slot />
    </div>
    <n-icon v-if="iconRight" :name="iconRight" class="n-button__icon" />
  </component>
</template>

<script lang="ts" setup>
import NIcon from '@/components/NIcon.vue'
import { computed } from 'vue'
import { RouteLocationRaw } from 'vue-router'

const props = withDefaults(
  defineProps<{
    type?: string
    to?: RouteLocationRaw
    icon?: string
    iconRight?: string
    disabled?: boolean
    flexible?: boolean
  }>(),
  {
    flexible: true,
  }
)

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
  flex: none;
  font-size: 15px;
  font-weight: 500;
  justify-content: center;
  line-height: 20px;
  padding: 10px 16px;
  text-transform: uppercase;
  user-select: none;
}

.n-button--flexible {
  flex: 1 1 auto;
  width: 100%;
}

.n-button--subtle {
  background-color: transparent;
  color: var(--color-nb-dark-blue);
}

.n-button--success {
  background-color: var(--color-nb-green);
  color: var(--color-nb-dark-blue);
}

.n-button--icon {
  flex: none;
  padding: 10px;
  width: 40px;
}

.n-button--disabled {
  opacity: 0.5;
  pointer-events: none;
}

.n-button__icon {
  flex: none;
  font-size: 20px;
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
