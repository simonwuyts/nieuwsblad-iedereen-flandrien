<template>
  <p>Geef je e-mailadres in om te beginnen.</p>
  <NInput label="E-mailadres">
    <NTextfield type="email" v-model="value" name="email"></NTextfield>
  </NInput>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import NTextfield from '@/components/NTextfield.vue'
import NInput from '@/components/NInput.vue'
const value = ref('test')
</script>
