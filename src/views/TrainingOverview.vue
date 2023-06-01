<template>
  <NHeader />
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
        :disabled="store.currentWeekNumber === store.totalWeeks && !store.debug"
        @click="nextWeek"
      />
    </template>
  </NTitleBar>
  <NContent :is-flexible="false">
    <p>Veel succes deze week!</p>
    <NBox>
      <p>
        Te weinig tijd om alles te doorlopen? Trainingen die je kan overslaan
        herken je aan de
        <span class="material-symbols-rounded n-icon-inline">fast_forward</span
        >-knop. Dit kan tot 5 keer doorheen het hele programma.
      </p>
    </NBox>
    <NTrainingLinks>
      <template v-for="(trainingKey, index) in trainingKeys">
        <NTrainingLink
          v-if="store.currentWeekTrainings[trainingKey]"
          :training-id="store.currentWeekTrainings[trainingKey] || '111.111'"
          :converted-training-id="getConvertedTrainingId(trainingKey)"
          :key="`${store.currentWeekNumber}${store.currentWeekTrainings[trainingKey]}`"
          :completed="isCompleted(trainingKey)"
          :skipped="isSkipped(trainingKey)"
          :skippable="
            store.skippingIsEnabled &&
            isSkippable(trainingKey) &&
            !isCompleted(trainingKey) &&
            !isSkipped(trainingKey)
          "
          :subtitle="`Training ${index + 1}`"
        />
      </template>
    </NTrainingLinks>
    <template v-if="store.firestoreUserData.extraTime">
      <h2 class="n-divider-title">
        Bonustrainingen
        <div class="n-divider-title__subtitle">
          Deze trainingen zijn een bonus bovenop je 12 weken durende
          trainingsprogramma en horen dus niet bij de standaard voorziene
          trainingen.
        </div>
      </h2>
      <NTrainingLinks>
        <template v-for="(bonusTrainingKey, index) in bonusTrainingKeys">
          <NTrainingLink
            v-if="store.currentWeekTrainings[bonusTrainingKey]"
            :training-id="
              store.currentWeekTrainings[bonusTrainingKey] || '111.111'
            "
            :converted-training-id="getConvertedTrainingId(bonusTrainingKey)"
            :key="`${store.currentWeekNumber}${store.currentWeekTrainings[bonusTrainingKey]}`"
            :completed="isCompleted(bonusTrainingKey)"
            :skipped="isSkipped(bonusTrainingKey)"
            :skippable="
              store.skippingIsEnabled &&
              isSkippable(bonusTrainingKey) &&
              !isSkipped(bonusTrainingKey)
            "
            :subtitle="`Bonustraining ${index + 1}`"
          />
        </template>
      </NTrainingLinks>
    </template>
    <NLegend />
    <NFaq />
  </NContent>
  <NPartners />
</template>

<script setup lang="ts">
import NBox from '@/components/NBox.vue'
import NButton from '@/components/NButton.vue'
import NContent from '@/components/NContent.vue'
import NFaq from '@/components/NFaq.vue'
import NHeader from '@/components/NHeader.vue'
import NLegend from '@/components/NLegend.vue'
import NPartners from '@/components/NPartners.vue'
import NTitleBar from '@/components/NTitleBar.vue'
import NTrainingLink from '@/components/NTrainingLink.vue'
import NTrainingLinks from '@/components/NTrainingLinks.vue'
import { convertTrainingIdToKey } from '@/lib/helpers'
import { useStore } from '@/store'
import { TrainingKey } from '@/types'
import { onMounted } from 'vue'

const store = useStore()

const trainingKeys: TrainingKey[] = [
  'training1',
  'training2',
  'training3',
  'training4',
  'training5',
]

const bonusTrainingKeys: TrainingKey[] = ['bonus1', 'bonus2', 'bonus3']

function getConvertedTrainingId(key: TrainingKey) {
  return convertTrainingIdToKey(
    store.currentWeekTrainings[key] || '999.999',
    store.currentWeekNumber,
    store.currentWeekTrainingKeyIndexes[key]
  )
}

function isCompleted(key: TrainingKey) {
  const trainings = store.firestoreUserData?.trainings
  const convertedTrainingKey = getConvertedTrainingId(key)

  if (trainings) {
    const training = trainings[convertedTrainingKey]
    return training && training.status === 'completed'
  } else {
    return false
  }
}

function isSkipped(key: TrainingKey) {
  const trainings = store.firestoreUserData?.trainings
  const convertedTrainingKey = getConvertedTrainingId(key)

  if (trainings) {
    const training = trainings[convertedTrainingKey]
    return training && training.status === 'skipped'
  } else {
    return false
  }
}

function isSkippable(key: TrainingKey) {
  return store.currentWeekTrainings.optionals?.includes(key)
}

onMounted(async () => {
  await store.fetchFirestoreUserData()
  store.getWeekNumber()
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
  margin: 32px -16px 24px;
  padding: 12px 16px;
  text-transform: uppercase;
}

.n-divider-title__subtitle {
  color: rgba(0, 0, 104, 50%);
  font-size: 13px;
  font-weight: normal;
  letter-spacing: 0;
  line-height: 20px;
  text-transform: none;
}

.n-icon-inline {
  background-color: var(--color-nb-orange);
  color: #fff;
  display: inline-block;
  font-size: 18px;
  margin: 0 4px;
  padding: 4px;
  vertical-align: middle;
}
</style>
