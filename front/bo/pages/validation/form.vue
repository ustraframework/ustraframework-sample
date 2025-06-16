<template>
  <div>
    <UValidationGroup ref="validationGroup">
      <div>
        <div class="mt-2">필수 입력 : <WjInputMask ref="field1" :isRequired="true" v-model="data.fieldValue1" /></div>
        <div class="mt-2">
          필수 입력 (UCodeComboBox) :
          <UCodeComboBox grpCd="SYS_CD" v-model="data.fieldValue2" displayNullText="전체" />
        </div>
        <div class="mt-2">
          필수 입력 :
          <WjComboBox v-model="data.fieldValue3" :itemsSource="comboItems" selectedValuePath="value" displayMemberPath="text" />
        </div>

        <UValidationGroup ref="validationGroup2">
          <div class="mt-2">
            Email :
            <WjInputMask
              ref="field1"
              v-model="data.fieldValue7"
              :validation="{
                rules: ['required', 'email'],
              }"
            />
          </div>

          <div class="mt-2">
            필수 입력 (rules) :<WjListBox
              :itemsSource="comboItems"
              v-model="data.fieldValue4"
              selectedValuePath="value"
              displayMemberPath="text"
              :validation="{
                rules: ['required'],
              }"
            />
          </div>

          <div class="mt-2">
            필수 입력 (커스톰) :<WjListBox
              :itemsSource="comboItems"
              v-model="data.fieldValue6"
              selectedValuePath="value"
              displayMemberPath="text"
              :validation="{
                rules: [
                  async value => {
                    if (value < 2) {
                      return 'item2를 선택하세요.'
                    }
                  },
                ],
              }"
            />
          </div>
        </UValidationGroup>

        <input
          type="text"
          v-model="data.fieldValue5"
          :validation="{
            rules: ['required'],
          }"
        />

        <UCheckGroupBox
          v-model="data.fieldValue8"
          :items-source="[{ text: '구매자운송' }, { text: '공급자운송' }]"
          :validation="{
            rules: [
              () => {
                if (!data.fieldValue8 || !data.fieldValue8.some(v => v)) {
                  return '하나 이상 선택해주세요.'
                }
                return true
              },
            ],
          }"
        >
        </UCheckGroupBox>

        <br /><br />
        <!-- <v-text-field></v-text-field> -->
        <v-btn @click="() => validate()">validate</v-btn>
        <v-btn @click="() => validate2()">validate2</v-btn>
        <v-btn @click="() => init()">Init</v-btn>
      </div>
    </UValidationGroup>
  </div>
</template>
<script lang="ts" setup>
import { WjInputMask, UValidationGroup, WjComboBox, WjListBox } from '#ustra/nuxt-wijmo/components'

const comboItems = reactive([
  { value: null, text: '선택하세요.' },
  { value: '1', text: 'Item1' },
  { value: '2', text: 'Item2' },
])

const data: any = reactive({})

const validationGroup = ref<InstanceType<typeof UValidationGroup>>()
const validationGroup2 = ref<InstanceType<typeof UValidationGroup>>()

async function validate() {
  const result = await validationGroup.value.validate()
  console.log('result', result)
}

async function validate2() {
  const result = await validationGroup2.value.validate()
  console.log('result', result)
}

async function init() {
  validationGroup.value?.init()
  validationGroup2.value?.init()

  $ustra.utils.core.deepMerge(data, {
    fieldValue1: null,
    fieldValue2: null,
    fieldValue3: null,
    fieldValue4: null,
    fieldValue5: null,
    fieldValue6: null,
    fieldValue7: null,
    fieldValue8: [false, false],
  })
}
init()
</script>
