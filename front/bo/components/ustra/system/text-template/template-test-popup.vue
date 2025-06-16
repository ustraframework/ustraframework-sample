<template>
  <UPopup v-model="modelValue" width="1200" :height="800" title="텍스트 템플릿 적용 테스트">
    <UBox direction="col" height="100%" width="100%">
      <UItem>
        <UFieldSet>
          <UFieldRow :ratio="[1, 1]">
            <UField label="텍스트 템플릿 ID" totalWidth="400">
              {{ props.txtTmpl.txtTmplId }}
            </UField>
            <UField label="텍스트 템플릿 명" totalWidth="400">
              {{ props.txtTmpl.txtTmplNm }}
            </UField>
          </UFieldRow>
        </UFieldSet>
      </UItem>
      <UItem>
        <WjFlexGrid :itemsSource="keywordList">
          <WjFlexGridColumn binding="keyword" header="변수" width="*" readOnly />
          <WjFlexGridColumn binding="value" header="대체내용" width="*" />
        </WjFlexGrid>
      </UItem>
      <UItem>
        <UTextBox type="textarea" noResize v-model="content" :read-only="true" rows="10" />
      </UItem>
    </UBox>
    <template #buttons>
      <UButton text="적용" @click="test()" />
      <UButton text="닫기" @click="() => (modelValue = false)" />
    </template>
  </UPopup>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch, reactive } from '#ustra/nuxt'
import { UBox, UItem, WjFlexGrid, WjFlexGridColumn } from '#ustra/nuxt-wijmo/components'
import { TextTemplate, useUstraTextTemplateService } from '#ustra/nuxt/management'
import { useVModel } from '@vueuse/core'
const emits = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
}>()

const props = withDefaults(
  defineProps<{
    /**
     * 팝업 오픈 여부
     */
    modelValue: boolean

    txtTmpl: TextTemplate
  }>(),
  {},
)
const modelValue = useVModel(props, 'modelValue')

const keywordList = ref([])
const content = ref('')
const txtTmplService = useUstraTextTemplateService()

watch(
  () => props.modelValue,
  v => {
    if (v === true) {
      content.value = props.txtTmpl.txtTmplCont

      if (content.value.indexOf('\$') < 0) {
        return
      }

      let tmpList = []
      content.value.match(/(?<=\$\{)(.*?)(?=\})/g).forEach(e => {
        tmpList.push(e)
      })

      tmpList = [...new Set(tmpList)]

      tmpList.forEach(e => {
        keywordList.value.push({
          keyword: e,
          value: null,
        })
      })
    } else {
      keywordList.value = []
    }
  },
)

async function test() {
  const paramList = keywordList.value.reduce((newObj, obj) => {
    newObj[obj.keyword] = obj.value
    return newObj
  }, {})

  const param = reactive({
    parameter: paramList,
    content: content,
  })

  const txtTmplId = props.txtTmpl.txtTmplId

  content.value = await txtTmplService.testTxtTmpl(txtTmplId, param)
}
</script>
<style lang="scss"></style>
