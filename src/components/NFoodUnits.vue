<template>
  <div class="n-food-units">
    <div class="n-food-units__label">{{ label }}</div>
    <div class="n-food-units__icons">
      <div
        class="n-food-units__icon"
        v-for="(item, index) in foodUnitItems"
        :key="`${icon}${index}`"
        :class="[
          'n-food-units__icon',
          { 'n-food-units__icon--half': item.half },
        ]"
      >
        <NIcon :name="icon" class="n-food-units__icon-inside" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import NIcon from './NIcon.vue'

const props = defineProps<{
  label: string
  foodUnits: number
  icon: string
}>()

const foodUnitItems = computed(() => {
  const result = []
  if (props.foodUnits && props.foodUnits > 0) {
    const totalItems = Math.ceil(props.foodUnits)
    for (let i = 1; i <= totalItems; i++) {
      if (i < totalItems) {
        result.push({
          half: false,
        })
      } else {
        result.push({
          half: i > props.foodUnits,
        })
      }
    }
  }
  return result
})
</script>

<style scoped>
.n-food-units {
  display: flex;
  gap: 16px;
  margin: 16px 0;
}

.n-food-units__label {
  font-weight: bold;
}

.n-food-units__icons {
  display: flex;
  gap: 8px;
}

.n-food-units__icon {
  background-color: #fff;
  border-radius: 16px;
  box-shadow: inset 0 0 0 2px var(--color-nb-dark-blue);
  color: var(--color-nb-dark-blue);
  height: 24px;
  padding-top: 2px;
  text-align: center;
  width: 24px;
}

.n-food-units__icon--half {
  clip-path: polygon(0 0, 50% 0, 50% 100%, 0% 100%);
}

.n-food-units__icon-inside {
  font-size: 20px;
}
</style>
