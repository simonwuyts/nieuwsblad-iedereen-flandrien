<template>
  <NHeader />
  <NTitleBar
    :subtitle="`Week ${store.currentWeekNumber} - ${subtitle}`"
    :title="training.name"
  >
    <template #left>
      <n-button type="subtle" icon="chevron_left" @click="backToOverview" />
    </template>
  </NTitleBar>
  <NContent :display-flex="true">
    <p v-if="training.description">{{ training.description }}</p>
    <div style="display: grid; grid-template-columns: 1fr 1fr">
      <NFoodUnits
        v-if="training.solidUnits"
        icon="nutrition"
        label="Vast"
        :food-units="training.solidUnits"
      />
      <NFoodUnits
        v-if="training.fluidUnits"
        icon="water_drop"
        label="Vloeibaar"
        :food-units="training.fluidUnits"
      />
    </div>
    <NTrainingBlocks>
      <NTrainingTimeline
        :active-index="activeIndex"
        :active="currentStatus === 'started'"
      />
      <NTrainingBlock
        v-for="(block, index) in blocks"
        :key="`${block.label}${index}`"
        :block="block"
        :active="activeIndex === index"
        :type="store.firestoreUserData.zoneType"
      />
    </NTrainingBlocks>
  </NContent>
  <NFooterBar>
    <NButtonRow>
      <NButton
        v-if="
          currentStatus !== 'started' &&
          currentStatus !== 'paused' &&
          currentStatus !== 'completed'
        "
        icon="play_arrow"
        @click="start"
      >
        Start
      </NButton>
      <NButton
        v-if="currentStatus === 'paused'"
        icon="play_arrow"
        @click="start"
      >
        Ga verder
      </NButton>
      <NButton
        v-if="
          currentStatus !== 'paused' &&
          currentStatus !== 'completed' &&
          currentStatus !== 'idle'
        "
        icon="pause"
        @click="pause"
      >
        Pauzeer
      </NButton>
      <NButton
        v-if="currentStatus !== 'completed'"
        type="success"
        icon="check"
        :flexible="false"
        @click="complete"
      >
        Klaar
      </NButton>
      <NButton
        v-if="currentStatus === 'completed'"
        icon="refresh"
        @click="reset"
      >
        Opnieuw
      </NButton>
    </NButtonRow>
  </NFooterBar>
</template>

<script setup lang="ts">
import NButton from '@/components/NButton.vue'
import NButtonRow from '@/components/NButtonRow.vue'
import NContent from '@/components/NContent.vue'
import NFoodUnits from '@/components/NFoodUnits.vue'
import NFooterBar from '@/components/NFooterBar.vue'
import NHeader from '@/components/NHeader.vue'
import NTitleBar from '@/components/NTitleBar.vue'
import NTrainingBlock from '@/components/NTrainingBlock.vue'
import NTrainingBlocks from '@/components/NTrainingBlocks.vue'
import NTrainingTimeline from '@/components/NTrainingTimeline.vue'
import { convertTrainingIdToKey } from '@/lib/helpers'
import {
  generateTrainingBlocks,
  getElapsedSeconds,
  getTraining,
} from '@/lib/training-helpers'
import { useStore } from '@/store'
import { TrainingId } from '@/types'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  trainingId: TrainingId
  subtitle?: string
}>()

const store = useStore()
const router = useRouter()

const timerInterval = ref()
const elapsedSeconds = ref(0)

const training = getTraining(props.trainingId)

const calculateElapsedTime = () => {
  const convertedId = convertTrainingIdToKey(props.trainingId)
  if (store.firestoreUserData.trainings[convertedId]) {
    elapsedSeconds.value = getElapsedSeconds(
      store.firestoreUserData.trainings[convertedId].segments || [],
      store.firestoreUserData.trainings[convertedId].lastStartedAt,
      store.firestoreUserData.trainings[convertedId].status
    )
  }
}

const blocks = computed(() => {
  return generateTrainingBlocks(
    props.trainingId,
    store.baseValue,
    store.firestoreUserData?.zoneType
  )
})

const activeIndex = computed(() => {
  const totalBlocks = blocks.value.length
  return Math.min(
    Math.round((elapsedSeconds.value / (training.time * 60)) * totalBlocks),
    totalBlocks - 1
  )
})

const currentStatus = computed(() => {
  if (
    store.firestoreUserData.trainings[convertTrainingIdToKey(props.trainingId)]
  ) {
    return store.firestoreUserData.trainings[
      convertTrainingIdToKey(props.trainingId)
    ].status
  } else {
    return 'idle'
  }
})

function backToOverview() {
  if (currentStatus.value === 'started') {
    store.pauseTraining(props.trainingId)
  }
  clearInterval(timerInterval.value)
  router.push({ name: 'trainingOverview' })
}

function start() {
  store.startTraining(props.trainingId)
  timerInterval.value = setInterval(calculateElapsedTime, 1000)
}

function pause() {
  store.pauseTraining(props.trainingId)
  clearInterval(timerInterval.value)
}

function complete() {
  store.completeTraining(props.trainingId)
  clearInterval(timerInterval.value)
  elapsedSeconds.value = training.time * 60
}

function reset() {
  store.resetTraining(props.trainingId)
  clearInterval(timerInterval.value)
  elapsedSeconds.value = 0
}

onMounted(async () => {
  await store.fetchFirestoreUserData()
  calculateElapsedTime()
})
</script>
