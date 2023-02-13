<template>
  <div class="n-legend">
    <div class="n-legend__header" @click="isOpen = !isOpen">
      <NIcon
        class="n-legend__icon"
        :name="isOpen ? 'expand_more' : 'chevron_right'"
      />
      <h3 class="n-legend__title">Legende</h3>
    </div>
    <div v-if="isOpen" class="n-legend__content">
      <ul>
        <li>
          Je <strong>opwarming</strong> is belangrijk. Doe het steeds in je
          rustige duurzone met 90 pedaalomwentelingen per minuut en 65-75% van
          je maximale hartslag of 55-75% van je maximale wattage (FTP).
        </li>
        <li>
          De <strong>herstelzone</strong>, die essentieel is, zorgt voor een
          betere doorbloeding. Doe het heel rustig en fiets aan 55-65% van je
          maximale hartslag of 40-55% van je maximale wattage (FTP).
        </li>
        <li>
          Het einde van je training heet <strong>cooldown</strong>. Doe dat
          steeds in de rustige duurzone, met soepel fietsen en 65-75 % van je
          maximale hartslag of 55-75% van je maximale wattage (FTP). Goed
          uitfietsen is essentieel voor het herstel van je lichaam.
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NIcon from './NIcon.vue'

const isOpen = ref(false)
</script>

<style scoped>
.n-legend {
  border: 1px solid rgba(0, 0, 103, 0.15);
  color: var(--color-nb-dark-blue);
  margin-top: 40px;
}

.n-legend__header {
  align-items: center;
  display: flex;
  gap: 8px;
  padding: 12px;
}

.n-legend__title {
  font-size: 16px;
  font-weight: 600;
}

.n-legend__content {
  padding: 0 16px 16px 16px;
}

.n-legend__content ul {
  display: flex;
  flex-direction: column;
  gap: 8px;
  list-style: disc;
  padding: 8px 16px 8px 24px;
}

.n-legend__content li {
  padding-left: 8px;
}
</style>
