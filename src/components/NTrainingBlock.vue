<template>
  <div class="n-training-block">
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
  background: #ccc;
  display: flex;
  justify-content: space-between;
  padding: 0.8rem;
}

.n-training-block__label {
  font-weight: bold;
}

.n-training-block__range {
  margin-left: 0.4rem;
}
</style>
