<template>
  <p>Totale duur: {{ formatMinutes(trainings[trainingId].time) }}</p>
  <NTrainingBlocks>
    <NTrainingBlock
      v-for="(block, index) in blocks"
      :key="`${block.label}${index}`"
      :block="block"
    />
  </NTrainingBlocks>
</template>

<script setup lang="ts">
import { trainings } from "@/assets/data/trainings";
import NTrainingBlocks from "@/components/NTrainingBlocks.vue";
import NTrainingBlock from "@/components/NTrainingBlock.vue";
import { formatMinutes } from "@/lib/helpers";
import { generateTrainingBlocks } from "@/lib/training-helpers";
import { TrainingId } from "@/types";

const props = defineProps<{
  trainingId: TrainingId;
}>();

const blocks = generateTrainingBlocks(props.trainingId, 190, "heart");
</script>
