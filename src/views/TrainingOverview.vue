<template>
  <NTitleBar :title="`Week ${store.currentWeekNumber}`">
    <template #left>
      <n-button
        type="subtle"
        icon="chevron_left"
        :disabled="store.currentWeekNumber === 1"
        @click="previousWeek"
      />
    </template>
    <template #right>
      <n-button
        type="subtle"
        icon="chevron_right"
        :disabled="store.currentWeekNumber === store.totalWeeks"
        @click="nextWeek"
      />
    </template>
  </NTitleBar>
  <NContent>
    <NTrainingLinks>
      <NTrainingLink
        v-if="store.currentWeekTrainings['training1']"
        :training-id="store.currentWeekTrainings['training1']"
        :key="`${store.currentWeekNumber}${store.currentWeekTrainings['training1']}`"
        :completed="isCompleted('training1')"
        subtitle="Training 1"
      />
      <NTrainingLink
        v-if="store.currentWeekTrainings['training2']"
        :training-id="store.currentWeekTrainings['training2']"
        :key="`${store.currentWeekNumber}${store.currentWeekTrainings['training2']}`"
        subtitle="Training 2"
      />
      <NTrainingLink
        v-if="store.currentWeekTrainings['training3']"
        :training-id="store.currentWeekTrainings['training3']"
        :key="`${store.currentWeekNumber}${store.currentWeekTrainings['training3']}`"
        subtitle="Training 3"
      />
      <NTrainingLink
        v-if="store.currentWeekTrainings['training4']"
        :training-id="store.currentWeekTrainings['training4']"
        :key="`${store.currentWeekNumber}${store.currentWeekTrainings['training4']}`"
        subtitle="Training 4"
      />
      <NTrainingLink
        v-if="store.currentWeekTrainings['training5']"
        :training-id="store.currentWeekTrainings['training5']"
        :key="`${store.currentWeekNumber}${store.currentWeekTrainings['training5']}`"
        subtitle="Training 5"
      />
    </NTrainingLinks>
    <template v-if="store.firestoreUserData?.extraTime">
      <h2 class="n-divider-title">Bonustrainingen</h2>
      <NTrainingLinks>
        <NTrainingLink
          v-if="store.currentWeekTrainings['bonus1']"
          :training-id="store.currentWeekTrainings['bonus1']"
          :key="`${store.currentWeekNumber}${store.currentWeekTrainings['bonus1']}`"
          subtitle="Bonustraining 1"
        />
        <NTrainingLink
          v-if="store.currentWeekTrainings['bonus2']"
          :training-id="store.currentWeekTrainings['bonus2']"
          :key="`${store.currentWeekNumber}${store.currentWeekTrainings['bonus2']}`"
          subtitle="Bonustraining 2"
        />
        <NTrainingLink
          v-if="store.currentWeekTrainings['bonus3']"
          :training-id="store.currentWeekTrainings['bonus3']"
          :key="`${store.currentWeekNumber}${store.currentWeekTrainings['bonus3']}`"
          subtitle="Bonustraining 3"
        />
      </NTrainingLinks>
    </template>
  </NContent>
</template>

<script setup lang="ts">
import NButton from '@/components/NButton.vue'
import NContent from '@/components/NContent.vue'
import NTitleBar from '@/components/NTitleBar.vue'
import NTrainingLink from '@/components/NTrainingLink.vue'
import NTrainingLinks from '@/components/NTrainingLinks.vue'
import { convertTrainingIdToKey } from '@/lib/helpers'
import { useStore } from '@/store'
import { TrainingKey } from '@/types'
import { onMounted } from 'vue'

const store = useStore()

function isCompleted(key: TrainingKey) {
  const trainings = store.firestoreUserData?.trainings
  const trainingKey = convertTrainingIdToKey(store.currentWeekTrainings[key])

  if (trainings) {
    const training = trainings[trainingKey]
    return training && training.status === 'completed'
  } else {
    return false
  }
}

onMounted(async () => {
  await store.fetchFirestoreUserData()
})

function nextWeek() {
  if (store.currentWeekNumber < store.totalWeeks) {
    store.currentWeekNumber = store.currentWeekNumber + 1
  }
}

function previousWeek() {
  if (store.currentWeekNumber > 1) {
    store.currentWeekNumber = store.currentWeekNumber - 1
  }
}
</script>

<style scoped>
.n-divider-title {
  background-color: rgba(0, 0, 104, 10%);
  color: var(--color-nb-dark-blue);
  display: block;
  font-size: 15px;
  font-weight: bold;
  letter-spacing: 0.03em;
  line-height: 24px;
  margin: 32px -24px;
  padding: 12px 24px;
  text-transform: uppercase;
}
</style>
