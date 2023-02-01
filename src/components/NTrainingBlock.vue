<template>
  <div
    class="n-training-block"
    :class="[`n-training-block--zone-${block.zoneNumber}`]"
  >
    <div class="n-training-block__left">
      <span class="n-training-block__label">{{ block.label }}</span>
      <span v-if="block.range" class="n-training-block__range">{{
        block.range
      }}</span>
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

const props = defineProps<{
  block: TrainingBlock
}>()
</script>

<style lang="scss" scoped>
.n-training-block {
  background: var(--color-zone-0);
  color: var(--color-nb-dark-blue);
  display: flex;
  justify-content: space-between;
  padding: 0.8rem;
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
  margin-left: 0.4rem;
  opacity: 0.7;
}
</style>
