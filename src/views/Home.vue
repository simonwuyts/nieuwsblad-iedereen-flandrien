<template>
  <NHeader />
  <NTitleBar title="Iedereen Flandrien" />
  <NContent>
    <p>Welkom bij Iedereen Flandrien.</p>
    <p>
      Hier vind je twaalf weken lang je persoonlijke trainingsschema’s en
      exclusieve voedingstips van onze experts.
      <strong>
        Vul het e-mailadres in waarmee je bent ingeschreven en start meteen.
      </strong>
      Nog niet ingeschreven?
      <a href="https://www.nieuwsblad.be/iedereenflandrien">
        Schrijf je nog snel in.
      </a>
    </p>
    <NForm>
      <NInput label="E-mailadres">
        <NTextfield type="email" v-model="email" name="email" />
        <p v-if="store.emailWasNotRecognized" class="ds-error">
          Het lijkt erop dat je nog niet geregistreerd bent met dit e-mailadres.
          <a href="https://www.nieuwsblad.be/iedereenflandrien">
            Schrijf je hier in.
          </a>
        </p>
      </NInput>
      <NInput>
        <NButton icon-right="chevron_right" @click="login">
          Ik ben er klaar voor
        </NButton>
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
import NTextfield from '@/components/NTextfield.vue'
import NTitleBar from '@/components/NTitleBar.vue'
import { useStore } from '@/store'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const email = ref('')

async function login() {
  await store.fetchUserInfo(email.value)
  await store.fetchFirestoreUserData()
  await store.saveFirestoreStartDate()
  router.push({ name: 'onboarding' })
}
</script>

<style scoped>
.ds-error {
  background-color: var(--color-zone-0);
  display: block;
  margin: 16px 0 8px !important;
  padding: 16px;
}
</style>
