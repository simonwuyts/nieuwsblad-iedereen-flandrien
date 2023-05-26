<template>
  <NHeader />
  <NTitleBar title="Iedereen Flandrien" />
  <NContent :is-flexible="false">
    <p>
      We hebben nog enkele gegevens nodig zodat we je trainingsschema's op maat
      kunnen tonen.
    </p>
    <NForm>
      <NInput
        label="Hoeveel uren kan je per week fietsen?"
        helper="Je kan steeds tijdens je trainingsweken in de instellingen je beschikbare tijd aanpassen."
      >
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
      <NInput label="Werk je met een hartslag- of wattagemeter?">
        <NSelect v-model="zoneType">
          <option value="heart">Maximale hartslag</option>
          <option value="ftp">FTP (wattage)</option>
        </NSelect>
      </NInput>
      <NInput
        v-if="zoneType === 'heart'"
        label="Maximale hartslag"
        helper="Om je maximale hartslag of wattage te bepalen fiets je 10 minuten voluit tegen wind."
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
    <NFaq />
  </NContent>
  <NPartners />
</template>

<script lang="ts" setup>
import NButton from '@/components/NButton.vue'
import NContent from '@/components/NContent.vue'
import NFaq from '@/components/NFaq.vue'
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
const zoneType = ref(unref(store.localUserData?.zoneType) || 'heart')
const maxHeartRate = ref(
  unref(store.localUserData?.maxHeartRate) || 220 - store.localUserData.age || 0
)
const maxFTP = ref(unref(store.localUserData?.maxFTP) || 0)

async function save() {
  await store.saveFirestoreUserData(extraTime.value)
  store.localUserData.zoneType = zoneType.value
  store.localUserData.maxHeartRate = maxHeartRate.value
  store.localUserData.maxFTP = maxFTP.value
  router.push({ name: 'trainingOverview' })
}
</script>
