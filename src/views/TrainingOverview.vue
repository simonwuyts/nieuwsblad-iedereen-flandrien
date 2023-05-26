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
    <NTrainingLinks>
      <NTrainingLink
        v-if="store.currentWeekTrainings['training1']"
        :training-id="store.currentWeekTrainings['training1']"
        :converted-training-id="getConvertedTrainingId('training1')"
        :key="`${store.currentWeekNumber}${store.currentWeekTrainings['training1']}`"
        :completed="isCompleted('training1')"
        subtitle="Training 1"
      />
      <NTrainingLink
        v-if="store.currentWeekTrainings['training2']"
        :training-id="store.currentWeekTrainings['training2']"
        :converted-training-id="getConvertedTrainingId('training2')"
        :key="`${store.currentWeekNumber}${store.currentWeekTrainings['training2']}`"
        :completed="isCompleted('training2')"
        subtitle="Training 2"
      />
      <NTrainingLink
        v-if="store.currentWeekTrainings['training3']"
        :training-id="store.currentWeekTrainings['training3']"
        :converted-training-id="getConvertedTrainingId('training3')"
        :key="`${store.currentWeekNumber}${store.currentWeekTrainings['training3']}`"
        :completed="isCompleted('training3')"
        subtitle="Training 3"
      />
      <NTrainingLink
        v-if="store.currentWeekTrainings['training4']"
        :training-id="store.currentWeekTrainings['training4']"
        :converted-training-id="getConvertedTrainingId('training4')"
        :key="`${store.currentWeekNumber}${store.currentWeekTrainings['training4']}`"
        :completed="isCompleted('training4')"
        subtitle="Training 4"
      />
      <NTrainingLink
        v-if="store.currentWeekTrainings['training5']"
        :training-id="store.currentWeekTrainings['training5']"
        :converted-training-id="getConvertedTrainingId('training5')"
        :key="`${store.currentWeekNumber}${store.currentWeekTrainings['training5']}`"
        :completed="isCompleted('training5')"
        subtitle="Training 5"
      />
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
        <NTrainingLink
          v-if="store.currentWeekTrainings['bonus1']"
          :training-id="store.currentWeekTrainings['bonus1']"
          :converted-training-id="getConvertedTrainingId('bonus1')"
          :key="`${store.currentWeekNumber}${store.currentWeekTrainings['bonus1']}`"
          :completed="isCompleted('bonus1')"
          subtitle="Bonustraining 1"
        />
        <NTrainingLink
          v-if="store.currentWeekTrainings['bonus2']"
          :training-id="store.currentWeekTrainings['bonus2']"
          :converted-training-id="getConvertedTrainingId('bonus2')"
          :key="`${store.currentWeekNumber}${store.currentWeekTrainings['bonus2']}`"
          :completed="isCompleted('bonus2')"
          subtitle="Bonustraining 2"
        />
        <NTrainingLink
          v-if="store.currentWeekTrainings['bonus3']"
          :training-id="store.currentWeekTrainings['bonus3']"
          :converted-training-id="getConvertedTrainingId('bonus3')"
          :key="`${store.currentWeekNumber}${store.currentWeekTrainings['bonus3']}`"
          :completed="isCompleted('bonus3')"
          subtitle="Bonustraining 3"
        />
      </NTrainingLinks>
    </template>
    <NLegend />
    <NFaq />
  </NContent>
  <NPartners />
</template>

<script setup lang="ts">
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
</style>
