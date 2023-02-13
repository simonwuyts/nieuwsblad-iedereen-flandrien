<template>
  <div
    class="n-training-block"
    :class="[
      `n-training-block--zone-${block.zoneNumber}`,
      { 'n-training-block--active': active },
    ]"
  >
    <div class="n-training-block__left">
      <div class="n-training-block__label">{{ block.label }}</div>
      <div v-if="block.range" class="n-training-block__range">
        {{ block.range }}
      </div>
    </div>
    <div class="n-training-block__right">
      <div class="n-training-block__minutes">
        {{ formatMinutes(block.minutes) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatMinutes } from '@/lib/helpers'
import { TrainingBlock } from '@/types'

const props = withDefaults(
  defineProps<{
    block: TrainingBlock
    active?: boolean
    type: 'heart' | 'ftp'
  }>(),
  {
    type: 'heart',
  }
)
</script>

<style lang="scss" scoped>
.n-training-block {
  background: var(--color-zone-0);
  color: var(--color-nb-dark-blue);
  display: flex;
  justify-content: space-between;
  opacity: 0.5;
  padding: 8px;
}

.n-training-block--active {
  opacity: 1;
}

.n-training-block--zone-1 {
  background-color: var(--color-zone-1);
  color: #fff;
}

.n-training-block--zone-2 {
  background-color: var(--color-zone-2);
  color: #000;
}

.n-training-block--zone-3 {
  background-color: var(--color-zone-3);
  color: #000;
}

.n-training-block--zone-4 {
  background-color: var(--color-zone-4);
  color: #fff;
}

.n-training-block--zone-5 {
  background-color: var(--color-zone-5);
  color: #fff;
}

.n-training-block__label {
  font-weight: bold;
}

.n-training-block__range {
  margin-left: 4px;
  opacity: 0.7;
}
</style>
