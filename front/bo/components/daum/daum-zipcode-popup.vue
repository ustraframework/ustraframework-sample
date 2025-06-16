<template>
  <UPopup v-model="modelValue" :width="800" :height="600" title="우편번호 조회" @shown="() => loadZipContainer()">
    <div ref="zipContianer" style="width: 100%; height: 100%"></div>
  </UPopup>
</template>
<script lang="ts" setup>
import { UPopup } from '#ustra/nuxt-wijmo/components'
import { openDaumPostScreen, DaumPostResult, DaumPostScreenOptions } from '#ustra/nuxt/externals/daum/post'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    options?: DaumPostScreenOptions
  }>(),
  {
    options: () => {
      return {}
    },
  },
)
const modelValue = useVModel(props, 'modelValue')

const zipContianer = ref<HTMLDivElement>()
const emits = defineEmits<{
  (e: 'selected', data: DaumPostResult): void
  (e: 'update:modelValue', value: boolean): void
}>()

function loadZipContainer() {
  $ustra.utils.core
    .getObjectAsync(() => zipContianer.value)
    .then(() => {
      openDaumPostScreen(zipContianer.value, {
        ...props.options,
        onSelected(data) {
          emits('selected', data)
          modelValue.value = false
        },
      })
    })
}

useHead({
  script: [{ src: '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js' }],
})
</script>
<script lang="ts">
export default {
  name: 'DaumZipPopup',
}
</script>
