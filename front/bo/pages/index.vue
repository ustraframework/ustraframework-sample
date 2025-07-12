<template>
  <v-app>
    <v-main>
      <v-container>
        <v-card>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>
<script lang="ts" setup>
import { useGlobal, navigateTo } from '#imports'
import { useTempStore } from '~/store/temp'

const tempStore = useTempStore()
const data = tempStore.data
const testData = tempStore.testdata

console.log('testData', testData)
const router = useRouter()
router.push('/main')

definePageMeta({
  layout: false,
  auth: {
    required: false,
  },
})
</script>
