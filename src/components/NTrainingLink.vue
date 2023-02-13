<template>
  <div class="n-training-link">
    <div class="n-training-link__left">
      <div v-if="subtitle" class="n-training-link__subtitle">
        {{ subtitle }}
      </div>
      <div class="n-training-link__description">
        <span class="n-training-link__title">{{ training.name }}</span>
        <span class="n-training-link__duration"
          >({{ formatMinutes(training.time) }})</span
        >
        <n-icon
          v-if="completed"
          name="check"
          class="n-training-link__completed"
        />
      </div>
    </div>
    <div class="n-training-link__right">
      <n-button
        icon="chevron_right"
        :to="{
          name: 'trainingDetails',
          params: { trainingId: trainingId, subtitle: subtitle },
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import NButton from '@/components/NButton.vue'
import NIcon from '@/components/NIcon.vue'
import { formatMinutes } from '@/lib/helpers'
import { getTraining } from '@/lib/training-helpers'
import { TrainingId } from '@/types'

const props = defineProps<{
  trainingId: TrainingId
  subtitle?: string
  bonus?: boolean
  completed?: boolean
}>()

const training = getTraining(props.trainingId)
</script>

<style scoped>
.n-training-link {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.n-training-link__subtitle {
  color: var(--color-nb-orange);
  font-size: 12px;
  font-weight: bold;
  line-height: 16px;
  text-transform: uppercase;
}

.n-training-link__description {
  color: var(--color-nb-dark-blue);
  display: flex;
  font-size: 16px;
  line-height: 24px;
  gap: 4px;
}

.n-training-link__title {
  font-weight: bold;
}

.n-training-link__duration {
  opacity: 0.75;
}

.n-training-link__completed {
  background-color: var(--color-nb-green);
  border-radius: 50%;
  color: #fff;
  margin-left: 4px;
}
</style>
