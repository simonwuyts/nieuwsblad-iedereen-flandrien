<template>
  <p>Geef je e-mailadres in om te beginnen.</p>
  <NInput label="E-mailadres">
    <NTextfield type="email" v-model="email" name="email"></NTextfield>
  </NInput>
  <NButton @click="login">Aanmelden</NButton>
</template>

<script lang="ts" setup>
import NButton from '@/components/NButton.vue'
import NInput from '@/components/NInput.vue'
import NTextfield from '@/components/NTextfield.vue'
import { useStore } from '@/store'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const email = ref('')

async function login() {
  await store.fetchUserInfo(email.value)
  router.push({ name: 'trainingOverview' })
}
</script>
