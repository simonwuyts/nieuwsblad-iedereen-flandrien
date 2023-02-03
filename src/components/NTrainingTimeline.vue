<template>
  <div class="n-training-timeline">
    <div
      class="n-training-timeline__indicator"
      :class="{
        'n-training-timeline__indicator--active': active,
      }"
      :style="{ top: `min(${percentage * 100}%, calc(100% - 32px))` }"
    >
      <NIcon name="directions_bike" class="n-training-timeline__icon" />
    </div>
    <!-- <div class="n-training-timeline__food"></div> -->
  </div>
</template>

<script setup lang="ts">
import NIcon from '@/components/NIcon.vue'

withDefaults(
  defineProps<{
    percentage?: number
    active?: boolean
  }>(),
  {
    percentage: 0,
  }
)
</script>

<style scoped>
.n-training-timeline {
  background-color: rgba(0, 0, 104, 10%);
  border-radius: 4px;
  bottom: 0;
  left: -40px;
  position: absolute;
  top: 0;
  width: 8px;
}

.n-training-timeline__indicator {
  background-color: var(--color-nb-dark-blue);
  border-radius: 16px;
  box-shadow: inset 0 0 0 2px #fff, 0px 17px 14px rgba(0, 0, 0, 0.07),
    0 7.1px 5.8px rgba(0, 0, 0, 0.05), 0 3.7px 3.1px rgba(0, 0, 0, 0.04),
    0 2.1px 1.7px rgba(0, 0, 0, 0.03), 0 1.1px 0.9px rgba(0, 0, 0, 0.02),
    0 0.4px 0.3px rgba(0, 0, 0, 0.02);
  color: #fff;
  height: 32px;
  left: -12px;
  opacity: 0.5;
  padding-top: 6px;
  position: absolute;
  text-align: center;
  width: 32px;
  z-index: 1;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.n-training-timeline__indicator--active {
  animation: pulse 1s ease-in-out 0s infinite both;
  opacity: 1;
}

.n-training-timeline__food {
  background-color: #fff;
  border-radius: 16px;
  box-shadow: inset 0 0 0 2px var(--color-nb-dark-blue);
  color: var(--color-nb-dark-blue);
  height: 32px;
  left: -12px;
  padding-top: 6px;
  position: absolute;
  top: 20%;
  width: 32px;
  z-index: 0;
}

.n-training-timeline__icon {
  font-size: 20px;
}
</style>
