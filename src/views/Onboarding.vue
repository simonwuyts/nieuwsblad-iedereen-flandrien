<template>
  <NHeader />
  <NTitleBar title="Iedereen Flandrien" />
  <NContent :is-flexible="false">
    <p>
      We hebben nog een paar gegevens nodig zodat we je trainingsschema's kunnen
      personaliseren.
    </p>
    <NForm>
      <NInput label="Trainingstijd per week">
        <NSelect v-model="extraTimeValue">
          <option value="no">
            {{
              store.localUserData.level === 'BEGINNER' ? '3-5 uur' : '4-8 uur'
            }}
          </option>
          <option value="yes">
            {{
              store.localUserData.level === 'BEGINNER' ? '5-8 uur' : '8-12 uur'
            }}
          </option>
        </NSelect>
      </NInput>
      <NInput label="Meeteenheid">
        <NSelect v-model="zoneType">
          <option value="heart">Maximale harstlag</option>
          <option value="ftp">FTP</option>
        </NSelect>
      </NInput>
      <NInput
        v-if="zoneType === 'heart'"
        label="Maximale hartslag"
        helper="Weet je jouw maximale hartslag niet? Geen probleem. Dan baseren we ons op het gemiddelde voor een man/vrouw van jouw leeftijd."
      >
        <NTextfield type="number" v-model.number="maxHeartRate" />
      </NInput>
      <NInput v-if="zoneType === 'ftp'" label="Maximale FTP">
        <NTextfield type="number" v-model.number="maxFTP" />
      </NInput>
      <NInput>
        <NButton icon-right="chevron_right" @click="save"> Start</NButton>
      </NInput>
    </NForm>
  </NContent>
  <NPartners />
</template>

<script lang="ts" setup>
import NButton from '@/components/NButton.vue'
import NContent from '@/components/NContent.vue'
import NForm from '@/components/NForm.vue'
import NHeader from '@/components/NHeader.vue'
import NInput from '@/components/NInput.vue'
import NPartners from '@/components/NPartners.vue'
import NSelect from '@/components/NSelect.vue'
import NTextfield from '@/components/NTextfield.vue'
import NTitleBar from '@/components/NTitleBar.vue'
import { useStore } from '@/store'
import { computed, ref, unref } from 'vue'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const extraTimeValue = ref(store.firestoreUserData?.extraTime ? 'yes' : 'no')
const extraTime = computed(() => {
  return extraTimeValue.value === 'yes'
})
const zoneType = ref(unref(store.firestoreUserData?.zoneType) || 'heart')
const maxHeartRate = ref(
  unref(store.firestoreUserData?.maxHeartRate) ||
    220 - store.localUserData.age ||
    0
)
const maxFTP = ref(unref(store.firestoreUserData?.maxFTP) || 0)

async function save() {
  await store.saveFirestoreUserData(
    extraTime.value,
    zoneType.value,
    maxHeartRate.value,
    maxFTP.value
  )
  router.push({ name: 'trainingOverview' })
}
</script>
